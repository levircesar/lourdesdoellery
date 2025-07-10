import { News, Announcement, MassSchedule, Birthday, ParishInfo, Dizimista } from '../types';

export const mockNews: News[] = [
  {
    id: "1",
    title: "Nova Missão Paroquial Iniciada",
    content: "A paróquia iniciou uma nova missão evangelizadora focada na juventude. O projeto visa aproximar os jovens da igreja através de atividades dinâmicas e relevantes para sua realidade.",
    excerpt: "Nova missão evangelizadora focada na juventude é iniciada na paróquia.",
    slug: "nova-missao-paroquial-iniciada",
    is_published: true,
    order: 1,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    author: {
      id: "1",
      name: "Padre João Silva",
      email: "padre.joao@paroquia.com"
    }
  },
  {
    id: "2",
    title: "Encontro de Jovens: Juventude em Ação",
    content: "O grupo de jovens da paróquia realizou um encontro especial no último fim de semana. O evento contou com palestras, dinâmicas e momentos de oração, fortalecendo a fé dos participantes.",
    excerpt: "Grupo de jovens realiza encontro especial com palestras e dinâmicas.",
    slug: "encontro-de-jovens-juventude-em-acao",
    is_published: true,
    order: 2,
    createdAt: "2024-01-12T14:30:00Z",
    updatedAt: "2024-01-12T14:30:00Z",
    author: {
      id: "2",
      name: "Maria Santos",
      email: "maria.santos@paroquia.com"
    }
  },
  {
    id: "3",
    title: "Retiro Espiritual: Renovação da Fé",
    content: "A paróquia organizou um retiro espiritual de três dias para os fiéis. O evento foi um momento de renovação e fortalecimento da fé, com momentos de oração, reflexão e confraternização.",
    excerpt: "Retiro espiritual de três dias promove renovação e fortalecimento da fé.",
    slug: "retiro-espiritual-renovacao-da-fe",
    is_published: true,
    order: 3,
    createdAt: "2024-01-10T09:00:00Z",
    updatedAt: "2024-01-10T09:00:00Z",
    author: {
      id: "3",
      name: "Carlos Oliveira",
      email: "carlos.oliveira@paroquia.com"
    }
  },
  {
    id: "4",
    title: "Feira de Artesanato Beneficente",
    content: "A paróquia realizou uma feira de artesanato beneficente para arrecadar fundos para obras sociais. O evento foi um sucesso, com a participação de toda a comunidade paroquial.",
    excerpt: "Feira de artesanato beneficente arrecada fundos para obras sociais.",
    slug: "feira-de-artesanato-beneficente",
    is_published: true,
    order: 4,
    createdAt: "2024-01-08T16:00:00Z",
    updatedAt: "2024-01-08T16:00:00Z",
    author: {
      id: "4",
      name: "Ana Costa",
      email: "ana.costa@paroquia.com"
    }
  }
];

export const mockAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "Reunião do Conselho Paroquial",
    content: "Reunião do Conselho Paroquial neste domingo após a missa das 10h. Todos os membros estão convidados.",
    week_start: "2024-07-08T00:00:00Z",
    week_end: "2024-07-10T23:59:59Z", // Termina hoje
    is_published: true,
    is_active: true,
    order: 1,
    expires_at: "2024-07-10T23:59:59Z",
    createdAt: "2024-07-08T08:00:00Z",
    updatedAt: "2024-07-08T08:00:00Z",
    author: {
      id: "1",
      name: "Padre João Silva",
      email: "padre.joao@paroquia.com"
    }
  },
  {
    id: "2",
    title: "Inscrições para Catequese",
    content: "Inscrições abertas para catequese 2024. Crianças a partir de 7 anos. Informações na secretaria paroquial.",
    week_start: "2024-07-10T00:00:00Z", // Começa hoje
    week_end: "2024-07-16T23:59:59Z",
    is_published: true,
    is_active: true,
    order: 2,
    expires_at: "2024-07-16T23:59:59Z",
    createdAt: "2024-07-08T10:00:00Z",
    updatedAt: "2024-07-08T10:00:00Z",
    author: {
      id: "2",
      name: "Maria Santos",
      email: "maria.santos@paroquia.com"
    }
  },
  {
    id: "3",
    title: "Manutenção do Sistema de Som",
    content: "O sistema de som da igreja passará por manutenção na próxima semana. Pedimos compreensão durante os trabalhos.",
    week_start: "2024-07-15T00:00:00Z",
    week_end: "2024-07-21T23:59:59Z",
    is_published: true,
    is_active: true,
    order: 3,
    expires_at: "2024-07-21T23:59:59Z",
    createdAt: "2024-07-08T14:00:00Z",
    updatedAt: "2024-07-08T14:00:00Z",
    author: {
      id: "3",
      name: "Carlos Oliveira",
      email: "carlos.oliveira@paroquia.com"
    }
  },
  {
    id: "4",
    title: "Doação de Alimentos",
    content: "Campanha de doação de alimentos não perecíveis para famílias carentes. Caixas disponíveis na entrada da igreja.",
    week_start: "2024-07-22T00:00:00Z",
    week_end: "2024-07-28T23:59:59Z",
    is_published: true,
    is_active: true,
    order: 4,
    expires_at: "2024-07-28T23:59:59Z",
    createdAt: "2024-07-08T09:00:00Z",
    updatedAt: "2024-07-08T09:00:00Z",
    author: {
      id: "4",
      name: "Ana Costa",
      email: "ana.costa@paroquia.com"
    }
  },
  {
    id: "5",
    title: "Aviso de Teste - Período Atual",
    content: "Este aviso deve aparecer pois está dentro do período atual (começa e termina hoje).",
    week_start: "2024-07-10T00:00:00Z", // Começa hoje
    week_end: "2024-07-10T23:59:59Z", // Termina hoje
    is_published: true,
    is_active: true,
    order: 5,
    expires_at: "2024-07-10T23:59:59Z",
    createdAt: "2024-07-10T08:00:00Z",
    updatedAt: "2024-07-10T08:00:00Z",
    author: {
      id: "1",
      name: "Padre João Silva",
      email: "padre.joao@paroquia.com"
    }
  }
];

