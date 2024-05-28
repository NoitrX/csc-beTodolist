import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

async function main() {
  // const hashPw = await bcrypt.hash("password", 10);
  // const user = await prisma.user.create({
  //   data: {
  //     username: "NoitrX",
  //     name: "NaufhalZs",
  //     password: hashPw,
  //     level: "USER",
  //   },
  // });
  // console.log(user);
  const todolist = await prisma.todolist.create({
    data: {
      name: "Belajar Prisma",
      createdBy: 1,
      updatedBy: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  console.log(todolist);

  const todoListAttachment = await prisma.todoList_attachment.create({
    data: {
      todolistId: 1,
      createdBy: 1,
      file: "TEST",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  console.log(todoListAttachment);
}

main()
  .catch(async (e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
