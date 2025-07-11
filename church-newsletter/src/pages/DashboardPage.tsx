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
import RichTextEditor from '../components/RichTextEditor';
import { News, Announcement, MassSchedule, ParishInfo, Dizimista, Birthday } from '../types';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
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

  const menuItems = [
    { id: 'overview', name: 'Visão Geral', icon: '📊' },
    { id: 'news', name: 'Notícias', icon: '📰' },
    { id: 'announcements', name: 'Avisos', icon: '📢' },
    { id: 'mass-schedule', name: 'Horários de Missa', icon: '⏰' },
    { id: 'birthdays', name: 'Aniversariantes', icon: '🎂' },
    { id: 'parish-info', name: 'Info da Paróquia', icon: '🏛️' },
    { id: 'dizimistas', name: 'Dizimistas', icon: '💰' },
  ];

  const stats = [
    { name: 'Notícias', value: news.length.toString(), icon: '📰', color: 'bg-blue-500' },
    { name: 'Avisos Ativos', value: announcements.length.toString(), icon: '📢', color: 'bg-green-500' },
    { name: 'Horários de Missa', value: massSchedules.length.toString(), icon: '⏰', color: 'bg-purple-500' },
    { name: 'Aniversariantes', value: birthdays.length.toString(), icon: '🎂', color: 'bg-pink-500' },
    { name: 'Dizimistas', value: dizimistas.length.toString(), icon: '💰', color: 'bg-yellow-500' },
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

  const handleDeleteNews = async (item: any) => {
    if (window.confirm('Tem certeza que deseja excluir esta notícia?')) {
      const result = await deleteNews(item.id);
      if (!result.success) {
        alert(result.error);
      }
    }
  };

  const handleDeleteAnnouncement = async (item: any) => {
    if (window.confirm('Tem certeza que deseja excluir este aviso?')) {
      const result = await deleteAnnouncement(item.id);
      if (!result.success) {
        alert(result.error);
      }
    }
  };

  const handleDeleteMassSchedule = async (item: any) => {
    if (window.confirm('Tem certeza que deseja excluir este horário de missa?')) {
      const result = await deleteMassSchedule(item.id);
      if (!result.success) {
        alert(result.error);
      }
    }
  };

  const handleDeleteParishInfo = async (item: any) => {
    if (window.confirm('Tem certeza que deseja excluir esta informação da paróquia?')) {
      const result = await deleteParishInfo(item.id);
      if (!result.success) {
        alert(result.error);
      }
    }
  };

  const handleDeleteDizimista = async (item: any) => {
    if (window.confirm('Tem certeza que deseja excluir este dizimista?')) {
      const result = await deleteDizimista(item.id);
      if (!result.success) {
        alert(result.error);
      }
    }
  };

  const handleDeleteBirthday = async (item: any) => {
    if (window.confirm('Tem certeza que deseja excluir este aniversariante?')) {
      const result = await deleteBirthday(item.id);
      if (!result.success) {
        alert(result.error);
      }
    }
  };

  const getDayName = (dayOfWeek: number) => {
    const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    return days[dayOfWeek] || 'Desconhecido';
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-center">
                    <div className={`${stat.color} p-3 rounded-lg text-white text-2xl`}>
                      {stat.icon}
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Últimas Notícias</h3>
                <div className="space-y-3">
                  {news.slice(0, 5).map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 truncate">{item.title}</p>
                        <p className="text-sm text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${item.is_published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {item.is_published ? 'Publicado' : 'Rascunho'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Próximos Aniversariantes</h3>
                <div className="space-y-3">
                  {birthdays.slice(0, 5).map((item, index) => {
                    const birthDate = new Date(item.birth_date);
                    const day = birthDate.getDate();
                    const month = birthDate.getMonth() + 1;
                    return (
                      <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                          {day}
                        </div>
                        <div className="ml-3 flex-1">
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-500">{month}/{day}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );

      case 'news':
        return (
          <div className="bg-white rounded-xl shadow-lg">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Gerenciar Notícias</h2>
                <button
                  onClick={() => openCreateModal('news')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  + Nova Notícia
                </button>
              </div>
            </div>
            <div className="p-6">
              <DataTable
                data={news}
                columns={[
                  { key: 'title', label: 'Título' },
                  { key: 'content', label: 'Conteúdo', render: (value) => value.substring(0, 100) + '...' },
                  { key: 'is_published', label: 'Status', render: (value) => value ? 'Publicado' : 'Rascunho' },
                  { key: 'createdAt', label: 'Criado em', render: (value) => new Date(value).toLocaleDateString() }
                ]}
                onEdit={(item) => openEditModal('news', item)}
                onDelete={handleDeleteNews}
                loading={newsLoading}
              />
            </div>
          </div>
        );

      case 'announcements':
        return (
          <div className="bg-white rounded-xl shadow-lg">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Gerenciar Avisos</h2>
                <button
                  onClick={() => openCreateModal('announcement')}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  + Novo Aviso
                </button>
              </div>
            </div>
            <div className="p-6">
              <DataTable
                data={announcements}
                columns={[
                  { key: 'title', label: 'Título' },
                  { key: 'content', label: 'Conteúdo', render: (value) => value.substring(0, 100) + '...' },
                  { key: 'is_active', label: 'Status', render: (value) => value ? 'Ativo' : 'Inativo' },
                  { key: 'createdAt', label: 'Criado em', render: (value) => new Date(value).toLocaleDateString() }
                ]}
                onEdit={(item) => openEditModal('announcement', item)}
                onDelete={handleDeleteAnnouncement}
                loading={announcementsLoading}
              />
            </div>
          </div>
        );

      case 'mass-schedule':
        return (
          <div className="bg-white rounded-xl shadow-lg">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Gerenciar Horários de Missa</h2>
                <button
                  onClick={() => openCreateModal('mass-schedule')}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  + Novo Horário
                </button>
              </div>
            </div>
            <div className="p-6">
              <DataTable
                data={massSchedules}
                columns={[
                  { key: 'day_of_week', label: 'Dia', render: (value) => getDayName(value) },
                  { key: 'time', label: 'Horário' },
                  { key: 'is_active', label: 'Status', render: (value) => value ? 'Ativo' : 'Inativo' }
                ]}
                onEdit={(item) => openEditModal('mass-schedule', item)}
                onDelete={handleDeleteMassSchedule}
                loading={massSchedulesLoading}
              />
            </div>
          </div>
        );

      case 'birthdays':
        return (
          <div className="bg-white rounded-xl shadow-lg">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Gerenciar Aniversariantes</h2>
                <button
                  onClick={() => openCreateModal('birthday')}
                  className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors"
                >
                  + Novo Aniversariante
                </button>
              </div>
            </div>
            <div className="p-6">
              <DataTable
                data={birthdays}
                columns={[
                  { key: 'name', label: 'Nome' },
                  { key: 'birth_date', label: 'Data de Nascimento' },
                  { key: 'is_active', label: 'Status', render: (value) => value ? 'Ativo' : 'Inativo' }
                ]}
                onEdit={(item) => openEditModal('birthday', item)}
                onDelete={handleDeleteBirthday}
                loading={birthdaysLoading}
              />
            </div>
          </div>
        );

      case 'parish-info':
        return (
          <div className="bg-white rounded-xl shadow-lg">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Gerenciar Informações da Paróquia</h2>
                <button
                  onClick={() => openCreateModal('parish-info')}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  + Nova Informação
                </button>
              </div>
            </div>
            <div className="p-6">
              <DataTable
                data={parishInfo}
                columns={[
                  { key: 'title', label: 'Título' },
                  { key: 'content', label: 'Conteúdo', render: (value) => value.substring(0, 100) + '...' },
                  { key: 'section', label: 'Seção' },
                  { key: 'is_active', label: 'Status', render: (value) => value ? 'Ativo' : 'Inativo' }
                ]}
                onEdit={(item) => openEditModal('parish-info', item)}
                onDelete={handleDeleteParishInfo}
                loading={parishInfoLoading}
              />
            </div>
          </div>
        );

      case 'dizimistas':
        return (
          <div className="bg-white rounded-xl shadow-lg">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Gerenciar Dizimistas</h2>
                <button
                  onClick={() => openCreateModal('dizimista')}
                  className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  + Novo Dizimista
                </button>
              </div>
            </div>
            <div className="p-6">
              <DataTable
                data={dizimistas}
                columns={[
                  { key: 'name', label: 'Nome' },
                  { key: 'email', label: 'Email' },
                  { key: 'phone', label: 'Telefone' },
                  { key: 'address', label: 'Endereço' }
                ]}
                onEdit={(item) => openEditModal('dizimista', item)}
                onDelete={handleDeleteDizimista}
                loading={dizimistasLoading}
              />
            </div>
          </div>
        );

      default:
        return <div>Seção não encontrada</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 z-30 ${sidebarCollapsed ? 'w-16' : 'w-64'}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              {!sidebarCollapsed && (
                <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
              )}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {sidebarCollapsed ? '→' : '←'}
              </button>
            </div>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                {user?.name?.charAt(0) || 'U'}
              </div>
              {!sidebarCollapsed && (
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              )}
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    {!sidebarCollapsed && (
                      <span className="ml-3 font-medium">{item.name}</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center p-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
            >
              <span className="text-xl">🚪</span>
              {!sidebarCollapsed && (
                <span className="ml-3 font-medium">Sair</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="p-6">
          {renderContent()}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <Modal 
          isOpen={modalOpen} 
          onClose={closeModal}
          title={editingItem ? `Editar ${modalType === 'news' ? 'Notícia' : modalType === 'announcement' ? 'Aviso' : modalType === 'mass-schedule' ? 'Horário de Missa' : modalType === 'parish-info' ? 'Informação da Paróquia' : modalType === 'dizimista' ? 'Dizimista' : 'Aniversariante'}` : `Novo ${modalType === 'news' ? 'Notícia' : modalType === 'announcement' ? 'Aviso' : modalType === 'mass-schedule' ? 'Horário de Missa' : modalType === 'parish-info' ? 'Informação da Paróquia' : modalType === 'dizimista' ? 'Dizimista' : 'Aniversariante'}`}
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
      )}
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
        <RichTextEditor
          value={formData.content}
          onChange={(html) => setFormData({ ...formData, content: html })}
          height="250px"
          minHeight="200px"
          maxHeight="500px"
        />
      </div>

      <div className="flex items-center mt-6">
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

      <div className="flex justify-end space-x-3 pt-6">
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