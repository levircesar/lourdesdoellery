import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useDashboardNews } from '../hooks/useDashboardNews';
import { useDashboardAnnouncements } from '../hooks/useDashboardAnnouncements';
import { useDashboardMassSchedule } from '../hooks/useDashboardMassSchedule';
import { useDashboardParishInfo } from '../hooks/useDashboardParishInfo';
import { useDashboardDizimistas } from '../hooks/useDashboardDizimistas';
import { useDashboardBirthdays } from '../hooks/useDashboardBirthdays';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import { News, Announcement, MassSchedule, ParishInfo, Dizimista, Birthday } from '../types';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [modalType, setModalType] = useState<'news' | 'announcement' | 'mass-schedule' | 'parish-info' | 'dizimista' | 'birthday' | null>(null);
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Hooks para dados
  const { 
    news, 
    loading: newsLoading, 
    createNews, 
    updateNews, 
    deleteNews 
  } = useDashboardNews();
  
  const { 
    announcements, 
    loading: announcementsLoading, 
    createAnnouncement, 
    updateAnnouncement, 
    deleteAnnouncement 
  } = useDashboardAnnouncements();

  const {
    massSchedules,
    loading: massSchedulesLoading,
    createMassSchedule,
    updateMassSchedule,
    deleteMassSchedule
  } = useDashboardMassSchedule();

  const {
    parishInfo,
    loading: parishInfoLoading,
    createParishInfo,
    updateParishInfo,
    deleteParishInfo
  } = useDashboardParishInfo();

  const {
    dizimistas,
    loading: dizimistasLoading,
    createDizimista,
    updateDizimista,
    deleteDizimista
  } = useDashboardDizimistas();

  const {
    birthdays,
    loading: birthdaysLoading,
    createBirthday,
    updateBirthday,
    deleteBirthday
  } = useDashboardBirthdays();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tabs = [
    { id: 'overview', name: 'Visão Geral', icon: '📊' },
    { id: 'news', name: 'Notícias', icon: '📰' },
    { id: 'announcements', name: 'Avisos', icon: '📢' },
    { id: 'mass-schedule', name: 'Horários de Missa', icon: '⏰' },
    { id: 'birthdays', name: 'Aniversariantes', icon: '🎂' },
    { id: 'parish-info', name: 'Info da Paróquia', icon: '🏛️' },
    { id: 'dizimistas', name: 'Dizimistas', icon: '💰' },
  ];

  const stats = [
    { name: 'Notícias', value: news.length.toString(), change: '+0', changeType: 'neutral' },
    { name: 'Avisos Ativos', value: announcements.length.toString(), change: '+0', changeType: 'neutral' },
    { name: 'Horários de Missa', value: massSchedules.length.toString(), change: '0', changeType: 'neutral' },
    { name: 'Aniversariantes', value: birthdays.length.toString(), change: '0', changeType: 'neutral' },
    { name: 'Dizimistas', value: dizimistas.length.toString(), change: '0', changeType: 'neutral' },
  ];

  // Handlers para modais
  const openCreateModal = (type: 'news' | 'announcement' | 'mass-schedule' | 'parish-info' | 'dizimista' | 'birthday') => {
    setModalType(type);
    setEditingItem(null);
    setModalOpen(true);
  };

  const openEditModal = (type: 'news' | 'announcement' | 'mass-schedule' | 'parish-info' | 'dizimista' | 'birthday', item: any) => {
    setModalType(type);
    setEditingItem(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingItem(null);
    setModalType(null);
  };

  // Handlers para CRUD
  const handleCreate = async (formData: any) => {
    if (modalType === 'news') {
      const result = await createNews(formData);
      if (result.success) {
        closeModal();
      } else {
        alert(result.error);
      }
    } else if (modalType === 'announcement') {
      const result = await createAnnouncement(formData);
      if (result.success) {
        closeModal();
      } else {
        alert(result.error);
      }
    } else if (modalType === 'mass-schedule') {
      const result = await createMassSchedule(formData);
      if (result.success) {
        closeModal();
      } else {
        alert(result.error);
      }
    } else if (modalType === 'parish-info') {
      const result = await createParishInfo(formData);
      if (result.success) {
        closeModal();
      } else {
        alert(result.error);
      }
    } else if (modalType === 'dizimista') {
      const result = await createDizimista(formData);
      if (result.success) {
        closeModal();
      } else {
        alert(result.error);
      }
    } else if (modalType === 'birthday') {
      const result = await createBirthday(formData);
      if (result.success) {
        closeModal();
      } else {
        alert(result.error);
      }
    }
  };

  const handleUpdate = async (formData: any) => {
    if (modalType === 'news' && editingItem) {
      const result = await updateNews(editingItem.id, formData);
      if (result.success) {
        closeModal();
      } else {
        alert(result.error);
      }
    } else if (modalType === 'announcement' && editingItem) {
      const result = await updateAnnouncement(editingItem.id, formData);
      if (result.success) {
        closeModal();
      } else {
        alert(result.error);
      }
    } else if (modalType === 'mass-schedule' && editingItem) {
      const result = await updateMassSchedule(editingItem.id, formData);
      if (result.success) {
        closeModal();
      } else {
        alert(result.error);
      }
    } else if (modalType === 'parish-info' && editingItem) {
      const result = await updateParishInfo(editingItem.id, formData);
      if (result.success) {
        closeModal();
      } else {
        alert(result.error);
      }
    } else if (modalType === 'dizimista' && editingItem) {
      const result = await updateDizimista(editingItem.id, formData);
      if (result.success) {
        closeModal();
      } else {
        alert(result.error);
      }
    } else if (modalType === 'birthday' && editingItem) {
      const result = await updateBirthday(editingItem.id, formData);
      if (result.success) {
        closeModal();
      } else {
        alert(result.error);
      }
    }
  };

  // Handlers específicos para cada tipo de item
  const handleDeleteNews = async (item: any) => {
    if (confirm('Tem certeza que deseja excluir esta notícia?')) {
      const result = await deleteNews(item.id);
      if (!result.success) {
        alert(result.error);
      }
    }
  };

  const handleDeleteAnnouncement = async (item: any) => {
    if (confirm('Tem certeza que deseja excluir este aviso?')) {
      const result = await deleteAnnouncement(item.id);
      if (!result.success) {
        alert(result.error);
      }
    }
  };

  const handleDeleteMassSchedule = async (item: any) => {
    if (confirm('Tem certeza que deseja excluir este horário de missa?')) {
      const result = await deleteMassSchedule(item.id);
      if (!result.success) {
        alert(result.error);
      }
    }
  };

  const handleDeleteParishInfo = async (item: any) => {
    if (confirm('Tem certeza que deseja excluir esta informação da paróquia?')) {
      const result = await deleteParishInfo(item.id);
      if (!result.success) {
        alert(result.error);
      }
    }
  };

  const handleDeleteDizimista = async (item: any) => {
    if (confirm('Tem certeza que deseja excluir este dizimista?')) {
      const result = await deleteDizimista(item.id);
      if (!result.success) {
        alert(result.error);
      }
    }
  };

  const handleDeleteBirthday = async (item: any) => {
    if (confirm('Tem certeza que deseja excluir este aniversariante?')) {
      const result = await deleteBirthday(item.id);
      if (!result.success) {
        alert(result.error);
      }
    }
  };

  // Funções auxiliares para horários de missa
  const getDayName = (dayOfWeek: number) => {
    switch (dayOfWeek) {
      case 0: return 'Domingo';
      case 1: return 'Segunda-feira';
      case 2: return 'Terça-feira';
      case 3: return 'Quarta-feira';
      case 4: return 'Quinta-feira';
      case 5: return 'Sexta-feira';
      case 6: return 'Sábado';
      default: return 'Dia inválido';
    }
  };

  // Colunas para tabelas
  const newsColumns = [
    { key: 'title', label: 'Título' },
    { key: 'is_published', label: 'Status', render: (value: boolean) => (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
        value ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
      }`}>
        {value ? 'Publicada' : 'Rascunho'}
      </span>
    )},
    { key: 'createdAt', label: 'Criada em', render: (value: string) => 
      new Date(value).toLocaleDateString('pt-BR')
    }
  ];

  const announcementColumns = [
    { key: 'title', label: 'Título' },
    { key: 'week_start', label: 'Início da Semana', render: (value: string) => 
      new Date(value).toLocaleDateString('pt-BR')
    },
    { key: 'week_end', label: 'Fim da Semana', render: (value: string) => 
      new Date(value).toLocaleDateString('pt-BR')
    },
    { key: 'is_active', label: 'Status', render: (value: boolean) => (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
        value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {value ? 'Ativo' : 'Inativo'}
      </span>
    )}
  ];

  const massScheduleColumns = [
    { key: 'day_of_week', label: 'Dia da Semana', render: (value: number) => 
      getDayName(value)
    },
    { key: 'time', label: 'Horário' },
    { key: 'description', label: 'Descrição' },
    { key: 'is_active', label: 'Status', render: (value: boolean) => (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
        value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {value ? 'Ativo' : 'Inativo'}
      </span>
    )}
  ];

  const parishInfoColumns = [
    { key: 'title', label: 'Título' },
    { key: 'section', label: 'Seção' },
    { key: 'content', label: 'Conteúdo', render: (value: string) => 
      value.length > 50 ? `${value.substring(0, 50)}...` : value
    },
    { key: 'is_active', label: 'Status', render: (value: boolean) => (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
        value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {value ? 'Ativo' : 'Inativo'}
      </span>
    )}
  ];

  const dizimistaColumns = [
    { key: 'name', label: 'Nome' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Telefone' },
    { key: 'address', label: 'Endereço', render: (value: string) => 
      value && value.length > 30 ? `${value.substring(0, 30)}...` : value || '-'
    },
    { key: 'is_active', label: 'Status', render: (value: boolean) => (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
        value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {value ? 'Ativo' : 'Inativo'}
      </span>
    )}
  ];

  const birthdayColumns = [
    { key: 'name', label: 'Nome' },
    { key: 'birth_date', label: 'Data de Nascimento', render: (value: string) => 
      new Date(value).toLocaleDateString('pt-BR')
    },
    { key: 'month', label: 'Mês', render: (value: number) => {
      const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ];
      return months[value - 1] || 'Mês inválido';
    }},
    { key: 'day', label: 'Dia' },
    { key: 'is_active', label: 'Status', render: (value: boolean) => (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
        value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {value ? 'Ativo' : 'Inativo'}
      </span>
    )}
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-church-gold rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">✝</span>
              </div>
              <h1 className="text-xl font-bold text-church-blue">Dashboard Paroquial</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Olá, <span className="font-semibold">{user?.name}</span>
              </span>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'bg-church-blue text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Visão Geral</h2>
              
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => (
                  <div key={stat.name} className="card p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                      <div className={`text-sm font-medium ${
                        stat.changeType === 'increase' ? 'text-green-600' :
                        stat.changeType === 'decrease' ? 'text-red-600' :
                        'text-gray-600'
                      }`}>
                        {stat.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <button
                    onClick={() => setActiveTab('news')}
                    className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-2xl">📝</span>
                    <span className="font-medium">Nova Notícia</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('announcements')}
                    className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-2xl">📢</span>
                    <span className="font-medium">Novo Aviso</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('mass-schedule')}
                    className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-2xl">⏰</span>
                    <span className="font-medium">Novo Horário</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('birthdays')}
                    className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-2xl">🎂</span>
                    <span className="font-medium">Aniversariantes</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('parish-info')}
                    className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-2xl">🏛️</span>
                    <span className="font-medium">Info da Paróquia</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('dizimistas')}
                    className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-2xl">💰</span>
                    <span className="font-medium">Dizimistas</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'news' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Gerenciar Notícias</h2>
                <button 
                  className="btn-primary"
                  onClick={() => openCreateModal('news')}
                >
                  Nova Notícia
                </button>
              </div>
              <DataTable
                data={news}
                columns={newsColumns}
                loading={newsLoading}
                onEdit={(item) => openEditModal('news', item)}
                onDelete={handleDeleteNews}
                emptyMessage="Nenhuma notícia encontrada"
              />
            </div>
          )}

          {activeTab === 'announcements' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Gerenciar Avisos</h2>
                <button 
                  className="btn-primary"
                  onClick={() => openCreateModal('announcement')}
                >
                  Novo Aviso
                </button>
              </div>
              <DataTable
                data={announcements}
                columns={announcementColumns}
                loading={announcementsLoading}
                onEdit={(item) => openEditModal('announcement', item)}
                onDelete={handleDeleteAnnouncement}
                emptyMessage="Nenhum aviso encontrado"
              />
            </div>
          )}

          {activeTab === 'mass-schedule' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Gerenciar Horários de Missa</h2>
                <button 
                  className="btn-primary"
                  onClick={() => openCreateModal('mass-schedule')}
                >
                  Novo Horário
                </button>
              </div>
              <DataTable
                data={massSchedules}
                columns={massScheduleColumns}
                loading={massSchedulesLoading}
                onEdit={(item) => openEditModal('mass-schedule', item)}
                onDelete={handleDeleteMassSchedule}
                emptyMessage="Nenhum horário de missa encontrado"
              />
            </div>
          )}

          {activeTab === 'birthdays' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Gerenciar Aniversariantes</h2>
                <button className="btn-primary" onClick={() => openCreateModal('birthday')}>Novo Aniversariante</button>
              </div>
              <DataTable
                data={birthdays}
                columns={birthdayColumns}
                loading={birthdaysLoading}
                onEdit={(item) => openEditModal('birthday', item)}
                onDelete={handleDeleteBirthday}
                emptyMessage="Nenhum aniversariante encontrado"
              />
            </div>
          )}

          {activeTab === 'parish-info' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Gerenciar Informações da Paróquia</h2>
                <button className="btn-primary" onClick={() => openCreateModal('parish-info')}>Nova Informação</button>
              </div>
              <DataTable
                data={parishInfo}
                columns={parishInfoColumns}
                loading={parishInfoLoading}
                onEdit={(item) => openEditModal('parish-info', item)}
                onDelete={handleDeleteParishInfo}
                emptyMessage="Nenhuma informação da paróquia encontrada"
              />
            </div>
          )}

          {activeTab === 'dizimistas' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Gerenciar Dizimistas</h2>
                <button className="btn-primary" onClick={() => openCreateModal('dizimista')}>Novo Dizimista</button>
              </div>
              <DataTable
                data={dizimistas}
                columns={dizimistaColumns}
                loading={dizimistasLoading}
                onEdit={(item) => openEditModal('dizimista', item)}
                onDelete={handleDeleteDizimista}
                emptyMessage="Nenhum dizimista encontrado"
              />
            </div>
          )}
        </div>
      </div>

      {/* Modal para formulários */}
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={editingItem ? `Editar ${modalType === 'news' ? 'Notícia' : modalType === 'announcement' ? 'Aviso' : modalType === 'mass-schedule' ? 'Horário de Missa' : modalType === 'parish-info' ? 'Informação da Paróquia' : modalType === 'dizimista' ? 'Dizimista' : 'Aniversariante'}` : `Novo ${modalType === 'news' ? 'Notícia' : modalType === 'announcement' ? 'Aviso' : modalType === 'mass-schedule' ? 'Horário de Missa' : modalType === 'parish-info' ? 'Informação da Paróquia' : modalType === 'dizimista' ? 'Dizimista' : 'Aniversariante'}`}
        size="lg"
      >
        {modalType === 'news' && (
          <NewsForm
            news={editingItem}
            onSubmit={editingItem ? handleUpdate : handleCreate}
            onCancel={closeModal}
          />
        )}
        {modalType === 'announcement' && (
          <AnnouncementForm
            announcement={editingItem}
            onSubmit={editingItem ? handleUpdate : handleCreate}
            onCancel={closeModal}
          />
        )}
        {modalType === 'mass-schedule' && (
          <MassScheduleForm
            massSchedule={editingItem}
            onSubmit={editingItem ? handleUpdate : handleCreate}
            onCancel={closeModal}
          />
        )}
        {modalType === 'parish-info' && (
          <ParishInfoForm
            parishInfo={editingItem}
            onSubmit={editingItem ? handleUpdate : handleCreate}
            onCancel={closeModal}
          />
        )}
        {modalType === 'dizimista' && (
          <DizimistaForm
            dizimista={editingItem}
            onSubmit={editingItem ? handleUpdate : handleCreate}
            onCancel={closeModal}
          />
        )}
        {modalType === 'birthday' && (
          <BirthdayForm
            birthday={editingItem}
            onSubmit={editingItem ? handleUpdate : handleCreate}
            onCancel={closeModal}
          />
        )}
      </Modal>
    </div>
  );
};

// Componente de formulário para notícias
const NewsForm: React.FC<{
  news?: News;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}> = ({ news, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: news?.title || '',
    content: news?.content || '',
    excerpt: news?.excerpt || '',
    is_published: news?.is_published || false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Título *
        </label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-church-blue"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Resumo
        </label>
        <textarea
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-church-blue"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Conteúdo *
        </label>
        <textarea
          required
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          rows={6}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-church-blue"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="is_published"
          checked={formData.is_published}
          onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
          className="h-4 w-4 text-church-blue focus:ring-church-blue border-gray-300 rounded"
        />
        <label htmlFor="is_published" className="ml-2 block text-sm text-gray-900">
          Publicar imediatamente
        </label>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="btn-primary"
        >
          {news ? 'Atualizar' : 'Criar'}
        </button>
      </div>
    </form>
  );
};

// Componente de formulário para avisos
const AnnouncementForm: React.FC<{
  announcement?: Announcement;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}> = ({ announcement, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: announcement?.title || '',
    content: announcement?.content || '',
    week_start: announcement?.week_start || '',
    week_end: announcement?.week_end || '',
    is_active: announcement?.is_active ?? true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Título *
        </label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-church-blue"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Início da Semana *
          </label>
          <input
            type="date"
            required
            value={formData.week_start}
            onChange={(e) => setFormData({ ...formData, week_start: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-church-blue"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fim da Semana *
          </label>
          <input
            type="date"
            required
            value={formData.week_end}
            onChange={(e) => setFormData({ ...formData, week_end: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-church-blue"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Conteúdo *
        </label>
        <textarea
          required
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-church-blue"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="is_active"
          checked={formData.is_active}
          onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
          className="h-4 w-4 text-church-blue focus:ring-church-blue border-gray-300 rounded"
        />
        <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
          Ativo
        </label>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="btn-primary"
        >
          {announcement ? 'Atualizar' : 'Criar'}
        </button>
      </div>
    </form>
  );
};

// Componente de formulário para horários de missa
const MassScheduleForm: React.FC<{
  massSchedule?: MassSchedule;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}> = ({ massSchedule, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    day_of_week: massSchedule?.day_of_week || 0,
    time: massSchedule?.time || '',
    description: massSchedule?.description || '',
    is_active: massSchedule?.is_active ?? true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Dia da Semana *
        </label>
        <select
          required
          value={formData.day_of_week}
          onChange={(e) => setFormData({ ...formData, day_of_week: parseInt(e.target.value) })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-church-blue"
        >
          <option value={0}>Domingo</option>
          <option value={1}>Segunda-feira</option>
          <option value={2}>Terça-feira</option>
          <option value={3}>Quarta-feira</option>
          <option value={4}>Quinta-feira</option>
          <option value={5}>Sexta-feira</option>
          <option value={6}>Sábado</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Horário *
        </label>
        <input
          type="time"
          required
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-church-blue"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descrição
        </label>
        <input
          type="text"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Ex: Missa da manhã, Missa dominical, etc."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-church-blue"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="is_active"
          checked={formData.is_active}
          onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
          className="h-4 w-4 text-church-blue focus:ring-church-blue border-gray-300 rounded"
        />
        <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
          Ativo
        </label>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="btn-primary"
        >
          {massSchedule ? 'Atualizar' : 'Criar'}
        </button>
      </div>
    </form>
  );
};

// Componente de formulário para informações da paróquia
const ParishInfoForm: React.FC<{
  parishInfo?: ParishInfo;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}> = ({ parishInfo, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: parishInfo?.title || '',
    content: parishInfo?.content || '',
    section: parishInfo?.section || 'geral',
    is_active: parishInfo?.is_active ?? true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Título *
        </label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-church-blue"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Seção *
        </label>
        <select
          required
          value={formData.section}
          onChange={(e) => setFormData({ ...formData, section: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-church-blue"
        >
          <option value="geral">Geral</option>
          <option value="missas">Missas</option>
          <option value="eventos">Eventos</option>
          <option value="contatos">Contatos</option>
          <option value="horarios">Horários</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Conteúdo *
        </label>
        <textarea
          required
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          rows={6}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-church-blue"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="is_active"
          checked={formData.is_active}
          onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
          className="h-4 w-4 text-church-blue focus:ring-church-blue border-gray-300 rounded"
        />
        <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
          Ativo
        </label>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="btn-primary"
        >
          {parishInfo ? 'Atualizar' : 'Criar'}
        </button>
      </div>
    </form>
  );
};

// Componente de formulário para dizimistas
const DizimistaForm: React.FC<{
  dizimista?: Dizimista;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}> = ({ dizimista, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: dizimista?.name || '',
    email: dizimista?.email || '',
    phone: dizimista?.phone || '',
    address: dizimista?.address || '',
    is_active: dizimista?.is_active ?? true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nome *
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-church-blue"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-church-blue"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Telefone
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-church-blue"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Endereço
        </label>
        <textarea
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-church-blue"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="is_active"
          checked={formData.is_active}
          onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
          className="h-4 w-4 text-church-blue focus:ring-church-blue border-gray-300 rounded"
        />
        <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
          Ativo
        </label>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="btn-primary"
        >
          {dizimista ? 'Atualizar' : 'Criar'}
        </button>
      </div>
    </form>
  );
};

// Componente de formulário para aniversariantes
const BirthdayForm: React.FC<{
  birthday?: Birthday;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}> = ({ birthday, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: birthday?.name || '',
    birth_date: birthday?.birth_date || '',
    is_active: birthday?.is_active ?? true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nome *
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-church-blue"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Data de Nascimento *
        </label>
        <input
          type="date"
          required
          value={formData.birth_date}
          onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-church-blue"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="is_active"
          checked={formData.is_active}
          onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
          className="h-4 w-4 text-church-blue focus:ring-church-blue border-gray-300 rounded"
        />
        <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
          Ativo
        </label>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="btn-primary"
        >
          {birthday ? 'Atualizar' : 'Criar'}
        </button>
      </div>
    </form>
  );
};

export default DashboardPage; 