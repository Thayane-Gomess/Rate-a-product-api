import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

// Configuração do Supabase usando variáveis de ambiente
const supabaseUrl = process.env.SUPABASE_URL || 'https://npjiipvqeqxckioqskzt.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'sua-chave-supabase-aqui';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false, // Não armazenar a sessão no localStorage
  },
});

// Função para testar a conexão com o Supabase
export async function testConnection() {
  try {
    const { data, error } = await supabase
      .from('Produto') // Ajuste para o nome da tabela que existe no seu schema
      .select('*')
      .limit(1);
    
    if (error) throw error;
    
    console.log('✅ Conexão com Supabase estabelecida com sucesso!');
    return true;
  } catch (error) {
    console.error('❌ Erro ao conectar ao Supabase:', error.message);
    return false;
  }
}

// Exporta funções comuns de CRUD
export const database = {
  // Buscar todos os itens de uma tabela
  async findAll(table) {
    const { data, error } = await supabase
      .from(table)
      .select('*');
    
    if (error) throw error;
    return data;
  },
  
  // Buscar um item por ID
  async findById(table, id) {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },
  
  // Criar um novo item
  async create(table, item) {
    const { data, error } = await supabase
      .from(table)
      .insert([item])
      .select();
    
    if (error) throw error;
    return data?.[0];
  },
  
  // Atualizar um item
  async update(table, id, updates) {
    const { data, error } = await supabase
      .from(table)
      .update(updates)
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return data?.[0];
  },
  
  // Excluir um item
  async delete(table, id) {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  }
};

export default {
  supabase,
  testConnection,
  database
};