import { Deployment, DeploymentStatusEnum, Project, ProjectStatusEnum } from './types/project.type'

export const getStatusColor = (status: Project['status']) => {
  switch (status) {
    case ProjectStatusEnum.NotStarted:
      return 'bg-gray-500'
    case ProjectStatusEnum.InProgress:
      return 'bg-blue-500'
    case ProjectStatusEnum.Completed:
      return 'bg-green-500'
    case ProjectStatusEnum.OnHold:
      return 'bg-yellow-500'
    default:
      return 'bg-gray-500'
  }
}

export const getDevelopStatusColor = (status: Deployment['status']) => {
  switch (status) {
    case DeploymentStatusEnum.Deployed:
      return 'bg-green-500'
    case DeploymentStatusEnum.Building:
      return 'bg-yellow-500'
    case DeploymentStatusEnum.Failed:
      return 'bg-red-500'
    case DeploymentStatusEnum.Cancelled:
      return 'bg-gray-500'
    default:
      return 'bg-blue-500'
  }
}

export const configeProjectList = (githubProjects: any[], commits: any[]) => {
  const projects = githubProjects.map((project, index) => {
    return {
      ...project,
      status: ProjectStatusEnum.InProgress,
      progress: 0,
      members: [
        {
          ...project.owner,
          role: 'admin',
        },
      ],
      endDate: '2026-07-08T11:04:12Z',
      tasks: { completed: 0, total: 0 },
      framework: 'React',
      budget: 0,
      client: '',
      repository: '',
      latestCodeOperation: {
        id: commits[index][0].sha,
        type: 'commit',
        ...commits[index][0],
      },
      recentActivities: commits[index].map((commit: any) => ({
        id: commit.sha,
        user: {
          id: commit.commit.author.email,
          role: 'admin',
          avatar: '',
          ...commit.commit.author,
        },
        date: commit.commit.author.date,
        ...commit.commit,
      })),
    }
  })

  return projects
}
