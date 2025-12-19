import { PrismaClient } from '@prisma/client';

// Inicializa o Prisma Client
export const prisma = new PrismaClient();

// Exporta os modelos diretamente
export const db = {
  user: prisma.user,
  produto: prisma.produto,
  avaliacao: prisma.avaliacao
};

// Testa a conexão com o banco de dados
export async function testConnection() {
  try {
    await prisma.$connect();
    console.log('✅ Conectado ao banco de dados com sucesso!');
    return true;
  } catch (error) {
    console.error('❌ Erro ao conectar ao banco de dados:', error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

// Exporta o Prisma Client diretamente
export default prisma;
