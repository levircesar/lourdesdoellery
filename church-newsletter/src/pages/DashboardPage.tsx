import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useDashboardNews } from '../hooks/useDashboardNews';
import { useDashboardAnnouncements } from '../hooks/useDashboardAnnouncements';
import { useDashboardMassSchedule } from '../hooks/useDashboardMassSchedule';
import { useDashboardParishInfo } from '../hooks/useDashboardParishInfo';
import { useDashboardDizimistas } from '../hooks/useDashboardDizimistas';
import { useDashboardBirthdays } from '../hooks/useDashboardBirthdays';
import { useUsers } from '../hooks/useUsers';
import { useMassIntentions } from '../hooks/useMassIntentions';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import RichTextEditor from '../components/RichTextEditor';
import ThemeToggle from '../components/ThemeToggle';
import { News, Announcement, MassSchedule, ParishInfo, Dizimista, Birthday, User, MassIntention, MassIntentionFormData } from '../types';
import { formatDate } from '../utils/dateTime';
import { formatTime } from '../utils/dateTime';

// Interfaces para os tipos de dados dos relatórios
interface PrintReportData {
  title: string;
  parish: string;
  generatedAt: string;
  total: number;
}

interface MassIntentionsPrintReportData extends PrintReportData {
  groupedByType: Record<string, Array<{
    id: string;
    notes: string;
    is_recurring: boolean;
  }>>;
}

interface AnnouncementsPrintReportData extends PrintReportData {
  items: Array<{
    title: string;
    content: string;
    week_start: string;
    week_end: string;
  }>;
}

