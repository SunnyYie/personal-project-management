import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 创建团队
  // const team = await prisma.team.create({
  //   data: {
  //     name: "开发团队",
  //     avatar: "https://example.com/avatar.png",
  //     members: {
  //       create: [
  //         {
  //           email: "user1@example.com",
  //           name: "用户1",
  //           password: "password1",
  //           cognitoId: "cognito-id-1",
  //         },
  //         {
  //           email: "user2@example.com",
  //           name: "用户2",
  //           password: "password2",
  //           cognitoId: "cognito-id-2",
  //         },
  //       ],
  //     },
  //   },
  // });

  // // 创建项目
  // const project = await prisma.project.create({
  //   data: {
  //     name: "项目A",
  //     description: "这是一个示例项目",
  //     startDate: new Date(),
  //     endDate: new Date(new Date().setDate(new Date().getDate() + 30)),
  //     projectTeams: {
  //       create: {
  //         teamId: team.id,
  //       },
  //     },
  //   },
  // });

  // // 创建任务
  // await prisma.task.create({
  //   data: {
  //     title: "任务1",
  //     description: "这是任务1的描述",
  //     status: "待处理",
  //     priority: "高",
  //     projectId: project.id,
  //     authorUserId: team.members[0].id,
  //     assignedUserId: team.members[1].id,
  //   },
  // });

  console.log("Seed data has been created.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
