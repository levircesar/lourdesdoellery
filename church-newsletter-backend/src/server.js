const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();

const { sequelize, testConnection } = require('./config/database');
const { User, News, Announcement, MassSchedule, Birthday, Dizimista, ParishInfo, MassIntention } = require('./models');

// Importar rotas
const authRoutes = require('./routes/auth');
const newsRoutes = require('./routes/news');
const announcementRoutes = require('./routes/announcements');
const massScheduleRoutes = require('./routes/mass-schedules');
const birthdayRoutes = require('./routes/birthdays');
const dizimistaRoutes = require('./routes/dizimistas');
const parishInfoRoutes = require('./routes/parish-info');
const massIntentionRoutes = require('./routes/mass-intentions');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares de segurança
app.use(helmet());

// Configuração CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));

// Middlewares de parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Servir arquivos estáticos (uploads)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/mass-schedule', massScheduleRoutes);
app.use('/api/birthdays', birthdayRoutes);
app.use('/api/dizimistas', dizimistaRoutes);
app.use('/api/parish-info', parishInfoRoutes);
app.use('/api/mass-intentions', massIntentionRoutes);

// Rota de health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'API funcionando corretamente',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error('Erro não tratado:', err);
  
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Dados inválidos',
      errors: err.errors.map(error => ({
        field: error.path,
        message: error.message
      }))
    });
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({
      success: false,
      message: 'Dados duplicados',
      errors: err.errors.map(error => ({
        field: error.path,
        message: error.message
      }))
    });
  }

  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor'
  });
});

// Rota 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada'
  });
});

// Inicializar servidor
const startServer = async () => {
  try {
    // Testar conexão com banco
    await testConnection();
    
    // Sincronizar modelos com banco (criar tabelas se não existirem)
    // await sequelize.sync({ force: false });
    console.log('✅ Sincronização do banco desabilitada temporariamente');

    // Criar usuário admin padrão se não existir
    const adminExists = await User.findOne({ where: { email: 'admin@lourdesdoellery.com' } });
    if (!adminExists) {
      await User.create({
        name: 'Administrador',
        email: 'admin@lourdesdoellery.com',
        password: 'admin123',
        role: 'admin'
      });
      console.log('✅ Usuário admin criado: admin@lourdesdoellery.com / admin123');
    } else {
      console.log('✅ Usuário admin já existe');
    }

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
      console.log(`📡 Ambiente: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 API disponível em: http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('❌ Erro ao inicializar servidor:', error);
    process.exit(1);
  }
};

// Tratamento de sinais para graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Recebido SIGINT, fechando servidor...');
  await sequelize.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Recebido SIGTERM, fechando servidor...');
  await sequelize.close();
  process.exit(0);
});

startServer(); 