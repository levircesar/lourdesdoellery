const Projects = () => {
  const projects = [
    {
      title: "E-commerce Platform",
      description: "Plataforma de e-commerce com mais de 1M de usuários ativos. Implementamos testes automatizados que reduziram bugs em produção em 85%.",
      technologies: ["React", "Node.js", "PostgreSQL", "Jest", "Cypress"],
      image: "🛒",
      category: "E-commerce",
      results: ["85% redução de bugs", "99.9% uptime", "50% redução no tempo de deploy"]
    },
    {
      title: "Fintech Mobile App",
      description: "Aplicativo mobile para serviços financeiros com foco em segurança e performance. Realizamos testes de segurança e performance abrangentes.",
      technologies: ["React Native", "Firebase", "Stripe", "Detox", "Appium"],
      image: "💳",
      category: "Fintech",
      results: ["Zero vulnerabilidades críticas", "99.5% performance score", "1M+ downloads"]
    },
    {
      title: "Healthcare Management System",
      description: "Sistema de gestão hospitalar com foco em compliance e segurança de dados. Implementamos testes de conformidade e auditoria completa.",
      technologies: ["Angular", "Java", "Oracle", "Selenium", "JMeter"],
      image: "🏥",
      category: "Healthcare",
      results: ["100% compliance", "HIPAA certified", "24/7 monitoring"]
    },
    {
      title: "EdTech Learning Platform",
      description: "Plataforma de educação online com recursos interativos. Otimizamos performance e experiência do usuário através de testes abrangentes.",
      technologies: ["Vue.js", "Python", "MongoDB", "Playwright", "Lighthouse"],
      image: "📚",
      category: "Education",
      results: ["90% user satisfaction", "40% improvement in load time", "500K+ students"]
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Projetos em Destaque
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Conheça alguns dos projetos onde nossa expertise em qualidade fez a diferença
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{project.image}</div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    {project.category}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{project.title}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">{project.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-slate-900 mb-3">Tecnologias Utilizadas:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Resultados Alcançados:</h4>
                  <ul className="space-y-2">
                    {project.results.map((result, resultIndex) => (
                      <li key={resultIndex} className="flex items-center text-sm text-slate-600">
                        <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Quer um projeto similar?
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects; 