interface MassSchedulePrintReportData extends PrintReportData {
  items: Array<{
    day_of_week: number;
    time: string;
    description?: string;
  }>;
}

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [modalType, setModalType] = useState<'news' | 'announcement' | 'mass-schedule' | 'parish-info' | 'dizimista' | 'birthday' | 'user' | 'mass-intention' | null>(null);
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  console.log('Dashboard - User object:', user);
  console.log('Dashboard - User role:', user?.role);
  
  // Hooks para dados
  const { 
    news, 
    loading: newsLoading, 
    createNews, 
    updateNews,
    deleteNews: deleteNewsFromHook 
  } = useDashboardNews();
  
  const { 
    announcements, 
    loading: announcementsLoading, 
    createAnnouncement, 
    updateAnnouncement,
    deleteAnnouncement: deleteAnnouncementFromHook,
    generatePrintReport: generateAnnouncementsPrintReport
  } = useDashboardAnnouncements();

    const { 
    massSchedules, 
    loading: massSchedulesLoading, 
    createMassSchedule, 
    updateMassSchedule,
    deleteMassSchedule: deleteMassScheduleFromHook,
    generatePrintReport: generateMassSchedulePrintReport
  } = useDashboardMassSchedule();

    const { 
    parishInfo, 
    loading: parishInfoLoading, 
    createParishInfo, 
    updateParishInfo,
    deleteParishInfo: deleteParishInfoFromHook 
  } = useDashboardParishInfo();

    const { 
    dizimistas, 
    loading: dizimistasLoading, 
    createDizimista, 
    updateDizimista,
    deleteDizimista: deleteDizimistaFromHook 
  } = useDashboardDizimistas();

    const { 
    birthdays, 
    loading: birthdaysLoading, 
    createBirthday, 
    updateBirthday,
    deleteBirthday: deleteBirthdayFromHook 
  } = useDashboardBirthdays();

  const {
    users,
    loading: usersLoading,
    createUser,
    updateUser,
    deleteUser: deleteUserFromHook
  } = useUsers();

  // Estado para filtros de intenções de missa
  const [massIntentionFilters, setMassIntentionFilters] = useState({
    search: '',
    filter_type: undefined as 'thanksgiving' | 'deceased' | undefined,
    filter_recurring: undefined as boolean | undefined
  });

  const { 
    massIntentions, 
    loading: massIntentionsLoading, 
    createMassIntention, 
    updateMassIntention, 
    deleteMassIntention: deleteMassIntentionFromHook,
    deleteAllNonRecurring,
    generatePrintReport
  } = useMassIntentions(massIntentionFilters);

  console.log('Dashboard - Usuários carregados:', users);
  console.log('Dashboard - Loading usuários:', usersLoading);

  // Garantir que usuários comuns sempre fiquem na visão geral
  useEffect(() => {
    if (user?.role === 'common' && activeTab !== 'overview') {
      setActiveTab('overview');
    }
  }, [user?.role, activeTab]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { id: 'overview', name: 'Visão Geral', icon: '📊' },
    // Apenas admin e editor podem ver as outras seções
    ...(user?.role === 'admin' || user?.role === 'editor' ? [
      { id: 'news', name: 'Notícias', icon: '📰' },
      { id: 'announcements', name: 'Avisos', icon: '📢' },
      { id: 'mass-schedule', name: 'Horários de Missa', icon: '⏰' },
      { id: 'mass-intentions', name: 'Intenções de Missa', icon: '🙏' },
      { id: 'birthdays', name: 'Aniversariantes', icon: '🎂' },
      { id: 'parish-info', name: 'Info da Paróquia', icon: '🏛️' },
      { id: 'dizimistas', name: 'Dizimistas', icon: '💰' },
    ] : []),
    // Apenas admin pode ver usuários
    ...(user?.role === 'admin' ? [{ id: 'users', name: 'Usuários', icon: '👥' }] : []),
  ];

  console.log('Menu items:', menuItems);
  console.log('User role:', user?.role);

  const stats = [
    // Estatísticas básicas para todos os usuários
    { name: 'Notícias', value: news.length.toString(), icon: '📰', color: 'bg-blue-500' },
    { name: 'Avisos Ativos', value: announcements.length.toString(), icon: '📢', color: 'bg-green-500' },
    { name: 'Horários de Missa', value: massSchedules.length.toString(), icon: '⏰', color: 'bg-purple-500' },
    // Estatísticas detalhadas apenas para admin e editor
    ...(user?.role === 'admin' || user?.role === 'editor' ? [
      { name: 'Intenções de Missa', value: massIntentions.length.toString(), icon: '🙏', color: 'bg-orange-500' },
      { name: 'Aniversariantes', value: birthdays.length.toString(), icon: '🎂', color: 'bg-pink-500' },
      { name: 'Dizimistas', value: dizimistas.length.toString(), icon: '💰', color: 'bg-yellow-500' },
    ] : []),
    // Apenas admin pode ver usuários
    ...(user?.role === 'admin' ? [{ name: 'Usuários', value: users.length.toString(), icon: '👥', color: 'bg-indigo-500' }] : []),
  ];

  // Handlers para modais
  const openCreateModal = (type: 'news' | 'announcement' | 'mass-schedule' | 'parish-info' | 'dizimista' | 'birthday' | 'user' | 'mass-intention') => {
    setModalType(type);
    setEditingItem(null);
    setModalOpen(true);
  };

  const openEditModal = (type: 'news' | 'announcement' | 'mass-schedule' | 'parish-info' | 'dizimista' | 'birthday' | 'user' | 'mass-intention', item: any) => {
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
      if (editingItem) {
        // Atualizar notícia existente
        const result = await updateNews(editingItem.id, formData);
        if (result.success) {
          closeModal();
        } else {
          alert(result.error);
        }
      } else {
        // Criar nova notícia
        const result = await createNews(formData);
        if (result.success) {
          closeModal();
        } else {
          alert(result.error);
        }
      }
    } else if (modalType === 'announcement') {
      if (editingItem) {
        // Atualizar aviso existente
        const result = await updateAnnouncement(editingItem.id, formData);
        if (result.success) {
          closeModal();
        } else {
          alert(result.error);
        }
      } else {
        // Criar novo aviso
        const result = await createAnnouncement(formData);
        if (result.success) {
          closeModal();
        } else {
          alert(result.error);
        }
      }
    } else if (modalType === 'mass-schedule') {
      if (editingItem) {
        // Atualizar horário de missa existente
        const result = await updateMassSchedule(editingItem.id, formData);
        if (result.success) {
          closeModal();
        } else {
          alert(result.error);
        }
      } else {
        // Criar novo horário de missa
        const result = await createMassSchedule(formData);
        if (result.success) {
          closeModal();
        } else {
          alert(result.error);
        }
      }
    } else if (modalType === 'parish-info') {
      if (editingItem) {
        // Atualizar informação da paróquia existente
        const result = await updateParishInfo(editingItem.id, formData);
        if (result.success) {
          closeModal();
        } else {
          alert(result.error);
        }
      } else {
        // Criar nova informação da paróquia
        const result = await createParishInfo(formData);
        if (result.success) {
          closeModal();
        } else {
          alert(result.error);
        }
      }
    } else if (modalType === 'dizimista') {
      if (editingItem) {
        // Atualizar dizimista existente
        const result = await updateDizimista(editingItem.id, formData);
        if (result.success) {
          closeModal();
        } else {
          alert(result.error);
        }
      } else {
        // Criar novo dizimista
        const result = await createDizimista(formData);
        if (result.success) {
          closeModal();
        } else {
          alert(result.error);
        }
      }
    } else if (modalType === 'birthday') {
      if (editingItem) {
        // Atualizar aniversariante existente
        const result = await updateBirthday(editingItem.id, formData);
        if (result.success) {
          closeModal();
        } else {
          alert(result.error);
        }
      } else {
        // Criar novo aniversariante
        const result = await createBirthday(formData);
        if (result.success) {
          closeModal();
        } else {
          alert(result.error);
        }
      }
    } else if (modalType === 'user') {
      if (editingItem) {
        // Atualizar usuário existente
        const result = await updateUser(editingItem.id, formData);
        if (result.success) {
          closeModal();
        } else {
          alert(result.error);
        }
      } else {
        // Criar novo usuário
        const result = await createUser(formData);
        if (result.success) {
          closeModal();
        } else {
          alert(result.error);
        }
      }
    } else if (modalType === 'mass-intention') {
      const result = await createMassIntention(formData);
      if (result.success) {
        closeModal();
      } else {
        alert(result.error);
      }
    }
  };



  const handleDeleteNews = async (item: any) => {
    if (window.confirm('Tem certeza que deseja excluir esta notícia?')) {
      const result = await deleteNewsFromHook(item.id);
      if (!result.success) {
        alert(result.error);
      }
    }
  };

  const handleDeleteAnnouncement = async (item: any) => {
    if (window.confirm('Tem certeza que deseja excluir este aviso?')) {
      const result = await deleteAnnouncementFromHook(item.id);
      if (!result.success) {
        alert(result.error);
      }
    }
  };

  const handleDeleteMassSchedule = async (item: any) => {
    if (window.confirm('Tem certeza que deseja excluir este horário de missa?')) {
      const result = await deleteMassScheduleFromHook(item.id);
      if (!result.success) {
        alert(result.error);
      }
    }
  };

  const handleDeleteParishInfo = async (item: any) => {
    if (window.confirm('Tem certeza que deseja excluir esta informação da paróquia?')) {
      const result = await deleteParishInfoFromHook(item.id);
      if (!result.success) {
        alert(result.error);
      }
    }
  };

  const handleDeleteDizimista = async (item: any) => {
    if (window.confirm('Tem certeza que deseja excluir este dizimista?')) {
      const result = await deleteDizimistaFromHook(item.id);
      if (!result.success) {
        alert(result.error);
      }
    }
  };

  const handleDeleteBirthday = async (item: any) => {
    if (window.confirm('Tem certeza que deseja excluir este aniversariante?')) {
      const result = await deleteBirthdayFromHook(item.id);
      if (!result.success) {
        alert(result.error);
      }
    }
  };

  const handleDeleteUser = async (item: any) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      const result = await deleteUserFromHook(item.id);
      if (!result.success) {
        alert(result.error);
      }
    }
  };

  const handleDeleteMassIntention = async (item: any) => {
    if (window.confirm('Tem certeza que deseja excluir esta intenção de missa?')) {
      const result = await deleteMassIntentionFromHook(item.id);
      if (!result.success) {
        alert(result.error);
      }
    }
  };

  const handleDeleteAllNonRecurring = async () => {
    if (window.confirm('Tem certeza que deseja excluir TODAS as intenções não recorrentes? Esta ação não pode ser desfeita.')) {
      const result = await deleteAllNonRecurring();
      if (result.success) {
        alert(`${result.deletedCount} intenções não recorrentes foram excluídas.`);
      } else {
        alert(result.error);
      }
    }
  };

  const handlePrintReport = async () => {
    const result = await generatePrintReport(massIntentionFilters);
    if (result.success && result.data) {
      const data = result.data as MassIntentionsPrintReportData;
      // Abrir nova janela para impressão
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Relatório de Intenções de Missa</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .header { text-align: center; margin-bottom: 30px; }
                .info { margin-bottom: 20px; }
                .intention-type { margin-bottom: 30px; }
                .intention-type h3 { background-color: #f2f2f2; padding: 10px; margin-bottom: 15px; }
                .intention-item { margin-bottom: 10px; padding: 10px; border-left: 3px solid #007bff; background-color: #f8f9fa; }
                .intention-notes { font-style: italic; color: #666; }
                .recurring { border-left-color: #28a745; }
                .inactive { opacity: 0.6; }
              </style>
            </head>
            <body>
              <div class="header">
                <h1>${data.title}</h1>
                <p>${data.parish}</p>
              </div>
              <div class="info">
                <p><strong>Gerado em:</strong> ${data.generatedAt}</p>
                <p><strong>Total de intenções:</strong> ${data.total}</p>
              </div>
                                ${Object.entries(data.groupedByType).map(([type, intentions]) => `
                    <div class="intention-type">
                      <h3>${type}</h3>
                      ${intentions.map((intention) => `
                        <div class="intention-item ${intention.is_recurring ? 'recurring' : ''}">
                          <div class="intention-notes">${intention.notes || 'Sem observações'}</div>
                        </div>
                      `).join('')}
                    </div>
                  `).join('')}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    } else {
      alert(result.error);
    }
  };

  const handlePrintAnnouncements = async () => {
    const result = await generateAnnouncementsPrintReport();
    if (result.success && result.data) {
      const data = result.data as AnnouncementsPrintReportData;
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>${data.title}</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .header { text-align: center; margin-bottom: 30px; }
                .info { margin-bottom: 20px; }
                .announcement { margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 5px; }
                .announcement h3 { margin-top: 0; color: #333; }
                .announcement-content { line-height: 1.6; }
                .announcement-meta { font-size: 12px; color: #666; margin-top: 10px; }
              </style>
            </head>
            <body>
              <div class="header">
                <h1>${data.title}</h1>
                <p>${data.parish}</p>
              </div>
              <div class="info">
                <p><strong>Gerado em:</strong> ${data.generatedAt}</p>
                <p><strong>Total de avisos:</strong> ${data.total}</p>
              </div>
              ${data.items.map((announcement) => `
                <div class="announcement">
                  <h3>${announcement.title}</h3>
                  <div class="announcement-content">${announcement.content}</div>
                  <div class="announcement-meta">
                    <strong>Período:</strong> ${new Date(announcement.week_start).toLocaleDateString('pt-BR')} a ${new Date(announcement.week_end).toLocaleDateString('pt-BR')}
                  </div>
                </div>
              `).join('')}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    } else {
      alert(result.error);
    }
  };

  const handlePrintMassSchedule = async () => {
    const result = await generateMassSchedulePrintReport();
    if (result.success && result.data) {
      const data = result.data as MassSchedulePrintReportData;
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>${data.title}</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .header { text-align: center; margin-bottom: 30px; }
                .info { margin-bottom: 20px; }
                .schedule-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
                .day-schedule { border: 1px solid #ddd; border-radius: 8px; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
                .day-title { font-size: 18px; font-weight: bold; margin-bottom: 15px; text-align: center; }
                .mass-time { background: rgba(255,255,255,0.2); padding: 10px; margin: 8px 0; border-radius: 5px; text-align: center; }
                .mass-description { font-size: 14px; margin-top: 5px; opacity: 0.9; }
              </style>
            </head>
            <body>
              <div class="header">
                <h1>${data.title}</h1>
                <p>${data.parish}</p>
              </div>
              <div class="info">
                <p><strong>Gerado em:</strong> ${data.generatedAt}</p>
                <p><strong>Total de horários:</strong> ${data.total}</p>
              </div>
              <div class="schedule-grid">
                ${['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'].map((dayName, index) => {
                  const daySchedules = data.items.filter((schedule) => schedule.day_of_week === index);
                  if (daySchedules.length === 0) return '';
                  
                  return `
                    <div class="day-schedule">
                      <div class="day-title">${dayName}</div>
                      ${daySchedules.map((schedule) => `
                        <div class="mass-time">
                          <strong>${schedule.time}</strong>
                          ${schedule.description ? `<div class="mass-description">${schedule.description}</div>` : ''}
                        </div>
                      `).join('')}
                    </div>
                  `;
                }).join('')}
              </div>
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    } else {
      alert(result.error);
    }
  };

  const getDayName = (dayOfWeek: number) => {
    const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    return days[dayOfWeek] || 'Desconhecido';
  };

  const renderContent = () => {
    // Usuários comuns só podem ver a visão geral
    if (user?.role === 'common' && activeTab !== 'overview') {
      setActiveTab('overview');
      return null;
    }

    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <div className={`${stat.color} p-3 rounded-lg text-white text-2xl`}>
                      {stat.icon}
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{stat.name}</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Últimas Notícias</h3>
                <div className="space-y-3">
                  {news.slice(0, 5).map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white truncate">{item.title}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(item.createdAt)}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${item.is_published ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300' : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300'}`}>
                        {item.is_published ? 'Publicado' : 'Rascunho'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Próximos Aniversariantes</h3>
                <div className="space-y-3">
                  {birthdays.slice(0, 5).map((item, index) => {
                    const birthDate = new Date(item.birth_date);
                    const day = birthDate.getDate();
                    const month = birthDate.getMonth() + 1;
                    return (
                      <div key={index} className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                          {day}
                        </div>
                        <div className="ml-3 flex-1">
                          <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{month}/{day}</p>
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
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Gerenciar Notícias</h2>
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
                  { key: 'createdAt', label: 'Criado em', render: (value) => formatDate(value) }
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
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Gerenciar Avisos</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={handlePrintAnnouncements}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    🖨️ Imprimir
                  </button>
                  <button
                    onClick={() => openCreateModal('announcement')}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    + Novo Aviso
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6">
              <DataTable
                data={announcements}
                columns={[
                  { key: 'title', label: 'Título' },
                  { key: 'content', label: 'Conteúdo', render: (value) => value.substring(0, 100) + '...' },
                  { key: 'is_active', label: 'Status', render: (value) => value ? 'Ativo' : 'Inativo' },
                  { key: 'createdAt', label: 'Criado em', render: (value) => formatDate(value) }
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
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Gerenciar Horários de Missa</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={handlePrintMassSchedule}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    🖨️ Imprimir
                  </button>
                  <button
                    onClick={() => openCreateModal('mass-schedule')}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    + Novo Horário
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6">
              <DataTable
                data={massSchedules}
                columns={[
                  { key: 'day_of_week', label: 'Dia', render: (value) => getDayName(value) },
                  { key: 'time', label: 'Horário', render: (value) => formatTime(value) },
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
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Gerenciar Aniversariantes</h2>
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
                  { key: 'birth_date', label: 'Data de Nascimento', render: (value) => {
                    const date = new Date(value);
                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const year = date.getFullYear();
                    return `${day}/${month}/${year}`;
                  } },
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
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Gerenciar Informações da Paróquia</h2>
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
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Gerenciar Dizimistas</h2>
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

      case 'mass-intentions':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Gerenciar Intenções de Missa</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={handlePrintReport}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    🖨️ Imprimir
                  </button>
                  <button
                    onClick={handleDeleteAllNonRecurring}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    🗑️ Excluir Não Recorrentes
                  </button>
                  <button
                    onClick={() => openCreateModal('mass-intention')}
                    className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    + Nova Intenção
                  </button>
                </div>
              </div>
              
              {/* Filtros */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={massIntentionFilters.search}
                  onChange={(e) => setMassIntentionFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                <select
                  value={massIntentionFilters.filter_type || ''}
                  onChange={(e) => setMassIntentionFilters(prev => ({ 
                    ...prev, 
                    filter_type: e.target.value as 'thanksgiving' | 'deceased' | undefined || undefined 
                  }))}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Todos os tipos</option>
                  <option value="thanksgiving">Ação de Graças</option>
                  <option value="deceased">Falecidos</option>
                </select>
                <select
                  value={massIntentionFilters.filter_recurring === undefined ? '' : massIntentionFilters.filter_recurring.toString()}
                  onChange={(e) => setMassIntentionFilters(prev => ({ 
                    ...prev, 
                    filter_recurring: e.target.value === '' ? undefined : e.target.value === 'true'
                  }))}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Todas</option>
                  <option value="true">Apenas recorrentes</option>
                  <option value="false">Apenas não recorrentes</option>
                </select>
                <button
                  onClick={() => setMassIntentionFilters({ search: '', filter_type: undefined, filter_recurring: undefined })}
                  className="px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Limpar Filtros
                </button>
              </div>
            </div>
            <div className="p-6">
              <DataTable
                data={massIntentions}
                columns={[
                  { key: 'intention_type', label: 'Tipo', render: (value) => value === 'thanksgiving' ? 'Ação de Graças' : 'Falecidos' },
                  { key: 'notes', label: 'Observação', render: (value) => value ? value.substring(0, 100) + '...' : '-' },
                  { key: 'is_recurring', label: 'Recorrente', render: (value) => value ? 'Sim' : 'Não' },
                  { key: 'created_at', label: 'Criado em', render: (value) => formatDate(value) }
                ]}
                onEdit={(item) => openEditModal('mass-intention', item)}
                onDelete={handleDeleteMassIntention}
                loading={massIntentionsLoading}
              />
            </div>
          </div>
        );

      case 'users':
        console.log('Renderizando aba de usuários');
        console.log('Dados dos usuários:', users);
        console.log('Loading:', usersLoading);
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Gerenciar Usuários</h2>
                <button
                  onClick={() => openCreateModal('user')}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  + Novo Usuário
                </button>
              </div>
            </div>
            <div className="p-6">
              <DataTable
                data={users}
                columns={[
                  { key: 'name', label: 'Nome' },
                  { key: 'email', label: 'Email' },
                  { key: 'role', label: 'Papel', render: (value) => {
                    const roleLabels: Record<string, string> = {
                      admin: 'Administrador',
                      editor: 'Redator',
                      common: 'Comum'
                    };
                    return roleLabels[value as string] || value;
                  }},
                  { key: 'is_active', label: 'Status', render: (value) => value ? 'Ativo' : 'Inativo' },
                  { key: 'last_login', label: 'Último Login', render: (value) => value ? formatDate(value) : 'Nunca' }
                ]}
                onEdit={(item) => openEditModal('user', item)}
                onDelete={handleDeleteUser}
                loading={usersLoading}
              />
            </div>
          </div>
        );

      default:
        return <div>Seção não encontrada</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 z-30 ${sidebarCollapsed ? 'w-16' : 'w-64'}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              {!sidebarCollapsed && (
                <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">Dashboard</h1>
              )}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300"
              >
                {sidebarCollapsed ? '→' : '←'}
              </button>
            </div>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                {user?.name?.charAt(0) || 'U'}
              </div>
              {!sidebarCollapsed && (
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{user?.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
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
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
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

          {/* Theme Toggle */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              {!sidebarCollapsed && (
                <span className="text-sm text-gray-600 dark:text-gray-400">Tema</span>
              )}
              <ThemeToggle />
            </div>
          </div>

          {/* Logout */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleLogout}
              className="w-full flex items-center p-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
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
          title={
            modalType === 'news' ? (editingItem ? 'Editar Notícia' : 'Nova Notícia') :
            modalType === 'announcement' ? (editingItem ? 'Editar Aviso' : 'Novo Aviso') :
            modalType === 'mass-schedule' ? (editingItem ? 'Editar Horário' : 'Novo Horário') :
            modalType === 'parish-info' ? (editingItem ? 'Editar Informação' : 'Nova Informação') :
            modalType === 'dizimista' ? (editingItem ? 'Editar Dizimista' : 'Novo Dizimista') :
            modalType === 'birthday' ? (editingItem ? 'Editar Aniversariante' : 'Novo Aniversariante') :
            modalType === 'user' ? (editingItem ? 'Editar Usuário' : 'Novo Usuário') :
            'Modal'
          }
          size={modalType === 'news' ? 'xl' : 'lg'}
        >
          {modalType === 'news' && <NewsForm news={editingItem} onSubmit={handleCreate} onCancel={closeModal} />}
          {modalType === 'announcement' && <AnnouncementForm announcement={editingItem} onSubmit={handleCreate} onCancel={closeModal} />}
          {modalType === 'mass-schedule' && <MassScheduleForm massSchedule={editingItem} onSubmit={handleCreate} onCancel={closeModal} />}
          {modalType === 'parish-info' && <ParishInfoForm parishInfo={editingItem} onSubmit={handleCreate} onCancel={closeModal} />}
          {modalType === 'dizimista' && <DizimistaForm dizimista={editingItem} onSubmit={handleCreate} onCancel={closeModal} />}
          {modalType === 'birthday' && <BirthdayForm birthday={editingItem} onSubmit={handleCreate} onCancel={closeModal} />}
          {modalType === 'user' && <UserForm user={editingItem} onSubmit={handleCreate} onCancel={closeModal} />}
          {modalType === 'mass-intention' && (
            <MassIntentionForm 
              massIntention={editingItem} 
              onSubmit={editingItem ? async (data: any) => {
                const result = await updateMassIntention(editingItem.id, data);
                if (result.success) {
                  closeModal();
                } else {
                  alert(result.error);
                }
              } : handleCreate} 
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
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-4xl">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Título *
        </label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-church-blue dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-base"
          placeholder="Digite o título da notícia"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Resumo
        </label>
        <textarea
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-church-blue dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-base resize-y"
          placeholder="Digite um resumo da notícia (opcional)"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Conteúdo *
        </label>
        <RichTextEditor
          value={formData.content}
          onChange={(html) => setFormData({ ...formData, content: html })}
        />
      </div>

      <div className="flex items-center mt-6">
        <input
          type="checkbox"
          id="is_published"
          checked={formData.is_published}
          onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
          className="h-5 w-5 text-church-blue focus:ring-church-blue border-gray-300 dark:border-gray-600 rounded"
        />
        <label htmlFor="is_published" className="ml-3 block text-sm text-gray-900 dark:text-white">
          Publicar imediatamente
        </label>
      </div>

      <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="btn-primary px-6 py-3"
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
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Título *
        </label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-church-blue dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Início da Semana *
          </label>
          <input
            type="date"
            required
            value={formData.week_start}
            onChange={(e) => setFormData({ ...formData, week_start: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-church-blue dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Fim da Semana *
          </label>
          <input
            type="date"
            required
            value={formData.week_end}
            onChange={(e) => setFormData({ ...formData, week_end: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-church-blue dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Conteúdo *
        </label>
        <RichTextEditor
          value={formData.content}
          onChange={(html) => setFormData({ ...formData, content: html })}
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="is_active"
          checked={formData.is_active}
          onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
          className="h-4 w-4 text-church-blue focus:ring-church-blue border-gray-300 dark:border-gray-600 rounded"
        />
        <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900 dark:text-white">
          Ativo
        </label>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
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
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Dia da Semana *
        </label>
        <select
          required
          value={formData.day_of_week}
          onChange={(e) => setFormData({ ...formData, day_of_week: parseInt(e.target.value) })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-church-blue dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
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
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Horário *
        </label>
        <input
          type="time"
          required
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-church-blue dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Descrição
        </label>
        <input
          type="text"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Ex: Missa da manhã, Missa dominical, etc."
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-church-blue dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="is_active"
          checked={formData.is_active}
          onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
          className="h-4 w-4 text-church-blue focus:ring-church-blue border-gray-300 dark:border-gray-600 rounded"
        />
        <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900 dark:text-white">
          Ativo
        </label>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
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
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Título *
        </label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-church-blue dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Seção *
        </label>
        <select
          required
          value={formData.section}
          onChange={(e) => setFormData({ ...formData, section: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-church-blue dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="geral">Geral</option>
          <option value="missas">Missas</option>
          <option value="eventos">Eventos</option>
          <option value="contatos">Contatos</option>
          <option value="horarios">Horários</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Conteúdo *
        </label>
        <RichTextEditor
          value={formData.content}
          onChange={(html) => setFormData({ ...formData, content: html })}
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="is_active"
          checked={formData.is_active}
          onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
          className="h-4 w-4 text-church-blue focus:ring-church-blue border-gray-300 dark:border-gray-600 rounded"
        />
        <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900 dark:text-white">
          Ativo
        </label>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
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
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Nome *
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-church-blue dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Email
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-church-blue dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Telefone
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-church-blue dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Endereço
        </label>
        <textarea
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-church-blue dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="is_active"
          checked={formData.is_active}
          onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
          className="h-4 w-4 text-church-blue focus:ring-church-blue border-gray-300 dark:border-gray-600 rounded"
        />
        <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900 dark:text-white">
          Ativo
        </label>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
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
  // Formatar a data para o formato YYYY-MM-DD que o input type="date" espera
  const formatDateForInput = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const [formData, setFormData] = useState({
    name: birthday?.name || '',
    birth_date: formatDateForInput(birthday?.birth_date || ''),
    is_active: birthday?.is_active ?? true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Nome *
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-church-blue dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Data de Nascimento *
        </label>
        <input
          type="date"
          required
          value={formData.birth_date}
          onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-church-blue dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="is_active"
          checked={formData.is_active}
          onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
          className="h-4 w-4 text-church-blue focus:ring-church-blue border-gray-300 dark:border-gray-600 rounded"
        />
        <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900 dark:text-white">
          Ativo
        </label>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
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

// Adicionar o formulário de usuário no final do arquivo
const UserForm: React.FC<{
  user?: User;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}> = ({ user, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    password?: string;
    role: 'admin' | 'editor' | 'common';
    is_active: boolean;
  }>({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    role: user?.role || 'common',
    is_active: user?.is_active ?? true
  });

  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const { changeUserPassword } = useUsers();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData: any = { ...formData };
    if (!user && !submitData.password) {
      alert('Senha é obrigatória para novos usuários');
      return;
    }
    if (user && !submitData.password) {
      delete submitData.password;
    }
    onSubmit(submitData);
  };

  const handlePasswordChange = async () => {
    if (!newPassword.trim()) {
      alert('Digite uma nova senha');
      return;
    }

    if (newPassword.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    const result = await changeUserPassword(user!.id, newPassword);
    if (result.success) {
      alert('Senha alterada com sucesso!');
      setNewPassword('');
      setShowPasswordChange(false);
    } else {
      alert(result.error);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Nome *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-church-blue dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-church-blue dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {user ? 'Nova Senha (deixe em branco para manter)' : 'Senha *'}
          </label>
          <input
            type="password"
            required={!user}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-church-blue dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Papel *
          </label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-church-blue dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="common">Comum</option>
            <option value="editor">Redator</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="is_active"
            checked={formData.is_active}
            onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
            className="h-4 w-4 text-church-blue focus:ring-church-blue border-gray-300 dark:border-gray-600 rounded"
          />
          <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900 dark:text-white">
            Ativo
          </label>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="btn-primary"
          >
            {user ? 'Atualizar' : 'Criar'}
          </button>
        </div>
      </form>

      {/* Seção de alteração de senha para usuários existentes */}
      {user && (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-medium text-gray-900 dark:text-white">Alterar Senha</h4>
            <button
              type="button"
              onClick={() => setShowPasswordChange(!showPasswordChange)}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              {showPasswordChange ? 'Cancelar' : 'Alterar Senha'}
            </button>
          </div>

          {showPasswordChange && (
            <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nova Senha *
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Digite a nova senha"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-church-blue dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handlePasswordChange}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
                >
                  Alterar Senha
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const MassIntentionForm: React.FC<{
  massIntention?: MassIntention;
  onSubmit: (data: MassIntentionFormData) => void;
  onCancel: () => void;
}> = ({ massIntention, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<MassIntentionFormData>({
    intention_type: massIntention?.intention_type || 'thanksgiving',
    notes: massIntention?.notes || '',
    is_recurring: massIntention?.is_recurring || false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tipo *</label>
        <select
          required
          value={formData.intention_type}
          onChange={e => setFormData({ ...formData, intention_type: e.target.value as 'thanksgiving' | 'deceased' })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="thanksgiving">Ação de Graças</option>
          <option value="deceased">Falecidos</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Observação *</label>
        <textarea
          required
          value={formData.notes}
          onChange={e => setFormData({ ...formData, notes: e.target.value })}
          rows={4}
          placeholder="Digite a intenção da missa"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="is_recurring"
          checked={formData.is_recurring}
          onChange={e => setFormData({ ...formData, is_recurring: e.target.checked })}
          className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 dark:border-gray-600 rounded"
        />
        <label htmlFor="is_recurring" className="ml-2 block text-sm text-gray-900 dark:text-white">
          Recorrente
        </label>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="btn-primary"
        >
          {massIntention ? 'Atualizar' : 'Criar'}
        </button>
      </div>
    </form>
  );
};

export default DashboardPage; 