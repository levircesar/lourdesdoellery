export interface News {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  slug: string;
  is_published: boolean;
  published_at?: string;
  expires_at?: string;
  created_by?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  author?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  week_start: string;
  week_end: string;
  is_published: boolean;
  published_at?: string;
  expires_at?: string;
  is_active: boolean;
  created_by?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  author?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface MassSchedule {
  id: string;
  day_of_week: number;
  time: string;
  description?: string;
  is_active: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Birthday {
  id: string;
  name: string;
  birth_date: string;
  age?: number;
  is_active: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface ParishInfo {
  id: string;
  section: string;
  title: string;
  content: string;
  image_url?: string;
  is_active: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'user';
  is_active: boolean;
  last_login?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Dizimista {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  is_active: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

// Form data interfaces for creating/updating
export interface NewsFormData {
  title: string;
  content: string;
  excerpt?: string;
  is_published?: boolean;
}

export interface AnnouncementFormData {
  title: string;
  content: string;
  week_start: string;
  week_end: string;
  is_active?: boolean;
}

export interface MassScheduleFormData {
  day_of_week: number;
  time: string;
  description?: string;
  is_active?: boolean;
}

export interface BirthdayFormData {
  name: string;
  birth_date: string;
  is_active?: boolean;
}

export interface DizimistaFormData {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  is_active?: boolean;
}

export interface ParishInfoFormData {
  section: string;
  title: string;
  content: string;
  image_url?: string;
  is_active?: boolean;
} 