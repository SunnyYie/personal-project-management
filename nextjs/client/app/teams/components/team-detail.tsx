"use client";

import { useState } from "react";
import { Project } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TeamWithProjectsAndMembers } from "@/actions/team";
import AddProjectModal from "./project-modal";
import AddEditTeamModal from "./team-modal";

interface TeamDetailsProps {
  team: TeamWithProjectsAndMembers;
  onUpdate: (updatedTeam: TeamWithProjectsAndMembers) => void;
  onClose: () => void;
}

export default function TeamDetails({
  team,
  onUpdate,
  onClose,
}: TeamDetailsProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);

  const handleEditTeam = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleSaveTeam = (updatedTeam: TeamWithProjectsAndMembers) => {
    onUpdate(updatedTeam);
    setIsEditModalOpen(false);
  };

  const handleAddProject = () => {
    setIsAddProjectModalOpen(true);
  };

  const handleCloseAddProjectModal = () => {
    setIsAddProjectModalOpen(false);
  };

  const handleSaveProject = (newProject: Project) => {
    const updatedTeam = {
      ...team,
      projectTeams: [...team.projectTeams, { project: newProject }],
    };
    onUpdate(updatedTeam);
    setIsAddProjectModalOpen(false);
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {team.name}
          <div>
            <Button onClick={handleEditTeam}>编辑团队</Button>
            <Button
              onClick={onClose}
              className="ml-2"
              variant="outline"
              size="icon"
            >
              X
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="mb-2 text-lg font-semibold">项目</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>名称</TableHead>
                  <TableHead>描述</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {team.projectTeams.map(({ project }) => (
                  <TableRow key={project.id}>
                    <TableCell>{project.name}</TableCell>
                    <TableCell>{project.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button onClick={handleAddProject} className="mt-2">
              添加项目
            </Button>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-semibold">成员</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>名称</TableHead>
                  <TableHead>邮箱</TableHead>
                  <TableHead>角色</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {team.UserTeam.map(({ User }) => (
                  <TableRow key={User.id}>
                    <TableCell>{User.name}</TableCell>
                    <TableCell>{User.email}</TableCell>
                    <TableCell>{User.role}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>

      {isEditModalOpen && (
        <AddEditTeamModal
          team={team}
          onClose={handleCloseEditModal}
          onSave={handleSaveTeam}
        />
      )}

      {isAddProjectModalOpen && (
        <AddProjectModal
          teamId={team.id}
          onClose={handleCloseAddProjectModal}
          onSave={handleSaveProject}
        />
      )}
    </Card>
  );
}
