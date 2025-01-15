"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MemberWithTeam } from "@/actions/user";
import { Button } from "@/components/ui/button";
import AddEditMemberModal from "./member-modal";
import { useState } from "react";

interface MemberListProps {
  initialMembers: MemberWithTeam[];
}

export default function MemberList({ initialMembers }: MemberListProps) {
  const [members, setMembers] = useState<MemberWithTeam[]>(initialMembers);
  const [editingMember, setEditingMember] = useState<MemberWithTeam | null>(
    null,
  );

  const handleEditMember = (member: MemberWithTeam) => {
    setEditingMember(member);
  };

  const handleCloseModal = () => {
    setEditingMember(null);
  };

  const handleUpdateMember = (updatedMember: MemberWithTeam) => {
    setMembers(
      members.map((member) =>
        member.id === updatedMember.id ? updatedMember : member,
      ),
    );
    setEditingMember(null);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>名称</TableHead>
            <TableHead>邮箱</TableHead>
            <TableHead>角色</TableHead>
            <TableHead>团队</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id}>
              <TableCell>{member.name}</TableCell>
              <TableCell>{member.email}</TableCell>
              <TableCell>{member.role}</TableCell>
              <TableCell>{member.UserTeam[0].Team?.name || "未分配"}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditMember(member)}
                >
                  编辑
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {editingMember && (
        <AddEditMemberModal
          member={editingMember}
          onClose={handleCloseModal}
          onSave={handleUpdateMember}
        />
      )}
    </>
  );
}
