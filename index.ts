import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

async function main() {
  const hashPw = await bcrypt.hash("password", 10);
  const user = await prisma.user.create({
    data: {
      username: "NoitrX",
      name: "NaufhalZs",
      password: hashPw,
      level: "USER",
    },
  });
  console.log(user);
  // const todolist = await prisma.todolist.create({
  //   data: {
  //     name: "Belajar Prisma",
  //     createdBy: 1,
  //     updatedBy: 1,
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   },
  // });
  // console.log(todolist);
}

main()
  .catch(async (e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
