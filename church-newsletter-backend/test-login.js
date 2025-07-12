const axios = require('axios');

const API_BASE_URL = 'http://localhost:3001';

const testUsers = [
  { email: 'admin@paroquia.com', password: 'admin123', role: 'admin' },
  { email: 'editor@paroquia.com', password: 'editor123', role: 'editor' },
  { email: 'common@paroquia.com', password: 'common123', role: 'common' },
  { email: 'maria@paroquia.com', password: 'common123', role: 'common' },
  { email: 'joao@paroquia.com', password: 'common123', role: 'common' },
  { email: 'ana@paroquia.com', password: 'common123', role: 'common' },
  { email: 'pedro@paroquia.com', password: 'common123', role: 'common' },
  { email: 'lucia@paroquia.com', password: 'common123', role: 'common' },
  { email: 'carlos@paroquia.com', password: 'common123', role: 'common' },
  { email: 'fernanda@paroquia.com', password: 'common123', role: 'common' },
  { email: 'roberto@paroquia.com', password: 'common123', role: 'common' },
  { email: 'patricia@paroquia.com', password: 'common123', role: 'common' },
  { email: 'redator2@paroquia.com', password: 'editor123', role: 'editor' },
  { email: 'redator3@paroquia.com', password: 'editor123', role: 'editor' }
];

async function testLogin() {
  console.log('Testando login com todos os usuários...\n');

  for (const user of testUsers) {
    try {
      console.log(`Testando login: ${user.email} (${user.role})`);
      
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email: user.email,
        password: user.password
      });

      if (response.data.success) {
        console.log(`✅ Login bem-sucedido para ${user.email}`);
        console.log(`   Token: ${response.data.data.token ? 'Sim' : 'Não'}`);
        console.log(`   Usuário: ${response.data.data.user.name}`);
        console.log(`   Role: ${response.data.data.user.role}\n`);
      } else {
        console.log(`❌ Login falhou para ${user.email}: ${response.data.message}\n`);
      }
    } catch (error) {
      console.log(`❌ Erro no login para ${user.email}: ${error.response?.data?.message || error.message}\n`);
    }
  }
}

testLogin(); 