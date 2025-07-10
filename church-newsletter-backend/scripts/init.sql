-- Script de inicialização do banco de dados
-- Este script será executado automaticamente quando o container PostgreSQL iniciar

-- Apagar tabelas existentes (se houver)
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
    role VARCHAR(20) DEFAULT 'editor' CHECK (role IN ('admin', 'editor')),
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP WITH TIME ZONE,
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
    day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
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
    section VARCHAR(20) NOT NULL CHECK (section IN ('history', 'mission', 'vision', 'contact', 'address')),
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    image_url VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(section)
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

-- Inserir usuário admin padrão (senha: admin123)
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

-- 2. Dados de exemplo para notícias
INSERT INTO news (id, title, slug, content, excerpt, is_published, published_at, "order", created_at, updated_at)
VALUES 
  (gen_random_uuid(), 'Bem-vindos ao nosso novo site paroquial', 'bem-vindos-ao-nosso-novo-site-paroquial', 'Estamos muito felizes em apresentar nosso novo site paroquial. Aqui você encontrará todas as informações sobre nossa comunidade, horários de missas, eventos e muito mais. Que este seja um espaço de comunhão e informação para todos os fiéis.', 'Apresentamos nosso novo site paroquial com todas as informações da comunidade.', true, NOW(), 1, NOW(), NOW()),
  
  (gen_random_uuid(), 'Retiro espiritual de fim de semana', 'retiro-espiritual-de-fim-de-semana', 'Nos dias 15 e 16 de dezembro, realizaremos nosso retiro espiritual anual. Será um momento especial de reflexão, oração e renovação espiritual. As inscrições estão abertas na secretaria paroquial. Venha participar desta experiência transformadora!', 'Retiro espiritual nos dias 15 e 16 de dezembro. Inscrições abertas.', true, NOW(), 2, NOW(), NOW()),
  
  (gen_random_uuid(), 'Nova missa dominical às 18h', 'nova-missa-dominical-as-18h', 'A partir do próximo domingo, teremos uma nova missa dominical às 18h. Esta missa será especialmente dedicada aos jovens e famílias. Contamos com a presença de todos para celebrar a Palavra de Deus em comunidade.', 'Nova missa dominical às 18h para jovens e famílias.', true, NOW(), 3, NOW(), NOW()),
  
  (gen_random_uuid(), 'Campanha de doação para reforma da igreja', 'campanha-de-doacao-para-reforma-da-igreja', 'Iniciamos uma campanha de doação para a reforma da igreja. Precisamos da colaboração de todos os fiéis para manter nosso templo em condições adequadas. Qualquer valor é bem-vindo e será muito importante para nossa comunidade.', 'Campanha de doação para reforma da igreja. Sua colaboração é importante.', false, NULL, 4, NOW(), NOW()),
  
  (gen_random_uuid(), 'Grupo de jovens: encontros semanais', 'grupo-de-jovens-encontros-semanais', 'O grupo de jovens da paróquia se reúne todas as quartas-feiras às 19h30. É um espaço de formação, amizade e crescimento espiritual. Se você tem entre 15 e 25 anos, venha participar! Não é necessário se inscrever, apenas aparecer.', 'Grupo de jovens se reúne às quartas-feiras às 19h30. Participe!', true, NOW(), 5, NOW(), NOW());

-- 3. Dados de exemplo para avisos
INSERT INTO announcements (id, title, content, week_start, week_end, is_published, is_active, "order", created_at, updated_at)
VALUES 
  (gen_random_uuid(), 'Aviso sobre horários de missa', 'Lembramos que os horários de missa durante a semana são: terça e quinta às 19h, quarta e sexta às 7h. Aos domingos: 8h, 10h, 18h e 20h. Confira sempre os horários especiais em feriados.', '2024-01-01', '2024-01-07', true, true, 1, NOW(), NOW()),
  
  (gen_random_uuid(), 'Reunião do conselho paroquial', 'Na próxima quinta-feira, às 20h, teremos reunião do conselho paroquial. Todos os membros estão convidados a participar. Pauta: planejamento das atividades do próximo trimestre.', '2024-01-08', '2024-01-14', true, true, 2, NOW(), NOW()),
  
  (gen_random_uuid(), 'Confissões durante a Quaresma', 'Durante a Quaresma, as confissões estarão disponíveis todos os sábados das 15h às 17h. Procurem o padre na sacristia. É um momento especial de reconciliação e renovação espiritual.', '2024-02-14', '2024-02-20', true, true, 3, NOW(), NOW()),
  
  (gen_random_uuid(), 'Manutenção do sistema de som', 'Nos dias 20 e 21 de março, o sistema de som da igreja passará por manutenção. Pedimos compreensão durante este período. As missas continuarão normalmente.', '2024-03-18', '2024-03-24', true, true, 4, NOW(), NOW()),
  
  (gen_random_uuid(), 'Campanha de doação de alimentos', 'Estamos arrecadando alimentos não perecíveis para famílias carentes da comunidade. As doações podem ser entregues na secretaria paroquial ou depositadas nas caixas na entrada da igreja.', '2024-04-01', '2024-04-07', true, true, 5, NOW(), NOW());

