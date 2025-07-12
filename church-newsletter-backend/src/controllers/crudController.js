const createCrudController = (Model, options = {}) => {
  const {
    include = [],
    orderBy = [['created_at', 'DESC']],
    searchFields = [],
    filterFields = {}
  } = options;
  const { Op } = require('sequelize');

  const getAll = async (req, res) => {
    try {
      const { page = 1, limit = 10, search, ...filters } = req.query;
      const offset = (page - 1) * limit;

      let whereClause = {};
      
      // Aplicar filtros
      Object.keys(filters).forEach(key => {
        if (filterFields[key] && filters[key] !== '') {
          whereClause[key] = filters[key];
        }
      });

      // Filtros especiais
      if (req.path.includes('/active') && Model.rawAttributes.expires_at) {
        whereClause.expires_at = {
          [Op.or]: [
            { [Op.gte]: new Date() },
            { [Op.is]: null }
          ]
        };
      }

      // Filtro por mês para aniversariantes
      if (filters.month && Model.rawAttributes.birth_date) {
        const monthCondition = Model.sequelize.where(
          Model.sequelize.fn('EXTRACT', Model.sequelize.literal('MONTH FROM birth_date')),
          parseInt(filters.month)
        );
        
        if (whereClause[Op.and]) {
          whereClause[Op.and].push(monthCondition);
        } else {
          whereClause[Op.and] = [monthCondition];
        }
      }

      // Aplicar busca
      if (search && searchFields.length > 0) {
        const searchConditions = searchFields.map(field => ({
          [field]: {
            [Op.iLike]: `%${search}%`
          }
        }));
        whereClause[Op.or] = searchConditions;
      }

      const { count, rows } = await Model.findAndCountAll({
        where: whereClause,
        include,
        order: orderBy,
        limit: parseInt(limit),
        offset: parseInt(offset)
      });

      res.json({
        success: true,
        data: rows,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: count,
          pages: Math.ceil(count / limit)
        }
      });
    } catch (error) {
      console.error(`Erro ao buscar ${Model.name}:`, error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  };

  const getById = async (req, res) => {
    try {
      const { id } = req.params;
      const item = await Model.findByPk(id, { include });

      if (!item) {
        return res.status(404).json({
          success: false,
          message: `${Model.name} não encontrado`
        });
      }

      res.json({
        success: true,
        data: item
      });
    } catch (error) {
      console.error(`Erro ao buscar ${Model.name}:`, error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  };

  const create = async (req, res) => {
    try {
      const data = req.body;
      
      // Validação específica para MassSchedule - garantir que day_of_week seja número
      if (Model.name === 'MassSchedule' && data.day_of_week !== undefined) {
        data.day_of_week = parseInt(data.day_of_week);
        if (isNaN(data.day_of_week) || data.day_of_week < 0 || data.day_of_week > 6) {
          return res.status(400).json({
            success: false,
            message: 'day_of_week deve ser um número entre 0 e 6'
          });
        }
      }
      
      // Adicionar created_by se o modelo suportar
      if (Model.rawAttributes.created_by && req.user) {
        data.created_by = req.user.id;
      }

      const item = await Model.create(data);
      
      // Recarregar com includes se necessário
      if (include.length > 0) {
        await item.reload({ include });
      }

      res.status(201).json({
        success: true,
        message: `${Model.name} criado com sucesso`,
        data: item
      });
    } catch (error) {
      console.error(`Erro ao criar ${Model.name}:`, error);
      
      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({
          success: false,
          message: 'Dados inválidos',
          errors: error.errors.map(err => ({
            field: err.path,
            message: err.message
          }))
        });
      }

      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  };

  const update = async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;

      // Validação específica para MassSchedule - garantir que day_of_week seja número
      if (Model.name === 'MassSchedule' && data.day_of_week !== undefined) {
        data.day_of_week = parseInt(data.day_of_week);
        if (isNaN(data.day_of_week) || data.day_of_week < 0 || data.day_of_week > 6) {
          return res.status(400).json({
            success: false,
            message: 'day_of_week deve ser um número entre 0 e 6'
          });
        }
      }

      const item = await Model.findByPk(id);
      if (!item) {
        return res.status(404).json({
          success: false,
          message: `${Model.name} não encontrado`
        });
      }

      await item.update(data);
      
      // Recarregar com includes se necessário
      if (include.length > 0) {
        await item.reload({ include });
      }

      res.json({
        success: true,
        message: `${Model.name} atualizado com sucesso`,
        data: item
      });
    } catch (error) {
      console.error(`Erro ao atualizar ${Model.name}:`, error);
      
      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({
          success: false,
          message: 'Dados inválidos',
          errors: error.errors.map(err => ({
            field: err.path,
            message: err.message
          }))
        });
      }

      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  };

  const remove = async (req, res) => {
    try {
      const { id } = req.params;
      const item = await Model.findByPk(id);

      if (!item) {
        return res.status(404).json({
          success: false,
          message: `${Model.name} não encontrado`
        });
      }

      await item.destroy();

      res.json({
        success: true,
        message: `${Model.name} removido com sucesso`
      });
    } catch (error) {
      console.error(`Erro ao remover ${Model.name}:`, error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  };

  const updateOrder = async (req, res) => {
    try {
      const { items } = req.body; // Array de { id, order }

      if (!Array.isArray(items)) {
        return res.status(400).json({
          success: false,
          message: 'Dados inválidos para reordenação'
        });
      }

      // Atualizar ordem em lote
      await Promise.all(
        items.map(({ id, order }) => 
          Model.update({ order }, { where: { id } })
        )
      );

      res.json({
        success: true,
        message: 'Ordem atualizada com sucesso'
      });
    } catch (error) {
      console.error(`Erro ao atualizar ordem de ${Model.name}:`, error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  };

  // Método para gerar relatório de impressão
  const generatePrintReport = async (req, res) => {
    try {
      const items = await Model.findAll({
        where: { is_active: true },
        include,
        order: orderBy
      });

      res.json({
        success: true,
        data: {
          title: getPrintTitle(),
          parish: 'Paróquia Nossa Senhora de Lourdes',
          generatedAt: new Date().toLocaleString('pt-BR'),
          total: items.length,
          items: items
        }
      });
    } catch (error) {
      console.error(`Erro ao gerar relatório de ${Model.name}:`, error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  };

  // Função auxiliar para obter título do relatório
  const getPrintTitle = () => {
    switch (Model.name) {
      case 'Announcement':
        return 'Relatório de Avisos';
      case 'MassSchedule':
        return 'Horários de Missa';
      default:
        return `Relatório de ${Model.name}`;
    }
  };

  return {
    getAll,
    getById,
    create,
    update,
    remove,
    updateOrder,
    generatePrintReport
  };
};

module.exports = createCrudController; 