// Função para formatar horários removendo segundos
export const formatTime = (time: string): string => {
  if (!time) return '';
  
  // Se já está no formato HH:MM, retorna como está
  if (/^\d{2}:\d{2}$/.test(time)) {
    return time;
  }
  
  // Se está no formato HH:MM:SS, remove os segundos
  if (/^\d{2}:\d{2}:\d{2}$/.test(time)) {
    return time.substring(0, 5);
  }
  
  return time;
};

// Função para formatar datas de forma segura
export const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return '-';
  
  try {
    const date = new Date(dateString);
    
    // Verificar se a data é válida
    if (isNaN(date.getTime())) {
      console.warn('Data inválida:', dateString);
      return '-';
    }
    
    return date.toLocaleDateString('pt-BR');
  } catch (error) {
    console.error('Erro ao formatar data:', dateString, error);
    return '-';
  }
};

// Função para formatar data e hora
export const formatDateTime = (dateString: string | null | undefined): string => {
  if (!dateString) return '-';
  
  try {
    const date = new Date(dateString);
    
    // Verificar se a data é válida
    if (isNaN(date.getTime())) {
      console.warn('Data inválida:', dateString);
      return '-';
    }
    
    return date.toLocaleString('pt-BR');
  } catch (error) {
    console.error('Erro ao formatar data/hora:', dateString, error);
    return '-';
  }
}; 