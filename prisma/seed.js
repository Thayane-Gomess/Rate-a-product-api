import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // cria usuário admin
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

  // cria usuário comum
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

  // cria produtos
  const notebook = await prisma.produto.create({
    data: { name: "Notebook Dell", price: 3500 },
  });

  const celular = await prisma.produto.create({
    data: { name: "Smartphone Samsung", price: 2500 },
  });

  // cria avaliações do usuário
  await prisma.avaliacao.create({
    data: {
      rating: 5,
      comment: "Ótimo notebook, muito rápido!",
      userId: user.id,
      produtoId: notebook.id,
    },
  });

  await prisma.avaliacao.create({
    data: {
      rating: 4,
      comment: "Celular bom, mas a bateria podia durar mais.",
      userId: user.id,
      produtoId: celular.id,
    },
  });
}

main()
  .then(() => {
    console.log("Seed executado com sucesso!");
  })
  .catch((e) => {
    console.error("Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });