"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { User, Team, Role } from "@prisma/client";
import { MemberWithTeam } from "@/actions/user";

interface AddEditMemberModalProps {
  member?: MemberWithTeam;
  onClose: () => void;
  onSave: (member: MemberWithTeam) => void;
}

export default function AddEditMemberModal({
  member,
  onClose,
  onSave,
}: AddEditMemberModalProps) {
  const [name, setName] = useState(member?.name || "");
  const [email, setEmail] = useState(member?.email || "");
  const [role, setRole] = useState<Role>(member?.role || Role.USER);
  const [teamId, setTeamId] = useState(member?.UserTeam[0].Team.id || "");
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    // 获取团队列表
    fetch("/api/teams?queryType=all")
      .then((res) => res.json())
      .then((data) => setTeams(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const memberData = { name, email, role, teamId };
    let savedMember: MemberWithTeam;

    if (member) {
      const res = await fetch(`/api/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...memberData, id: member.id }),
      });
      savedMember = await res.json();
    } else {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(memberData),
      });
      savedMember = await res.json();
    }

    onSave(savedMember);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{member ? "编辑成员" : "添加成员"}</DialogTitle>
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                邮箱
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                角色
              </Label>
              <Select
                value={role}
                onValueChange={(value: Role) => setRole(value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="选择角色" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={Role.USER}>用户</SelectItem>
                  <SelectItem value={Role.ADMIN}>管理员</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="team" className="text-right">
                团队
              </Label>
              <Select value={teamId} onValueChange={setTeamId}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="选择团队" />
                </SelectTrigger>
                <SelectContent>
                  {teams.map((team) => (
                    <SelectItem key={team.id} value={team.id}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
