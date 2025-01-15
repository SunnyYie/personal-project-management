"use client";

import { Button } from "@/components/ui/button";
import AddEditMemberModal from "./member-modal";
import { User, Team } from "@prisma/client";
import { useState } from "react";
import { MemberWithTeam } from "@/actions/user";

export default function AddMemberButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleAddMember = (newMember: MemberWithTeam) => {
    // 在这里处理添加新成员的逻辑
    console.log("New member added:", newMember);
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpenModal}>添加成员</Button>
      {isModalOpen && (
        <AddEditMemberModal
          onClose={handleCloseModal}
          onSave={handleAddMember}
        />
      )}
    </>
  );
}