-- 4. Dados de exemplo para horários de missa
INSERT INTO mass_schedules (id, day_of_week, time, description, is_active, "order", created_at, updated_at)
VALUES 
  (gen_random_uuid(), 0, '08:00:00', 'Missa dominical da manhã', true, 1, NOW(), NOW()),
  (gen_random_uuid(), 0, '10:00:00', 'Missa dominical principal', true, 2, NOW(), NOW()),
  (gen_random_uuid(), 0, '18:00:00', 'Missa dominical da tarde', true, 3, NOW(), NOW()),
  (gen_random_uuid(), 0, '20:00:00', 'Missa dominical da noite', true, 4, NOW(), NOW()),
  (gen_random_uuid(), 1, '19:00:00', 'Missa de segunda-feira', true, 5, NOW(), NOW()),
  (gen_random_uuid(), 2, '19:00:00', 'Missa de terça-feira', true, 6, NOW(), NOW()),
  (gen_random_uuid(), 3, '07:00:00', 'Missa de quarta-feira', true, 7, NOW(), NOW()),
  (gen_random_uuid(), 4, '19:00:00', 'Missa de quinta-feira', true, 8, NOW(), NOW()),
  (gen_random_uuid(), 5, '07:00:00', 'Missa de sexta-feira', true, 9, NOW(), NOW()),
  (gen_random_uuid(), 6, '17:00:00', 'Missa de sábado (antecipação)', true, 10, NOW(), NOW());

-- 5. Dados de exemplo para aniversariantes
INSERT INTO birthdays (id, name, birth_date, age, is_active, "order", created_at, updated_at)
VALUES 
  (gen_random_uuid(), 'Maria Silva Santos', '1985-03-15', 39, true, 1, NOW(), NOW()),
  (gen_random_uuid(), 'João Pedro Oliveira', '1992-07-22', 32, true, 2, NOW(), NOW()),
  (gen_random_uuid(), 'Ana Clara Costa', '2000-11-08', 24, true, 3, NOW(), NOW()),
  (gen_random_uuid(), 'Carlos Eduardo Lima', '1978-04-30', 46, true, 4, NOW(), NOW()),
  (gen_random_uuid(), 'Fernanda Rodrigues', '1995-09-12', 29, true, 5, NOW(), NOW()),
  (gen_random_uuid(), 'Roberto Almeida', '1988-12-03', 36, true, 6, NOW(), NOW()),
  (gen_random_uuid(), 'Lucia Mendes', '1965-01-20', 59, true, 7, NOW(), NOW()),
  (gen_random_uuid(), 'Paulo Henrique Souza', '2003-06-18', 21, true, 8, NOW(), NOW()),
  (gen_random_uuid(), 'Isabela Ferreira', '1990-08-25', 34, true, 9, NOW(), NOW()),
  (gen_random_uuid(), 'Antonio Carlos Pereira', '1972-10-14', 52, true, 10, NOW(), NOW()),
  (gen_random_uuid(), 'Mariana Costa Silva', '1998-02-28', 26, true, 11, NOW(), NOW()),
  (gen_random_uuid(), 'Ricardo Santos Oliveira', '1983-05-07', 41, true, 12, NOW(), NOW());

