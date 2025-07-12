-- Script para corrigir as constraints da tabela mass_intentions
-- Execute este script se houver problemas com constraints

-- Verificar se a tabela existe
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'mass_intentions') THEN
        -- Remover constraints antigas se existirem
        ALTER TABLE mass_intentions DROP CONSTRAINT IF EXISTS mass_intentions_person_name_check;
        ALTER TABLE mass_intentions DROP CONSTRAINT IF EXISTS mass_intentions_requested_by_check;
        ALTER TABLE mass_intentions DROP CONSTRAINT IF EXISTS mass_intentions_mass_time_check;
        ALTER TABLE mass_intentions DROP CONSTRAINT IF EXISTS mass_intentions_recurring_frequency_check;
        
        -- Remover colunas antigas se existirem
        ALTER TABLE mass_intentions DROP COLUMN IF EXISTS person_name;
        ALTER TABLE mass_intentions DROP COLUMN IF EXISTS requested_by;
        ALTER TABLE mass_intentions DROP COLUMN IF EXISTS phone;
        ALTER TABLE mass_intentions DROP COLUMN IF EXISTS email;
        ALTER TABLE mass_intentions DROP COLUMN IF EXISTS mass_date;
        ALTER TABLE mass_intentions DROP COLUMN IF EXISTS mass_time;
        ALTER TABLE mass_intentions DROP COLUMN IF EXISTS recurring_frequency;
        ALTER TABLE mass_intentions DROP COLUMN IF EXISTS is_active;
        
        -- Garantir que as colunas corretas existem
        ALTER TABLE mass_intentions ADD COLUMN IF NOT EXISTS intention_type VARCHAR(20);
        ALTER TABLE mass_intentions ADD COLUMN IF NOT EXISTS notes TEXT;
        ALTER TABLE mass_intentions ADD COLUMN IF NOT EXISTS is_recurring BOOLEAN DEFAULT false;
        ALTER TABLE mass_intentions ADD COLUMN IF NOT EXISTS created_by UUID;
        ALTER TABLE mass_intentions ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;
        ALTER TABLE mass_intentions ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;
        
        -- Adicionar constraints corretas
        ALTER TABLE mass_intentions ADD CONSTRAINT IF NOT EXISTS mass_intentions_intention_type_check 
            CHECK (intention_type IN ('thanksgiving', 'deceased'));
        
        -- Tornar notes NOT NULL se não for
        ALTER TABLE mass_intentions ALTER COLUMN notes SET NOT NULL;
        
        -- Adicionar foreign key se não existir
        ALTER TABLE mass_intentions ADD CONSTRAINT IF NOT EXISTS mass_intentions_created_by_fkey 
            FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL;
        
        RAISE NOTICE 'Tabela mass_intentions corrigida com sucesso';
    ELSE
        RAISE NOTICE 'Tabela mass_intentions não existe';
    END IF;
END $$;

-- Verificar estrutura atual
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'mass_intentions' 
ORDER BY ordinal_position; 