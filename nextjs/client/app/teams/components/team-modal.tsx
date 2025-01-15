"use client";

import { useState } from "react";
import { Team, Project, User } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useStore from "@/store";

type TeamWithProjectsAndMembers = Team & {
  projectTeams: { project: Project }[];
  UserTeam: { User: User }[];
};

interface AddEditTeamModalProps {
  team?: TeamWithProjectsAndMembers;
  onClose: () => void;
  onSave: (team: TeamWithProjectsAndMembers) => void;
}

export default function AddEditTeamModal({
  team,
  onClose,
  onSave,
}: AddEditTeamModalProps) {
  const [name, setName] = useState(team?.name || "");
  const userInfo = useStore((state) => state.userInfo);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const teamData = { name };
    let savedTeam;

    if (team) {
      const response = await fetch(`/api/teams`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...teamData, id: team.id }),
      });

      if (!response.ok) {
        console.error("编辑团队时出错:", response.statusText);
        return;
      }

      const {
        data: { body: currentTeam },
      } = await response.json();
      savedTeam = currentTeam;
    } else {
      const response = await fetch("/api/teams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: teamData.name,
          avatar: "https://i.pravatar.cc/150?u=" + teamData.name,
          projectManagerUserId: userInfo.id,
          productOwnerUserId: userInfo.id,
        }),
      });

      if (!response.ok) {
        console.error("添加团队时出错:", response.statusText);
        return;
      }
      const {
        data: { body: team },
      } = await response.json();
      savedTeam = team;
    }

    onSave(savedTeam);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{team ? "编辑团队" : "添加团队"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                名称
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">保存</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
