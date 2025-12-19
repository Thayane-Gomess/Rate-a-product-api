import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash("admin123", 10);

  await prisma.user.upsert({
    where: { email: "admin@teste.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@teste.com",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  const userPassword = await bcrypt.hash("user123", 10);

  const user = await prisma.user.upsert({
    where: { email: "user@teste.com" },
    update: {},
    create: {
      name: "Usuário Teste",
      email: "user@teste.com",
      password: userPassword,
      role: "USER",
    },
  });

  const notebook = await prisma.produto.create({
    data: {
      nome: "Notebook Dell",
      descricao: "Notebook para trabalho",
      preco: 3500,
    },
  });

  await prisma.avaliacao.create({
    data: {
      nota: 5,
      comentario: "Ótimo notebook, muito rápido!",
      userId: user.id,
      produtoId: notebook.id,
    },
  });
}

main()
  .then(() => console.log("Seed executado com sucesso!"))
  .finally(async () => prisma.$disconnect());
