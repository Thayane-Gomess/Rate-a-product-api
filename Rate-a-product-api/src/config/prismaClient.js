// Instância do Prisma Client para acessar o banco
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = prisma;