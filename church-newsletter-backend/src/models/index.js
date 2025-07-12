const User = require('./User');
const News = require('./News');
const Announcement = require('./Announcement');
const MassSchedule = require('./MassSchedule');
const Birthday = require('./Birthday');
const Dizimista = require('./Dizimista');
const ParishInfo = require('./ParishInfo');
const MassIntention = require('./MassIntention');

// Definir relacionamentos
User.hasMany(News, { foreignKey: 'created_by', as: 'news' });
News.belongsTo(User, { foreignKey: 'created_by', as: 'author' });

User.hasMany(Announcement, { foreignKey: 'created_by', as: 'announcements' });
Announcement.belongsTo(User, { foreignKey: 'created_by', as: 'author' });

User.hasMany(MassIntention, { foreignKey: 'created_by', as: 'massIntentions' });
MassIntention.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });

module.exports = {
  User,
  News,
  Announcement,
  MassSchedule,
  Birthday,
  Dizimista,
  ParishInfo,
  MassIntention
}; 