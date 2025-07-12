-- Atualizar a tabela users para suportar o novo sistema de roles
-- Executar este script após a criação inicial das tabelas

-- Alterar o ENUM de roles para incluir 'common'
ALTER TABLE users MODIFY COLUMN role ENUM('admin', 'editor', 'common') NOT NULL DEFAULT 'common';

-- Atualizar usuários existentes que tenham role 'editor' para manter compatibilidade
-- (opcional - apenas se quiser manter os editores existentes)
-- UPDATE users SET role = 'editor' WHERE role = 'editor';

-- Adicionar índices para melhor performance
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_is_active ON users(is_active);
CREATE INDEX idx_users_email ON users(email);

-- Verificar se existe pelo menos um administrador
-- Se não existir, criar um administrador padrão (senha: admin123)
INSERT INTO users (id, name, email, password, role, is_active, createdAt, updatedAt)
SELECT 
    UUID() as id,
    'Administrador' as name,
    'admin@paroquia.com' as email,
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/HS.iQeO' as password, -- admin123
    'admin' as role,
    1 as is_active,
    NOW() as createdAt,
    NOW() as updatedAt
WHERE NOT EXISTS (
    SELECT 1 FROM users WHERE role = 'admin'
); 