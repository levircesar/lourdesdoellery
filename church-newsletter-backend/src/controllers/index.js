const authController = require('./authController');
const newsController = require('./newsController');
const createCrudController = require('./crudController');
const { 
  News, 
  Announcement, 
  MassSchedule, 
  Birthday, 
  Dizimista, 
  ParishInfo,
  User 
} = require('../models');

// Controllers CRUD específicos para cada entidade
const announcementController = createCrudController(Announcement, {
  include: [{ model: User, as: 'author', attributes: ['id', 'name', 'email'] }],
  searchFields: ['title', 'content'],
  filterFields: { is_published: true, created_by: true }
});

const massScheduleController = createCrudController(MassSchedule, {
  orderBy: [['day_of_week', 'ASC'], ['time', 'ASC']],
  searchFields: ['description'],
  filterFields: { day_of_week: true, is_active: true }
});

const birthdayController = createCrudController(Birthday, {
  orderBy: [['birth_date', 'ASC']],
  searchFields: ['name'],
  filterFields: { is_active: true }
});

const dizimistaController = createCrudController(Dizimista, {
  searchFields: ['name', 'email', 'phone'],
  filterFields: { is_active: true, category: true }
});

const parishInfoController = createCrudController(ParishInfo, {
  orderBy: [['created_at', 'DESC']],
  searchFields: ['title', 'content']
});

module.exports = {
  authController,
  newsController,
  announcementController,
  massScheduleController,
  birthdayController,
  dizimistaController,
  parishInfoController
}; 