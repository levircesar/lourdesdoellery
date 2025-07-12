const axios = require('axios');

const API_BASE_URL = 'http://localhost:3001';

async function testUserManagement() {
  try {
    console.log('Testando gerenciamento de usuários...\n');
    
    // 1. Fazer login como admin
    console.log('1. Fazendo login como admin...');
    const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
      email: 'admin@paroquia.com',
      password: 'admin123'
    });
    
    const token = loginResponse.data.data.token;
    console.log('✅ Login bem-sucedido como admin\n');
    
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    
    // 2. Criar um novo usuário
    console.log('2. Criando novo usuário...');
    const newUserData = {
      name: 'Usuário Teste Admin',
      email: 'teste-admin@paroquia.com',
      password: 'teste123',
      role: 'common',
      is_active: true
    };
    
    const createResponse = await axios.post(`${API_BASE_URL}/auth/users`, newUserData, { headers });
    console.log('✅ Usuário criado:', createResponse.data.data.name);
    console.log('   Email:', createResponse.data.data.email);
    console.log('   Role:', createResponse.data.data.role);
    console.log('   ID:', createResponse.data.data.id);
    
    const newUserId = createResponse.data.data.id;
    
    // 3. Testar login com o novo usuário
    console.log('\n3. Testando login com o novo usuário...');
    try {
      const newUserLoginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
        email: 'teste-admin@paroquia.com',
        password: 'teste123'
      });
      
      if (newUserLoginResponse.data.success) {
        console.log('✅ Login bem-sucedido com o novo usuário!');
        console.log('   Nome:', newUserLoginResponse.data.data.user.name);
        console.log('   Role:', newUserLoginResponse.data.data.user.role);
      } else {
        console.log('❌ Login falhou com o novo usuário');
      }
    } catch (error) {
      console.log('❌ Erro no login com novo usuário:', error.response?.data?.message || error.message);
    }
    
    // 4. Alterar senha do usuário
    console.log('\n4. Alterando senha do usuário...');
    const newPassword = 'nova123';
    
    const changePasswordResponse = await axios.post(
      `${API_BASE_URL}/auth/users/${newUserId}/change-password`,
      { newPassword },
      { headers }
    );
    
    if (changePasswordResponse.data.success) {
      console.log('✅ Senha alterada com sucesso!');
      
      // 5. Testar login com a nova senha
      console.log('\n5. Testando login com a nova senha...');
      try {
        const newPasswordLoginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
          email: 'teste-admin@paroquia.com',
          password: newPassword
        });
        
        if (newPasswordLoginResponse.data.success) {
          console.log('✅ Login bem-sucedido com a nova senha!');
        } else {
          console.log('❌ Login falhou com a nova senha');
        }
      } catch (error) {
        console.log('❌ Erro no login com nova senha:', error.response?.data?.message || error.message);
      }
    } else {
      console.log('❌ Falha ao alterar senha:', changePasswordResponse.data.message);
    }
    
    // 6. Atualizar dados do usuário
    console.log('\n6. Atualizando dados do usuário...');
    const updateData = {
      name: 'Usuário Teste Atualizado',
      role: 'editor',
      is_active: true
    };
    
    const updateResponse = await axios.put(`${API_BASE_URL}/auth/users/${newUserId}`, updateData, { headers });
    
    if (updateResponse.data.success) {
      console.log('✅ Usuário atualizado com sucesso!');
      console.log('   Novo nome:', updateResponse.data.data.name);
      console.log('   Novo role:', updateResponse.data.data.role);
    } else {
      console.log('❌ Falha ao atualizar usuário:', updateResponse.data.message);
    }
    
    // 7. Listar todos os usuários
    console.log('\n7. Listando todos os usuários...');
    const usersResponse = await axios.get(`${API_BASE_URL}/auth/users`, { headers });
    
    if (usersResponse.data.success) {
      console.log(`✅ Encontrados ${usersResponse.data.data.length} usuários:`);
      usersResponse.data.data.forEach((user, index) => {
        console.log(`   ${index + 1}. ${user.name} (${user.email}) - ${user.role}`);
      });
    } else {
      console.log('❌ Falha ao listar usuários:', usersResponse.data.message);
    }
    
    // 8. Deletar o usuário de teste
    console.log('\n8. Deletando usuário de teste...');
    const deleteResponse = await axios.delete(`${API_BASE_URL}/auth/users/${newUserId}`, { headers });
    
    if (deleteResponse.data.success) {
      console.log('✅ Usuário deletado com sucesso!');
    } else {
      console.log('❌ Falha ao deletar usuário:', deleteResponse.data.message);
    }
    
  } catch (error) {
    console.error('❌ Erro geral:', error.response?.data?.message || error.message);
  }
}

testUserManagement(); 