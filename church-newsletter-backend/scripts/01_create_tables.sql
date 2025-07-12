-- Script de criação das tabelas para o Church Newsletter
-- Execute este script no banco de dados PostgreSQL

-- Apagar tabelas existentes (se houver)
DROP TABLE IF EXISTS mass_intentions CASCADE;
DROP TABLE IF EXISTS parish_info CASCADE;
DROP TABLE IF EXISTS dizimistas CASCADE;
DROP TABLE IF EXISTS birthdays CASCADE;
DROP TABLE IF EXISTS mass_schedules CASCADE;
DROP TABLE IF EXISTS announcements CASCADE;
DROP TABLE IF EXISTS news CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('admin', 'user')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de notícias
CREATE TABLE IF NOT EXISTS news (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    image_url VARCHAR(500),
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de anúncios
CREATE TABLE IF NOT EXISTS announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    week_start DATE NOT NULL,
    week_end DATE NOT NULL,
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de horários de missa
CREATE TABLE IF NOT EXISTS mass_schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    day_of_week VARCHAR(20) NOT NULL CHECK (day_of_week IN ('domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado')),
    time TIME NOT NULL,
    description VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de aniversariantes
CREATE TABLE IF NOT EXISTS birthdays (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    birth_date DATE NOT NULL,
    age INTEGER,
    is_active BOOLEAN DEFAULT true,
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de dizimistas
CREATE TABLE IF NOT EXISTS dizimistas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    address TEXT,
    is_active BOOLEAN DEFAULT true,
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de informações da paróquia
CREATE TABLE IF NOT EXISTS parish_info (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section VARCHAR(50) NOT NULL CHECK (section IN ('history', 'mission', 'vision', 'contact', 'address')),
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    image_url VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(section)
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

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_news_created_by ON news(created_by);
CREATE INDEX IF NOT EXISTS idx_news_published ON news(is_published, published_at);
CREATE INDEX IF NOT EXISTS idx_announcements_created_by ON announcements(created_by);
CREATE INDEX IF NOT EXISTS idx_announcements_published ON announcements(is_published, published_at);
CREATE INDEX IF NOT EXISTS idx_birthdays_birth_date ON birthdays(birth_date);
CREATE INDEX IF NOT EXISTS idx_birthdays_active ON birthdays(is_active);
CREATE INDEX IF NOT EXISTS idx_mass_schedules_day_time ON mass_schedules(day_of_week, time);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_active ON users(is_active);
CREATE INDEX IF NOT EXISTS idx_mass_intentions_recurring ON mass_intentions(is_recurring);
CREATE INDEX IF NOT EXISTS idx_mass_intentions_created_by ON mass_intentions(created_by);

-- ========================================
-- DADOS DE EXEMPLO PARA TODAS AS TABELAS
-- ========================================

-- 1. Usuário Administrador
INSERT INTO users (id, name, email, password, role, is_active, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'Administrador',
  'admin@igreja.com',
  '$2a$12$ww0k9X3y3N73tkHR1Ls37OuvZtik0wORiAnQba10iJYavlfbNUfky',
  'admin',
  true,
  NOW(),
  NOW()
);

-- 2. Notícia de Exemplo
INSERT INTO news (id, title, content, excerpt, slug, is_published, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'Bem-vindos ao Nosso Boletim Paroquial',
  'É com grande alegria que inauguramos nosso boletim paroquial digital. Este espaço será dedicado a compartilhar as notícias, eventos e informações importantes da nossa comunidade paroquial. Aqui você encontrará tudo sobre nossas missas, atividades pastorais, aniversariantes do mês e muito mais. Que este seja um instrumento de união e comunicação entre todos os membros da nossa paróquia.',
  'Inauguração do boletim paroquial digital da nossa comunidade.',
  'bem-vindos-ao-nosso-boletim-paroquial',
  true,
  NOW(),
  NOW()
);

-- 3. Aviso de Exemplo
INSERT INTO announcements (id, title, content, week_start, week_end, is_published, is_active, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'Reunião do Conselho Paroquial',
  'Convocamos todos os membros do Conselho Paroquial para uma reunião importante que acontecerá no próximo domingo após a missa das 10h. Na pauta: planejamento das atividades do próximo trimestre e organização da festa paroquial.',
  '2024-01-15',
  '2024-01-21',
  true,
  true,
  NOW(),
  NOW()
);

-- 4. Horário de Missa de Exemplo
INSERT INTO mass_schedules (id, day_of_week, time, description, is_active, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'domingo',
  '08:00',
  'Missa Dominical',
  true,
  NOW(),
  NOW()
);

-- 5. Aniversariante de Exemplo
INSERT INTO birthdays (id, name, birth_date, is_active, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'Maria Silva Santos',
  '1985-07-15',
  true,
  NOW(),
  NOW()
);

-- 6. Dizimista de Exemplo
INSERT INTO dizimistas (id, name, email, phone, address, is_active, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'João Silva',
  'joao.silva@email.com',
  '(11) 99999-9999',
  'Rua das Flores, 123 - Centro - São Paulo, SP',
  true,
  NOW(),
  NOW()
);

-- 7. Informação da Paróquia de Exemplo
INSERT INTO parish_info (id, section, title, content, is_active, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'history',
  'História da Nossa Paróquia',
  'Nossa paróquia foi fundada em 1950 e desde então tem servido fielmente à comunidade local. Ao longo de mais de 70 anos, temos sido um centro de fé, esperança e caridade, oferecendo apoio espiritual e material a todos que nos procuram. Nossa missão é continuar sendo um farol de luz e amor em nossa comunidade.',
  true,
  NOW(),
  NOW()
);

-- 8. Informação de Contato
INSERT INTO parish_info (id, section, title, content, is_active, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'contact',
  'Informações de Contato',
  'Para entrar em contato conosco, utilize os seguintes canais: Telefone: (11) 1234-5678 | Email: secretaria@paroquia.com | Horário de atendimento: Segunda a Sexta das 8h às 18h, Sábado das 8h às 12h.',
  true,
  NOW(),
  NOW()
);

-- 9. Informação de Endereço
INSERT INTO parish_info (id, section, title, content, is_active, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'address',
  'Endereço da Paróquia',
  'Nossa paróquia está localizada na Rua das Flores, 123, no centro da cidade. Próximo ao terminal de ônibus e com estacionamento disponível para os fiéis.',
  true,
  NOW(),
  NOW()
);

-- 10. Missão da Paróquia
INSERT INTO parish_info (id, section, title, content, is_active, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'mission',
  'Nossa Missão',
  'Nossa missão é evangelizar e servir, levando a palavra de Deus a todos os corações e oferecendo apoio e acolhimento a todos que nos procuram, especialmente aos mais necessitados.',
  true,
  NOW(),
  NOW()
);

-- 11. Visão da Paróquia
INSERT INTO parish_info (id, section, title, content, is_active, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'vision',
  'Nossa Visão',
  'Ser uma paróquia referência em acolhimento, evangelização e serviço à comunidade, formando discípulos missionários comprometidos com o Reino de Deus.',
  true,
  NOW(),
  NOW()
);

-- 12. Intenções de Missa de Exemplo
INSERT INTO mass_intentions (id, intention_type, notes, is_recurring, created_at, updated_at)
VALUES 
(
  gen_random_uuid(),
  'thanksgiving',
  'Ação de graças pela saúde da família Silva',
  false,
  NOW(),
  NOW()
),
(
  gen_random_uuid(),
  'deceased',
  'Em memória de João Santos, falecido em 15/01/2024',
  true,
  NOW(),
  NOW()
),
(
  gen_random_uuid(),
  'thanksgiving',
  'Ação de graças pela cura de Maria Oliveira',
  false,
  NOW(),
  NOW()
);

-- Mensagem de confirmação
SELECT 'Script executado com sucesso! Dados de exemplo inseridos em todas as tabelas.' as resultado;