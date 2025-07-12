import { useMassSchedule } from '../hooks/useMassSchedule';
import { formatTime } from '../utils/dateTime';

const MassScheduleSection = () => {
  const { massSchedules, loading, error } = useMassSchedule();

  const getDayColor = (dayOfWeek: number) => {
    if (dayOfWeek === null || dayOfWeek === undefined) {
      console.warn('day_of_week está vazio ou inválido:', dayOfWeek);
      return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
    }
    
    if (isNaN(dayOfWeek)) {
      console.warn('day_of_week não é um número válido:', dayOfWeek);
      return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
    }
    
    switch (dayOfWeek) {
      case 0: return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300'; // Domingo
      case 1: return 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300'; // Segunda
      case 2: return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300'; // Terça
      case 3: return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300'; // Quarta
      case 4: return 'bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300'; // Quinta
      case 5: return 'bg-pink-100 dark:bg-pink-900/20 text-pink-800 dark:text-pink-300'; // Sexta
      case 6: return 'bg-indigo-100 dark:bg-indigo-900/20 text-indigo-800 dark:text-indigo-300'; // Sábado
      default: 
        console.warn('day_of_week fora do range esperado (0-6):', dayOfWeek);
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
    }
  };

  const getDayName = (dayOfWeek: number) => {
    if (dayOfWeek === null || dayOfWeek === undefined) {
      console.warn('day_of_week está vazio ou inválido:', dayOfWeek);
      return 'Dia não definido';
    }
    
    if (isNaN(dayOfWeek)) {
      console.warn('day_of_week não é um número válido:', dayOfWeek);
      return 'Dia inválido';
    }
    
    switch (dayOfWeek) {
      case 0: return 'Domingo';
      case 1: return 'Segunda-feira';
      case 2: return 'Terça-feira';
      case 3: return 'Quarta-feira';
      case 4: return 'Quinta-feira';
      case 5: return 'Sexta-feira';
      case 6: return 'Sábado';
      default: 
        console.warn('day_of_week fora do range esperado (0-6):', dayOfWeek);
        return 'Dia inválido';
    }
  };

  // Função para agrupar horários por categoria
  const groupSchedules = () => {
    const weekSchedules = massSchedules
      .filter(schedule => schedule.day_of_week >= 1 && schedule.day_of_week <= 5)
      .sort((a, b) => {
        // Primeiro ordena por dia da semana (1=segunda, 2=terça, etc.)
        if (a.day_of_week !== b.day_of_week) {
          return a.day_of_week - b.day_of_week;
        }
        // Se for o mesmo dia, ordena por hora
        return a.time.localeCompare(b.time);
      });
    
    const saturdaySchedules = massSchedules
      .filter(schedule => schedule.day_of_week === 6)
      .sort((a, b) => a.time.localeCompare(b.time));
    
    const sundaySchedules = massSchedules
      .filter(schedule => schedule.day_of_week === 0)
      .sort((a, b) => a.time.localeCompare(b.time));
    
    return { weekSchedules, saturdaySchedules, sundaySchedules };
  };

  if (loading) {
    return (
      <section id="mass-schedule" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-church-blue mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Carregando horários de missa...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="mass-schedule" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 btn-primary"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      </section>
    );
  }

  const { weekSchedules, saturdaySchedules, sundaySchedules } = groupSchedules();

  return (
    <section id="mass-schedule" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title">Horários de Missa</h2>
          <p className="section-subtitle">
            Participe das celebrações eucarísticas da nossa paróquia
          </p>
        </div>

        {massSchedules.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">Nenhum horário de missa cadastrado.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Missas da Semana */}
            <div className="card">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                  Missas da Semana
                </h3>
                {weekSchedules.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-center">Nenhuma missa durante a semana</p>
                ) : (
                  <div className="space-y-4">
                    {weekSchedules.map((schedule) => (
                      <div key={schedule.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`px-2 py-1 rounded text-xs font-semibold ${getDayColor(schedule.day_of_week)}`}>
                            {getDayName(schedule.day_of_week)}
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-300">{schedule.description}</span>
                        </div>
                        <div className="text-lg font-bold text-church-blue dark:text-blue-400">
                          {formatTime(schedule.time)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Missas de Sábado */}
            <div className="card">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                  Missas de Sábado
                </h3>
                {saturdaySchedules.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-center">Nenhuma missa no sábado</p>
                ) : (
                  <div className="space-y-4">
                    {saturdaySchedules.map((schedule) => (
                      <div key={schedule.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`px-2 py-1 rounded text-xs font-semibold ${getDayColor(schedule.day_of_week)}`}>
                            {getDayName(schedule.day_of_week)}
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-300">{schedule.description}</span>
                        </div>
                        <div className="text-lg font-bold text-church-blue dark:text-blue-400">
                          {formatTime(schedule.time)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Missas de Domingo */}
            <div className="card">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                  Missas de Domingo
                </h3>
                {sundaySchedules.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-center">Nenhuma missa no domingo</p>
                ) : (
                  <div className="space-y-4">
                    {sundaySchedules.map((schedule) => (
                      <div key={schedule.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`px-2 py-1 rounded text-xs font-semibold ${getDayColor(schedule.day_of_week)}`}>
                            {getDayName(schedule.day_of_week)}
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-300">{schedule.description}</span>
                        </div>
                        <div className="text-lg font-bold text-church-blue dark:text-blue-400">
                          {formatTime(schedule.time)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default MassScheduleSection; 