-- 6. Dados de exemplo para dizimistas
INSERT INTO dizimistas (id, name, email, phone, address, is_active, "order", created_at, updated_at)
VALUES 
  (gen_random_uuid(), 'José da Silva', 'jose.silva@email.com', '(11) 99999-1111', 'Rua das Flores, 123 - Centro', true, 1, NOW(), NOW()),
  (gen_random_uuid(), 'Maria Oliveira', 'maria.oliveira@email.com', '(11) 99999-2222', 'Av. Principal, 456 - Jardim', true, 2, NOW(), NOW()),
  (gen_random_uuid(), 'Carlos Santos', 'carlos.santos@email.com', '(11) 99999-3333', 'Rua do Comércio, 789 - Vila', true, 3, NOW(), NOW()),
  (gen_random_uuid(), 'Ana Costa', 'ana.costa@email.com', '(11) 99999-4444', 'Travessa da Paz, 321 - Bairro', true, 4, NOW(), NOW()),
  (gen_random_uuid(), 'Roberto Lima', 'roberto.lima@email.com', '(11) 99999-5555', 'Rua das Palmeiras, 654 - Centro', true, 5, NOW(), NOW()),
  (gen_random_uuid(), 'Fernanda Rodrigues', 'fernanda.rodrigues@email.com', '(11) 99999-6666', 'Av. das Árvores, 987 - Jardim', true, 6, NOW(), NOW()),
  (gen_random_uuid(), 'Paulo Almeida', 'paulo.almeida@email.com', '(11) 99999-7777', 'Rua da Esperança, 147 - Vila', true, 7, NOW(), NOW()),
  (gen_random_uuid(), 'Lucia Mendes', 'lucia.mendes@email.com', '(11) 99999-8888', 'Travessa do Amor, 258 - Bairro', true, 8, NOW(), NOW()),
  (gen_random_uuid(), 'Antonio Pereira', 'antonio.pereira@email.com', '(11) 99999-9999', 'Rua da Fé, 369 - Centro', true, 9, NOW(), NOW()),
  (gen_random_uuid(), 'Isabela Ferreira', 'isabela.ferreira@email.com', '(11) 99999-0000', 'Av. da Esperança, 741 - Jardim', true, 10, NOW(), NOW());

-- 7. Dados de exemplo para informações da paróquia
INSERT INTO parish_info (id, section, title, content, is_active, "order", created_at, updated_at)
VALUES 
  (gen_random_uuid(), 'history', 'História da Nossa Paróquia', 'Nossa paróquia foi fundada em 1950, quando um grupo de fiéis se reuniu para construir um local de adoração. O primeiro padre foi Padre João Batista, que dedicou 30 anos de sua vida ao serviço desta comunidade. Ao longo dos anos, a paróquia cresceu e se tornou um centro espiritual importante na região, servindo milhares de famílias com amor e dedicação.', true, 1, NOW(), NOW()),
  
  (gen_random_uuid(), 'mission', 'Nossa Missão', 'Nossa missão é anunciar o Evangelho de Jesus Cristo, formar discípulos missionários e servir à comunidade com amor e caridade. Buscamos ser uma igreja acolhedora, que caminha junto com as pessoas em suas alegrias e dificuldades, sempre guiada pelos valores do Reino de Deus.', true, 2, NOW(), NOW()),
  
  (gen_random_uuid(), 'vision', 'Nossa Visão', 'Queremos ser uma paróquia referência em evangelização e formação cristã, conhecida por sua acolhida, sua liturgia celebrativa e seu compromisso com a justiça social. Almejamos ser uma comunidade que transforma vidas e constrói um mundo mais justo e fraterno.', true, 3, NOW(), NOW()),
  
  (gen_random_uuid(), 'contact', 'Informações de Contato', 'Telefone: (11) 3333-4444\nEmail: contato@paroquia.com\nSecretaria: Segunda a sexta, das 8h às 18h\nSábado: das 8h às 12h\n\nPara emergências pastorais, entre em contato com o padre responsável.', true, 4, NOW(), NOW()),
  
  (gen_random_uuid(), 'address', 'Endereço e Localização', 'Rua da Igreja, 1000\nBairro: Centro\nCidade: São Paulo - SP\nCEP: 01234-567\n\nComo chegar:\n- Metrô: Estação Central (linha azul)\n- Ônibus: Linhas 100, 200 e 300\n- Carro: Estacionamento gratuito disponível', true, 5, NOW(), NOW());