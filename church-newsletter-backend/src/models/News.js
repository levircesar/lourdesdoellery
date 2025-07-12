const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const slugify = require('slugify');

const News = sequelize.define('News', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [3, 200]
    }
  },
  slug: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  excerpt: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  is_published: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  published_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  order_index: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  created_by: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  tableName: 'news',
  hooks: {
    beforeCreate: (news) => {
      if (news.title && !news.slug) {
        const now = new Date();
        const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD
        const titleSlug = slugify(news.title, { 
          lower: true, 
          strict: true,
          locale: 'pt'
        });
        news.slug = `${dateStr}-${titleSlug}`;
      }
    },
    beforeUpdate: (news) => {
      if (news.changed('title') && !news.changed('slug')) {
        const now = new Date();
        const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD
        const titleSlug = slugify(news.title, { 
          lower: true, 
          strict: true,
          locale: 'pt'
        });
        news.slug = `${dateStr}-${titleSlug}`;
      }
    }
  }
});

module.exports = News; 