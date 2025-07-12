import { useBirthdays } from '../hooks/useBirthdays';
import { Birthday } from '../types';

const BirthdaysSection = () => {
  const { birthdays, loading, error } = useBirthdays();
  
  // Mostrar apenas os 8 aniversariantes mais próximos
  const recentBirthdays = birthdays.slice(0, 8);

  const getAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  const getMonthName = (date: string) => {
    const months = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return months[new Date(date).getMonth()];
  };

  if (loading) {
    return (
      <section id="birthdays" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-church-blue mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Carregando aniversariantes...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="birthdays" className="py-20 bg-gray-50 dark:bg-gray-800">
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

  return (
    <section id="birthdays" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title">Aniversariantes do Mês</h2>
          <p className="section-subtitle">
            Celebre conosco os aniversários dos membros da nossa comunidade
          </p>
        </div>

        {recentBirthdays.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">Nenhum aniversariante este mês.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentBirthdays.map((birthday: Birthday) => (
              <div key={birthday.id} className="card text-center">
                <div className="p-6">
                  <div className="w-16 h-16 bg-church-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">🎂</span>
                  </div>
                  
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {birthday.name}
                  </h4>
                  
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    <div>{new Date(birthday.birth_date).getDate()} de {getMonthName(birthday.birth_date)}</div>
                    <div className="font-semibold text-church-blue dark:text-blue-400">{getAge(birthday.birth_date)} anos</div>
                  </div>
                  
                </div>
              </div>
            ))}
          </div>
        )}

        {birthdays.length > 8 && (
          <div className="text-center mt-12">
            <button className="btn-primary">
              Ver todos os aniversariantes
            </button>
          </div>
        )}

        <div className="text-center mt-12">
          <div className="bg-church-blue/10 dark:bg-blue-900/20 rounded-lg p-6 max-w-2xl mx-auto">
            <h4 className="text-lg font-semibold text-church-blue dark:text-blue-400 mb-2">
              🎉 Celebre Conosco!
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              Desejamos a todos os aniversariantes muitas bênçãos e felicidades. 
              Que Deus continue abençoando cada um de vocês e suas famílias.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BirthdaysSection; 