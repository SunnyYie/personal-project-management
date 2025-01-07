import { getCommits, getRepositories, pushProjectToGitHub } from '@/api/actions/github'
import { getProjects } from '@/api/actions/vercel'
import { Project, ProjectStatusEnum } from './types/project.type'
import { useEffect, useMemo, useState } from 'react'
import { configeProjectList } from './utils'
import { Plus } from 'lucide-react'

import { ProjectSidebar } from './components/project-sidebar'
import { ProjectFilters } from './components/project-filters'
import { ProjectCard } from './components/project-card'
import { ProjectForm } from './components/project-form'
import { Button } from '@/components/ui/button'
import { useProjectStore } from '@/store/project'

export default function ProjectHome() {
  const { setStoreProjects } = useProjectStore()
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  // 过滤项目状态和搜索项目名
  const [statusFilter, setStatusFilter] = useState<ProjectStatusEnum>(ProjectStatusEnum.All)
  const [searchTerm, setSearchTerm] = useState('')

  // 过滤出对应的项目
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      let matchesStatus = project.status === statusFilter
      if (statusFilter === ProjectStatusEnum.All) matchesStatus = true

      const matchesSearchTerm = project.name.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesStatus && matchesSearchTerm
    })
  }, [projects, statusFilter, searchTerm])

  const [isAddingProject, setIsAddingProject] = useState(false)

  // 获取 GitHub 项目列表和 commit 记录
  const fetchGithubProjectList = async () => {
    const USERNAME = import.meta.env.VITE_USERNAME
    const repos = await getRepositories()

    if (repos.length > 0) {
      const commitsPromises = repos.map((repo: any) => getCommits(USERNAME, repo.name))
      const commits = await Promise.all(commitsPromises)

      return configeProjectList(repos, commits)
    }
    return []
  }

  // 获取 Vercel 项目列表
  const fetchVercelProjectList = async () => {
    const projects = await getProjects()
    console.log('Vercel projects:', projects[0].latestDeployments)
    return projects
  }

  // 关联 GitHub 和 Vercel 项目
  const fetchAndCombineProjects = async () => {
    const githubProjects = await fetchGithubProjectList()
    const vercelProjects = await fetchVercelProjectList()

    const combinedProjects = githubProjects.map((githubProject: any) => {
      const vercelProject = vercelProjects.find((vercelProject: any) => vercelProject.link.repo === githubProject.name)
      return {
        ...githubProject,
        vercelProject,
      }
    })
    console.log('Combined projects:', combinedProjects)

    setProjects(combinedProjects)
    setStoreProjects(combinedProjects)
  }

  const fetchAddProject = async (project: Partial<Project>) => {
    const res = await pushProjectToGitHub(project)
    console.log(res)
  }

  useEffect(() => {
    fetchAndCombineProjects()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex justify-between items-center">
        <Button onClick={() => setIsAddingProject(true)}>
          <Plus className="mr-2 h-4 w-4" /> 新建项目
        </Button>
      </div>

      <ProjectFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.map(project => (
          <ProjectCard key={project.id} project={project} onSelect={setSelectedProject} />
        ))}
      </div>

      {selectedProject && <ProjectSidebar project={selectedProject} onClose={() => setSelectedProject(null)} />}
      {isAddingProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">新建项目</h2>
            <ProjectForm onSubmit={fetchAddProject} onCancel={() => setIsAddingProject(false)} />
          </div>
        </div>
      )}
    </div>
  )
}
