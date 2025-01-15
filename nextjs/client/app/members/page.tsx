import AddMemberButton from "./components/member-button";
import MemberList from "./components/member-list";
import { getUsers } from "@/actions/user";
import { Suspense } from "react";

export default async function MembersPage() {
  const {
    data: { body: initialMembers },
  } = await getUsers();

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">成员管理</h1>
      <AddMemberButton />
      <Suspense fallback={<div>加载中...</div>}>
        <MemberList initialMembers={initialMembers} />
      </Suspense>
    </div>
  );
}
