import 'dotenv/config';
import app from './app.js';
import { testConnection } from './services/database.service.js';

const PORT = process.env.PORT || 3000;

// Testa a conexão com o banco de dados
testConnection()
  .then(() => {
    // Inicia o servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error('❌ Erro ao conectar ao banco de dados:', error);
    process.exit(1);
  });
