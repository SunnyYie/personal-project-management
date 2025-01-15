"use client";

import { useState } from "react";
import { Team, Project, User } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TeamWithProjectsAndMembers } from "@/actions/team";
import TeamDetails from "./team-detail";
import AddEditTeamModal from "./team-modal";

interface TeamListProps {
  initialTeams: TeamWithProjectsAndMembers[];
}

export default function TeamList({ initialTeams }: TeamListProps) {
  const [teams, setTeams] =
    useState<TeamWithProjectsAndMembers[]>(initialTeams);
  const [selectedTeam, setSelectedTeam] =
    useState<TeamWithProjectsAndMembers | null>(null);
  const [isAddTeamModalOpen, setIsAddTeamModalOpen] = useState(false);

  const handleSelectTeam = (team: TeamWithProjectsAndMembers) => {
    setSelectedTeam(team);
  };

  const handleAddTeam = () => {
    setIsAddTeamModalOpen(true);
  };

  const handleCloseAddTeamModal = () => {
    setIsAddTeamModalOpen(false);
  };

  const handleSaveTeam = (newTeam: TeamWithProjectsAndMembers) => {
    setTeams([...teams, newTeam]);
    console.log("New team added:", [...teams, newTeam]);
    setIsAddTeamModalOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">团队列表</h2>
        <Button onClick={handleAddTeam}>添加团队</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>名称</TableHead>
            <TableHead>项目数量</TableHead>
            <TableHead>成员数量</TableHead>
            <TableHead>创建者</TableHead>
            <TableHead>管理者</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teams.map((team) => (
            <TableRow key={team.id}>
              <TableCell>{team.name}</TableCell>
              <TableCell>{team?.projectTeams?.length || 0}</TableCell>
              <TableCell>{team?.UserTeam?.length || 0}</TableCell>
              <TableCell>{team.productOwnerUserId}</TableCell>
              <TableCell>{team.projectManagerUserId}</TableCell>

              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSelectTeam(team)}
                >
                  查看详情
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedTeam && (
        <TeamDetails
          team={selectedTeam}
          onUpdate={(updatedTeam) => {
            setTeams(
              teams.map((t) => (t.id === updatedTeam.id ? updatedTeam : t)),
            );
            setSelectedTeam(updatedTeam);
          }}
          onClose={() => setSelectedTeam(null)}
        />
      )}
      {isAddTeamModalOpen && (
        <AddEditTeamModal
          onClose={handleCloseAddTeamModal}
          onSave={handleSaveTeam}
        />
      )}
    </div>
  );
}