export const mockMassSchedule: MassSchedule[] = [
  {
    id: "1",
    day_of_week: 1,
    time: "07:00",
    description: "Missa da manhã",
    is_active: true,
    order: 1,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "2",
    day_of_week: 2,
    time: "07:00",
    description: "Missa da manhã",
    is_active: true,
    order: 2,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "3",
    day_of_week: 3,
    time: "07:00",
    description: "Missa da manhã",
    is_active: true,
    order: 3,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "4",
    day_of_week: 4,
    time: "07:00",
    description: "Missa da manhã",
    is_active: true,
    order: 4,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "5",
    day_of_week: 5,
    time: "07:00",
    description: "Missa da manhã",
    is_active: true,
    order: 5,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "6",
    day_of_week: 6,
    time: "18:00",
    description: "Missa de sábado (vigília)",
    is_active: true,
    order: 6,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "7",
    day_of_week: 0,
    time: "08:00",
    description: "Missa dominical",
    is_active: true,
    order: 7,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "8",
    day_of_week: 0,
    time: "10:00",
    description: "Missa dominical",
    is_active: true,
    order: 8,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "9",
    day_of_week: 0,
    time: "18:00",
    description: "Missa dominical",
    is_active: true,
    order: 9,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  }
];

export const mockBirthdays: Birthday[] = [
  {
    id: "1",
    name: "Maria Silva",
    birth_date: "1985-07-15T00:00:00Z", // Julho - mês atual
    is_active: true,
    order: 1,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  },
  {
    id: "2",
    name: "João Santos",
    birth_date: "1990-07-22T00:00:00Z", // Julho - mês atual
    is_active: true,
    order: 2,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  },
  {
    id: "3",
    name: "Ana Costa",
    birth_date: "1978-07-08T00:00:00Z", // Julho - mês atual
    is_active: true,
    order: 3,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  },
  {
    id: "4",
    name: "Pedro Oliveira",
    birth_date: "1995-07-30T00:00:00Z", // Julho - mês atual
    is_active: true,
    order: 4,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  },
  {
    id: "5",
    name: "Lucia Ferreira",
    birth_date: "1982-08-15T00:00:00Z", // Agosto - não deve aparecer
    is_active: true,
    order: 5,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  },
  {
    id: "6",
    name: "Carlos Lima",
    birth_date: "1992-06-20T00:00:00Z", // Junho - não deve aparecer
    is_active: true,
    order: 6,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  }
];

export const mockParishInfo: ParishInfo[] = [
  {
    id: "1",
    section: "historia",
    title: "História da Paróquia",
    content: "Nossa paróquia foi fundada em 1950 e desde então tem servido à comunidade com dedicação e amor. Ao longo dos anos, temos crescido e nos desenvolvido, sempre mantendo nossos valores e missão de evangelização.",
    is_active: true,
    order: 1,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "2",
    section: "missao",
    title: "Nossa Missão",
    content: "Nossa missão é evangelizar, formar cristãos comprometidos e servir à comunidade com amor e dedicação, seguindo os ensinamentos de Jesus Cristo.",
    is_active: true,
    order: 2,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "3",
    section: "contato",
    title: "Contato",
    content: "Telefone: (11) 1234-5678\nEmail: secretaria@paroquia.com\nEndereço: Rua das Flores, 123 - Centro",
    is_active: true,
    order: 3,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "4",
    section: "horarios",
    title: "Horário de Atendimento",
    content: "Segunda a Sexta: 8h às 18h\nSábado: 8h às 12h\nDomingo: 7h às 12h",
    is_active: true,
    order: 4,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  }
];

export const mockDizimistas: Dizimista[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao.silva@email.com",
    phone: "(11) 99999-1111",
    address: "Rua das Flores, 123",
    is_active: true,
    order: 1,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria.santos@email.com",
    phone: "(11) 99999-2222",
    address: "Rua das Palmeiras, 456",
    is_active: true,
    order: 2,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "3",
    name: "Carlos Oliveira",
    email: "carlos.oliveira@email.com",
    phone: "(11) 99999-3333",
    address: "Rua das Margaridas, 789",
    is_active: true,
    order: 3,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "4",
    name: "Ana Costa",
    email: "ana.costa@email.com",
    phone: "(11) 99999-4444",
    address: "Rua das Rosas, 321",
    is_active: true,
    order: 4,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "5",
    name: "Roberto Ferreira",
    email: "roberto.ferreira@email.com",
    phone: "(11) 99999-5555",
    address: "Rua das Tulipas, 654",
    is_active: true,
    order: 5,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "6",
    name: "Lucia Almeida",
    email: "lucia.almeida@email.com",
    phone: "(11) 99999-6666",
    address: "Rua das Orquídeas, 987",
    is_active: true,
    order: 6,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "7",
    name: "Fernanda Lima",
    email: "fernanda.lima@email.com",
    phone: "(11) 99999-7777",
    address: "Rua das Violetas, 147",
    is_active: true,
    order: 7,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "8",
    name: "Antonio Pereira",
    email: "antonio.pereira@email.com",
    phone: "(11) 99999-8888",
    address: "Rua das Begônias, 258",
    is_active: false,
    order: 8,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  }
]; 