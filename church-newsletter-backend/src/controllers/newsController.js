const createCrudController = require('./crudController');
const { News, User } = require('../models');

const crudController = createCrudController(News, {
  include: [
    { model: User, as: 'author', attributes: ['id', 'name', 'email'] }
  ],
  orderBy: [['order', 'ASC'], ['created_at', 'DESC']],
  searchFields: ['title', 'content', 'excerpt']
});

// Sobrescrever getAll para filtrar apenas notícias publicadas quando necessário
const getAll = async (req, res) => {
  try {
    const { published = false, page = 1, limit = 10, search } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = {};
    
    // Filtrar apenas publicadas se solicitado
    if (published === 'true') {
      whereClause.is_published = true;
      whereClause.published_at = {
        [News.sequelize.Op.lte]: new Date()
      };
    }

    // Aplicar busca
    if (search) {
      whereClause[News.sequelize.Op.or] = [
        { title: { [News.sequelize.Op.iLike]: `%${search}%` } },
        { content: { [News.sequelize.Op.iLike]: `%${search}%` } },
        { excerpt: { [News.sequelize.Op.iLike]: `%${search}%` } }
      ];
    }

    const { count, rows } = await News.findAndCountAll({
      where: whereClause,
      include: [
        { model: User, as: 'author', attributes: ['id', 'name'] }
      ],
      order: [['order_index', 'ASC'], ['created_at', 'DESC']],
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
    console.error('Erro ao buscar notícias:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

const getBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    
    const news = await News.findOne({
      where: { 
        slug,
        is_published: true,
        published_at: {
          [News.sequelize.Op.lte]: new Date()
        }
      },
      include: [
        { model: User, as: 'author', attributes: ['id', 'name'] }
      ]
    });

    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'Notícia não encontrada'
      });
    }

    res.json({
      success: true,
      data: news
    });
  } catch (error) {
    console.error('Erro ao buscar notícia por slug:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

const publish = async (req, res) => {
  try {
    const { id } = req.params;
    const { is_published } = req.body;

    const news = await News.findByPk(id);
    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'Notícia não encontrada'
      });
    }

    const updateData = { is_published };
    if (is_published && !news.published_at) {
      updateData.published_at = new Date();
    }

    await news.update(updateData);

    res.json({
      success: true,
      message: `Notícia ${is_published ? 'publicada' : 'despublicada'} com sucesso`,
      data: news
    });
  } catch (error) {
    console.error('Erro ao publicar/despublicar notícia:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

module.exports = {
  ...crudController,
  getAll,
  getBySlug,
  publish
}; 