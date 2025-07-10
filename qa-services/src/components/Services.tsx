const Services = () => {
  const services = [
    {
      icon: "🧪",
      title: "Testes Automatizados",
      description: "Implementação de testes automatizados para garantir robustez e agilidade no desenvolvimento.",
      features: ["Testes Unitários", "Testes de Integração", "Testes E2E", "CI/CD Integration"]
    },
    {
      icon: "🔍",
      title: "Auditoria de Qualidade",
      description: "Análise detalhada de processos, código e entregas para elevar o padrão de qualidade.",
      features: ["Code Review", "Process Analysis", "Quality Metrics", "Best Practices"]
    },
    {
      icon: "🤝",
      title: "Consultoria Especializada",
      description: "Apoio estratégico para times de desenvolvimento e QA, focado em resultados.",
      features: ["Team Training", "Process Optimization", "Tool Selection", "Strategy Planning"]
    },
    {
      icon: "📊",
      title: "Análise de Performance",
      description: "Otimização de performance e identificação de gargalos em aplicações.",
      features: ["Load Testing", "Stress Testing", "Performance Monitoring", "Optimization"]
    },
    {
      icon: "🛡️",
      title: "Testes de Segurança",
      description: "Identificação e correção de vulnerabilidades de segurança em aplicações.",
      features: ["Penetration Testing", "Security Audits", "Vulnerability Assessment", "Compliance"]
    },
    {
      icon: "📱",
      title: "Testes Mobile",
      description: "Testes especializados para aplicações móveis em diferentes plataformas.",
      features: ["iOS Testing", "Android Testing", "Cross-platform", "Device Testing"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Nossos Serviços
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Oferecemos soluções completas em qualidade de software para impulsionar o sucesso do seu projeto
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{service.title}</h3>
              <p className="text-slate-600 mb-6">{service.description}</p>
              
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-slate-600">
                    <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services; 