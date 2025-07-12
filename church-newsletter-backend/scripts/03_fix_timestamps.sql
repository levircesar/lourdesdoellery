-- Corrige nomes de colunas de datas para padrão snake_case
ALTER TABLE users RENAME COLUMN "createdAt" TO "created_at";
ALTER TABLE users RENAME COLUMN "updatedAt" TO "updated_at";
ALTER TABLE news RENAME COLUMN "createdAt" TO "created_at";
ALTER TABLE news RENAME COLUMN "updatedAt" TO "updated_at";
ALTER TABLE announcements RENAME COLUMN "createdAt" TO "created_at";
ALTER TABLE announcements RENAME COLUMN "updatedAt" TO "updated_at";
ALTER TABLE mass_schedules RENAME COLUMN "createdAt" TO "created_at";
ALTER TABLE mass_schedules RENAME COLUMN "updatedAt" TO "updated_at";
ALTER TABLE birthdays RENAME COLUMN "createdAt" TO "created_at";
ALTER TABLE birthdays RENAME COLUMN "updatedAt" TO "updated_at";
ALTER TABLE parish_info RENAME COLUMN "createdAt" TO "created_at";
ALTER TABLE parish_info RENAME COLUMN "updatedAt" TO "updated_at";
ALTER TABLE dizimistas RENAME COLUMN "createdAt" TO "created_at";
ALTER TABLE dizimistas RENAME COLUMN "updatedAt" TO "updated_at"; 