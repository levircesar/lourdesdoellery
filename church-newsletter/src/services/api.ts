import { API_CONFIG } from '../config/api';

const API_BASE_URL = API_CONFIG.BASE_URL;

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: any[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Adicionar token de autenticação se existir
    const token = localStorage.getItem('church_token');
    if (token) {
      defaultOptions.headers = {
        ...defaultOptions.headers,
        'Authorization': `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, defaultOptions);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro na requisição');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request<{ user: any; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async getProfile() {
    return this.request('/auth/profile');
  }

  // News endpoints
  async getNews(params?: { page?: number; limit?: number; search?: string; is_published?: boolean }) {
    const queryParams = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return this.request(`/news${queryParams}`);
  }

  async getPublishedNews() {
    return this.request('/news/published');
  }

  async getNewsBySlug(slug: string) {
    return this.request(`/news/slug/${slug}`);
  }

  async getNewsById(id: string) {
    return this.request(`/news/${id}`);
  }

  async createNews(newsData: any) {
    return this.request('/news', {
      method: 'POST',
      body: JSON.stringify(newsData),
    });
  }

  async updateNews(id: string, newsData: any) {
    return this.request(`/news/${id}`, {
      method: 'PUT',
      body: JSON.stringify(newsData),
    });
  }

  async deleteNews(id: string) {
    return this.request(`/news/${id}`, {
      method: 'DELETE',
    });
  }

  async publishNews(id: string) {
    return this.request(`/news/${id}/publish`, {
      method: 'PUT',
    });
  }

  async updateNewsOrder(items: { id: string; order: number }[]) {
    return this.request('/news/order', {
      method: 'PUT',
      body: JSON.stringify({ items }),
    });
  }

  // Announcements endpoints
  async getAnnouncements(params?: { page?: number; limit?: number; search?: string; is_published?: boolean; priority?: string }) {
    const queryParams = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return this.request(`/announcements${queryParams}`);
  }

  async getActiveAnnouncements() {
    return this.request('/announcements/active');
  }

  async getPublishedAnnouncements() {
    return this.request('/announcements/published');
  }

  async getAnnouncementById(id: string) {
    return this.request(`/announcements/${id}`);
  }

  async createAnnouncement(announcementData: any) {
    return this.request('/announcements', {
      method: 'POST',
      body: JSON.stringify(announcementData),
    });
  }

  async updateAnnouncement(id: string, announcementData: any) {
    return this.request(`/announcements/${id}`, {
      method: 'PUT',
      body: JSON.stringify(announcementData),
    });
  }

  async deleteAnnouncement(id: string) {
    return this.request(`/announcements/${id}`, {
      method: 'DELETE',
    });
  }

  async updateAnnouncementOrder(items: { id: string; order: number }[]) {
    return this.request('/announcements/order', {
      method: 'PUT',
      body: JSON.stringify({ items }),
    });
  }

  // Mass Schedule endpoints
  async getMassSchedule(params?: { page?: number; limit?: number; search?: string; day_of_week?: number; is_active?: boolean }) {
    const queryParams = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return this.request(`/mass-schedule${queryParams}`);
  }

  async getActiveMassSchedule() {
    return this.request('/mass-schedule/active');
  }

  async getTodayMassSchedule() {
    return this.request('/mass-schedule/today');
  }

  async getMassScheduleById(id: string) {
    return this.request(`/mass-schedule/${id}`);
  }

  async createMassSchedule(massScheduleData: any) {
    return this.request('/mass-schedule', {
      method: 'POST',
      body: JSON.stringify(massScheduleData),
    });
  }

  async updateMassSchedule(id: string, massScheduleData: any) {
    return this.request(`/mass-schedule/${id}`, {
      method: 'PUT',
      body: JSON.stringify(massScheduleData),
    });
  }

  async deleteMassSchedule(id: string) {
    return this.request(`/mass-schedule/${id}`, {
      method: 'DELETE',
    });
  }

  // Birthdays endpoints
  async getBirthdays(params?: { page?: number; limit?: number; search?: string; month?: number; is_active?: boolean }) {
    const queryParams = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return this.request(`/birthdays${queryParams}`);
  }

  async getActiveBirthdays() {
    return this.request('/birthdays/active');
  }

  async getThisMonthBirthdays() {
    return this.request('/birthdays/this-month');
  }

  async getNextMonthBirthdays() {
    return this.request('/birthdays/next-month');
  }

  async getBirthdayById(id: string) {
    return this.request(`/birthdays/${id}`);
  }

  async createBirthday(birthdayData: any) {
    return this.request('/birthdays', {
      method: 'POST',
      body: JSON.stringify(birthdayData),
    });
  }

  async updateBirthday(id: string, birthdayData: any) {
    return this.request(`/birthdays/${id}`, {
      method: 'PUT',
      body: JSON.stringify(birthdayData),
    });
  }

  async deleteBirthday(id: string) {
    return this.request(`/birthdays/${id}`, {
      method: 'DELETE',
    });
  }

  // Dizimistas endpoints
  async getDizimistas(params?: { page?: number; limit?: number; search?: string; category?: string; is_active?: boolean }) {
    const queryParams = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return this.request(`/dizimistas${queryParams}`);
  }

  async getActiveDizimistas() {
    return this.request('/dizimistas/active');
  }

  async getDizimistaById(id: string) {
    return this.request(`/dizimistas/${id}`);
  }

  async createDizimista(dizimistaData: any) {
    return this.request('/dizimistas', {
      method: 'POST',
      body: JSON.stringify(dizimistaData),
    });
  }

  async updateDizimista(id: string, dizimistaData: any) {
    return this.request(`/dizimistas/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dizimistaData),
    });
  }

  async deleteDizimista(id: string) {
    return this.request(`/dizimistas/${id}`, {
      method: 'DELETE',
    });
  }

  // Parish Info endpoints
  async getParishInfo(params?: { page?: number; limit?: number; search?: string; type?: string; is_active?: boolean }) {
    const queryParams = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return this.request(`/parish-info${queryParams}`);
  }

  async getActiveParishInfo() {
    return this.request('/parish-info/active');
  }

  async getParishInfoByType(type: string) {
    return this.request(`/parish-info/type/${type}`);
  }

  async getParishInfoById(id: string) {
    return this.request(`/parish-info/${id}`);
  }

  async createParishInfo(parishInfoData: any) {
    return this.request('/parish-info', {
      method: 'POST',
      body: JSON.stringify(parishInfoData),
    });
  }

  async updateParishInfo(id: string, parishInfoData: any) {
    return this.request(`/parish-info/${id}`, {
      method: 'PUT',
      body: JSON.stringify(parishInfoData),
    });
  }

  async deleteParishInfo(id: string) {
    return this.request(`/parish-info/${id}`, {
      method: 'DELETE',
    });
  }

  async updateParishInfoOrder(items: { id: string; order: number }[]) {
    return this.request('/parish-info/order', {
      method: 'PUT',
      body: JSON.stringify({ items }),
    });
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

export const apiService = new ApiService();
export default apiService; 