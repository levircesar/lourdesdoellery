const { MassIntention, User } = require('../models');
const { Op } = require('sequelize');

// Buscar todas as intenções com filtros
const getAll = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search, 
      filter_type,
      filter_recurring
    } = req.query;
    
    const offset = (page - 1) * limit;
    let whereClause = {};

    // Filtro por tipo de intenção
    console.log('Filtro de tipo recebido:', filter_type);
    if (filter_type && ['thanksgiving', 'deceased'].includes(filter_type)) {
      whereClause.intention_type = filter_type;
      console.log('Filtro aplicado:', whereClause.intention_type);
    }

    // Filtro por intenções recorrentes
    if (filter_recurring === 'true') {
      whereClause.is_recurring = true;
    } else if (filter_recurring === 'false') {
      whereClause.is_recurring = false;
    }

    // Busca por texto
    if (search) {
      whereClause[Op.or] = [
        { notes: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const { count, rows } = await MassIntention.findAndCountAll({
      where: whereClause,
      include: [{ model: User, as: 'creator', attributes: ['id', 'name', 'email'] }],
      order: [['created_at', 'DESC']],
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
    console.error('Erro ao buscar intenções de missa:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

// Buscar intenção por ID
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const intention = await MassIntention.findByPk(id, {
      include: [{ model: User, as: 'creator', attributes: ['id', 'name', 'email'] }]
    });

    if (!intention) {
      return res.status(404).json({
        success: false,
        message: 'Intenção de missa não encontrada'
      });
    }

    res.json({
      success: true,
      data: intention
    });
  } catch (error) {
    console.error('Erro ao buscar intenção de missa:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

// Criar nova intenção
const create = async (req, res) => {
  try {
    const data = req.body;
    
    // Adicionar created_by
    data.created_by = req.user.id;

    const intention = await MassIntention.create(data);
    
    // Recarregar com includes
    await intention.reload({
      include: [{ model: User, as: 'creator', attributes: ['id', 'name', 'email'] }]
    });

    res.status(201).json({
      success: true,
      message: 'Intenção de missa criada com sucesso',
      data: intention
    });
  } catch (error) {
    console.error('Erro ao criar intenção de missa:', error);
    
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

// Atualizar intenção
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const intention = await MassIntention.findByPk(id);
    if (!intention) {
      return res.status(404).json({
        success: false,
        message: 'Intenção de missa não encontrada'
      });
    }

    await intention.update(data);
    
    // Recarregar com includes
    await intention.reload({
      include: [{ model: User, as: 'creator', attributes: ['id', 'name', 'email'] }]
    });

    res.json({
      success: true,
      message: 'Intenção de missa atualizada com sucesso',
      data: intention
    });
  } catch (error) {
    console.error('Erro ao atualizar intenção de missa:', error);
    
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

// Excluir intenção
const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const intention = await MassIntention.findByPk(id);
    if (!intention) {
      return res.status(404).json({
        success: false,
        message: 'Intenção de missa não encontrada'
      });
    }

    await intention.destroy();

    res.json({
      success: true,
      message: 'Intenção de missa excluída com sucesso'
    });
  } catch (error) {
    console.error('Erro ao excluir intenção de missa:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

// Excluir todas as intenções não recorrentes
const deleteAllNonRecurring = async (req, res) => {
  try {
    const deletedCount = await MassIntention.destroy({
      where: {
        is_recurring: false
      }
    });

    res.json({
      success: true,
      message: `${deletedCount} intenções não recorrentes foram excluídas`,
      deletedCount
    });
  } catch (error) {
    console.error('Erro ao excluir intenções não recorrentes:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

// Gerar relatório para impressão
const generatePrintReport = async (req, res) => {
  try {
    const { filter_type, filter_recurring } = req.query;
    
    let whereClause = {};

    // Aplicar filtros
    if (filter_type && ['thanksgiving', 'deceased'].includes(filter_type)) {
      whereClause.intention_type = filter_type;
    }

    if (filter_recurring === 'true') {
      whereClause.is_recurring = true;
    } else if (filter_recurring === 'false') {
      whereClause.is_recurring = false;
    }

    const intentions = await MassIntention.findAll({
      where: whereClause,
      include: [{ model: User, as: 'creator', attributes: ['name'] }],
      order: [['intention_type', 'ASC'], ['created_at', 'DESC']]
    });

    // Agrupar por tipo de intenção
    const groupedByType = intentions.reduce((acc, intention) => {
      const type = intention.intention_type === 'thanksgiving' ? 'Ação de Graças' : 'Falecidos';
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push({
        id: intention.id,
        notes: intention.notes,
        is_recurring: intention.is_recurring
      });
      return acc;
    }, {});

    res.json({
      success: true,
      data: {
        title: 'Relatório de Intenções de Missa',
        parish: 'Paróquia Nossa Senhora de Lourdes',
        generatedAt: new Date().toLocaleString('pt-BR'),
        total: intentions.length,
        groupedByType: groupedByType
      }
    });
  } catch (error) {
    console.error('Erro ao gerar relatório:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  deleteAllNonRecurring,
  generatePrintReport
}; 