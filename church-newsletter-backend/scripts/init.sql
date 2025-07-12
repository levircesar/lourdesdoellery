-- Script de inicialização do banco de dados PostgreSQL
-- Este script cria todas as tabelas e insere dados de teste

-- Criar banco de dados se não existir (PostgreSQL não suporta CREATE DATABASE IF NOT EXISTS)
-- O banco já é criado pelo POSTGRES_DB no docker-compose

-- Tabela de usuários com sistema de permissões
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
  role VARCHAR(10) NOT NULL DEFAULT 'common' CHECK (role IN ('admin', 'editor', 'common')),
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de notícias
CREATE TABLE IF NOT EXISTS news (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
  slug VARCHAR(255) UNIQUE NOT NULL,
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP,
  expires_at TIMESTAMP,
  created_by UUID,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Tabela de avisos
CREATE TABLE IF NOT EXISTS announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    week_start DATE NOT NULL,
    week_end DATE NOT NULL,
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP,
  expires_at TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE,
  created_by UUID,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Tabela de horários de missa
CREATE TABLE IF NOT EXISTS mass_schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
    time TIME NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de aniversariantes
CREATE TABLE IF NOT EXISTS birthdays (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    birth_date DATE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de informações da paróquia
CREATE TABLE IF NOT EXISTS parish_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section VARCHAR(100) NOT NULL,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  image_url VARCHAR(500),
  is_active BOOLEAN DEFAULT TRUE,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de dizimistas
CREATE TABLE IF NOT EXISTS dizimistas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    address TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de intenções de missa
CREATE TABLE IF NOT EXISTS mass_intentions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  intention_type VARCHAR(20) NOT NULL CHECK (intention_type IN ('thanksgiving', 'deceased')),
  notes TEXT NOT NULL,
  is_recurring BOOLEAN DEFAULT false,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Inserir dados de teste

-- Usuários de teste (senhas: admin123, editor123, common123)
INSERT INTO users (id, name, email, password, role, is_active) VALUES
('550e8400-e29b-41d4-a716-446655440001'::UUID, 'Administrador', 'admin@paroquia.com', '$2a$12$MbyrNMcsFBKLJCeSLpXhzuPtRASZOp/qx8vkW7kJiHHMi23OSrnjC', 'admin', TRUE),
('550e8400-e29b-41d4-a716-446655440002'::UUID, 'Redator', 'editor@paroquia.com', '$2a$12$XEyiFAAqGKgZWcw5D20EyuoFU0ZWpblzR2k57qPUAmP4Oe5WeDsy2', 'editor', TRUE),
('550e8400-e29b-41d4-a716-446655440003'::UUID, 'Usuário Comum', 'common@paroquia.com', '$2a$12$RAv3WBIVsgxUF.12pkzWg.UU.WS1vzoBzr71YDn37ZZbw8jgCxmuW', 'common', TRUE),
('550e8400-e29b-41d4-a716-446655440004'::UUID, 'Maria Silva', 'maria@paroquia.com', '$2a$12$RAv3WBIVsgxUF.12pkzWg.UU.WS1vzoBzr71YDn37ZZbw8jgCxmuW', 'common', TRUE),
('550e8400-e29b-41d4-a716-446655440005'::UUID, 'João Santos', 'joao@paroquia.com', '$2a$12$RAv3WBIVsgxUF.12pkzWg.UU.WS1vzoBzr71YDn37ZZbw8jgCxmuW', 'common', TRUE),
('550e8400-e29b-41d4-a716-446655440006'::UUID, 'Ana Costa', 'ana@paroquia.com', '$2a$12$RAv3WBIVsgxUF.12pkzWg.UU.WS1vzoBzr71YDn37ZZbw8jgCxmuW', 'common', TRUE),
('550e8400-e29b-41d4-a716-446655440007'::UUID, 'Pedro Oliveira', 'pedro@paroquia.com', '$2a$12$RAv3WBIVsgxUF.12pkzWg.UU.WS1vzoBzr71YDn37ZZbw8jgCxmuW', 'common', TRUE),
('550e8400-e29b-41d4-a716-446655440008'::UUID, 'Lucia Ferreira', 'lucia@paroquia.com', '$2a$12$RAv3WBIVsgxUF.12pkzWg.UU.WS1vzoBzr71YDn37ZZbw8jgCxmuW', 'common', TRUE),
('550e8400-e29b-41d4-a716-446655440009'::UUID, 'Carlos Lima', 'carlos@paroquia.com', '$2a$12$RAv3WBIVsgxUF.12pkzWg.UU.WS1vzoBzr71YDn37ZZbw8jgCxmuW', 'common', TRUE),
('550e8400-e29b-41d4-a716-446655440010'::UUID, 'Fernanda Almeida', 'fernanda@paroquia.com', '$2a$12$RAv3WBIVsgxUF.12pkzWg.UU.WS1vzoBzr71YDn37ZZbw8jgCxmuW', 'common', TRUE),
('550e8400-e29b-41d4-a716-446655440011'::UUID, 'Roberto Mendes', 'roberto@paroquia.com', '$2a$12$RAv3WBIVsgxUF.12pkzWg.UU.WS1vzoBzr71YDn37ZZbw8jgCxmuW', 'common', TRUE),
('550e8400-e29b-41d4-a716-446655440012'::UUID, 'Patricia Souza', 'patricia@paroquia.com', '$2a$12$RAv3WBIVsgxUF.12pkzWg.UU.WS1vzoBzr71YDn37ZZbw8jgCxmuW', 'common', TRUE),
('550e8400-e29b-41d4-a716-446655440013'::UUID, 'Redator 2', 'redator2@paroquia.com', '$2a$12$XEyiFAAqGKgZWcw5D20EyuoFU0ZWpblzR2k57qPUAmP4Oe5WeDsy2', 'editor', TRUE),
('550e8400-e29b-41d4-a716-446655440014'::UUID, 'Redator 3', 'redator3@paroquia.com', '$2a$12$XEyiFAAqGKgZWcw5D20EyuoFU0ZWpblzR2k57qPUAmP4Oe5WeDsy2', 'editor', TRUE),
('550e8400-e29b-41d4-a716-446655440015'::UUID, 'Administrador Lourdes', 'admin@lourdesdoellery.com', '$2a$12$MbyrNMcsFBKLJCeSLpXhzuPtRASZOp/qx8vkW7kJiHHMi23OSrnjC', 'admin', TRUE);

-- Notícias de teste
INSERT INTO news (id, title, content, excerpt, slug, is_published, created_by, order_index) VALUES
('660e8400-e29b-41d4-a716-446655440001'::UUID, 'Missa de Natal', 'Celebraremos a Missa de Natal às 18h no dia 24 de dezembro.', 'Missa especial de Natal', 'missa-de-natal', TRUE, '550e8400-e29b-41d4-a716-446655440001'::UUID, 1),
('660e8400-e29b-41d4-a716-446655440002'::UUID, 'Retiro Espiritual', 'Retiro espiritual para jovens nos dias 15 e 16 de janeiro.', 'Retiro para jovens', 'retiro-espiritual', TRUE, '550e8400-e29b-41d4-a716-446655440002'::UUID, 2),
('660e8400-e29b-41d4-a716-446655440003'::UUID, 'Catequese 2024', 'Inscrições abertas para catequese 2024. Início em fevereiro.', 'Inscrições catequese', 'catequese-2024', FALSE, '550e8400-e29b-41d4-a716-446655440002'::UUID, 3);

-- Avisos de teste
INSERT INTO announcements (id, title, content, week_start, week_end, is_published, is_active, created_by, order_index) VALUES
('770e8400-e29b-41d4-a716-446655440001'::UUID, 'Mudança de Horário', 'A missa das 19h de domingo foi alterada para 18h30.', '2024-01-01', '2024-01-07', TRUE, TRUE, '550e8400-e29b-41d4-a716-446655440001'::UUID, 1),
('770e8400-e29b-41d4-a716-446655440002'::UUID, 'Reunião de Pastoral', 'Reunião da pastoral da juventude no sábado às 15h.', '2024-01-08', '2024-01-14', TRUE, TRUE, '550e8400-e29b-41d4-a716-446655440002'::UUID, 2),
('770e8400-e29b-41d4-a716-446655440003'::UUID, 'Manutenção da Igreja', 'A igreja estará fechada para manutenção na próxima semana.', '2024-01-15', '2024-01-21', TRUE, TRUE, '550e8400-e29b-41d4-a716-446655440001'::UUID, 3);

-- Horários de missa de teste
INSERT INTO mass_schedules (id, day_of_week, time, description, is_active, order_index) VALUES
('880e8400-e29b-41d4-a716-446655440001'::UUID, 0, '08:00:00', 'Matriz (Pe. Bruno)', TRUE, 1),
('880e8400-e29b-41d4-a716-446655440002'::UUID, 0, '18:30:00', 'Matriz (Pe. Bruno)', TRUE, 2),
('880e8400-e29b-41d4-a716-446655440007'::UUID, 1, '18:30:00', 'Matriz (Pe. Bruno)', TRUE, 1),
('880e8400-e29b-41d4-a716-446655440003'::UUID, 2, '19:00:00', 'Matriz (Pe. Bruno)', TRUE, 2),
('880e8400-e29b-41d4-a716-446655440008'::UUID, 3, '18:30:00', 'Matriz (Pe. Bruno)', TRUE, 3),
('880e8400-e29b-41d4-a716-446655440009'::UUID, 4, '18:30:00', 'Matriz (Pe. Bruno)', TRUE, 4),
('880e8400-e29b-41d4-a716-446655440004'::UUID, 5, '19:00:00', 'Matriz (Pe. Bruno)', TRUE, 1),
('880e8400-e29b-41d4-a716-446655440005'::UUID, 5, '16:00:00', 'Matriz (Pe. Bruno)', TRUE, 2),
('880e8400-e29b-41d4-a716-446655440006'::UUID, 5, '17:30:00', 'Matriz (Pe. Bruno)', TRUE, 3),
('880e8400-e29b-41d4-a716-446655440010'::UUID, 6, '17:30:00', 'Matriz (Pe. Bruno)', TRUE, 1);

-- Aniversariantes de teste
INSERT INTO birthdays (id, name, birth_date, is_active, order_index) VALUES
('990e8400-e29b-41d4-a716-446655440001'::UUID, 'João Silva', '1985-03-15', TRUE, 1),
('990e8400-e29b-41d4-a716-446655440002'::UUID, 'Maria Santos', '1990-07-22', TRUE, 2),
('990e8400-e29b-41d4-a716-446655440003'::UUID, 'Pedro Costa', '1978-11-08', TRUE, 3),
('990e8400-e29b-41d4-a716-446655440004'::UUID, 'Ana Oliveira', '1992-01-30', TRUE, 4),
('990e8400-e29b-41d4-a716-446655440005'::UUID, 'Carlos Ferreira', '1983-05-12', TRUE, 5);

-- Informações da paróquia de teste
INSERT INTO parish_info (id, section, title, content, is_active, order_index) VALUES
('aa0e8400-e29b-41d4-a716-446655440001'::UUID, 'historia', 'História da Paróquia', 'Nossa paróquia foi fundada em 1960 e tem uma rica história de fé e comunidade.', TRUE, 1),
('aa0e8400-e29b-41d4-a716-446655440002'::UUID, 'missao', 'Nossa Missão', 'Proclamar o Evangelho e servir a comunidade com amor e dedicação.', TRUE, 2),
('aa0e8400-e29b-41d4-a716-446655440003'::UUID, 'visao', 'Nossa Visão', 'Ser uma comunidade de fé acolhedora e missionária.', TRUE, 3);

-- Dizimistas de teste
INSERT INTO dizimistas (id, name, email, phone, address, is_active, order_index) VALUES
('bb0e8400-e29b-41d4-a716-446655440001'::UUID, 'Roberto Almeida', 'roberto@email.com', '(11) 99999-1111', 'Rua das Flores, 123', TRUE, 1),
('bb0e8400-e29b-41d4-a716-446655440002'::UUID, 'Lucia Mendes', 'lucia@email.com', '(11) 99999-2222', 'Av. Principal, 456', TRUE, 2),
('bb0e8400-e29b-41d4-a716-446655440003'::UUID, 'Fernando Lima', 'fernando@email.com', '(11) 99999-3333', 'Rua do Comércio, 789', TRUE, 3);

-- Intenções de missa de teste
INSERT INTO mass_intentions (id, intention_type, notes, is_recurring, created_by) VALUES 
(
  'cc0e8400-e29b-41d4-a716-446655440001'::UUID,
  'thanksgiving',
  'Ação de graças pela saúde da família Silva',
  false,
  '550e8400-e29b-41d4-a716-446655440001'::UUID
),
(
  'cc0e8400-e29b-41d4-a716-446655440002'::UUID,
  'deceased',
  'Em memória de João Santos, falecido em 15/01/2024',
  true,
  '550e8400-e29b-41d4-a716-446655440001'::UUID
),
(
  'cc0e8400-e29b-41d4-a716-446655440003'::UUID,
  'thanksgiving',
  'Ação de graças pela cura de Maria Oliveira',
  false,
  '550e8400-e29b-41d4-a716-446655440001'::UUID
),
(
  'cc0e8400-e29b-41d4-a716-446655440004'::UUID,
  'deceased',
  'Em memória de Pedro Costa, falecido em 20/01/2024',
  true,
  '550e8400-e29b-41d4-a716-446655440001'::UUID
),
(
  'cc0e8400-e29b-41d4-a716-446655440005'::UUID,
  'thanksgiving',
  'Ação de graças pelo aniversário de 50 anos de casamento dos pais',
  false,
  '550e8400-e29b-41d4-a716-446655440001'::UUID
);

-- Criar índices para melhor performance
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_is_active ON users(is_active);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_news_slug ON news(slug);
CREATE INDEX idx_news_is_published ON news(is_published);
CREATE INDEX idx_announcements_is_active ON announcements(is_active);
CREATE INDEX idx_announcements_week_dates ON announcements(week_start, week_end);
CREATE INDEX idx_mass_schedules_day_time ON mass_schedules(day_of_week, time);
CREATE INDEX idx_birthdays_birth_date ON birthdays(birth_date);
CREATE INDEX idx_birthdays_is_active ON birthdays(is_active);
CREATE INDEX idx_parish_info_section ON parish_info(section);
CREATE INDEX idx_dizimistas_is_active ON dizimistas(is_active);
CREATE INDEX idx_mass_intentions_recurring ON mass_intentions(is_recurring);
CREATE INDEX idx_mass_intentions_created_by ON mass_intentions(created_by);

-- Verificar se os dados foram inseridos corretamente
SELECT 'Usuários criados:' as info, COUNT(*) as total FROM users;
SELECT 'Notícias criadas:' as info, COUNT(*) as total FROM news;
SELECT 'Avisos criados:' as info, COUNT(*) as total FROM announcements;
SELECT 'Horários de missa criados:' as info, COUNT(*) as total FROM mass_schedules;
SELECT 'Aniversariantes criados:' as info, COUNT(*) as total FROM birthdays;
SELECT 'Informações da paróquia criadas:' as info, COUNT(*) as total FROM parish_info;
SELECT 'Dizimistas criados:' as info, COUNT(*) as total FROM dizimistas;
SELECT 'Intenções de missa criadas:' as info, COUNT(*) as total FROM mass_intentions;