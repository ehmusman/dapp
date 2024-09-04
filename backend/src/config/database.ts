import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DATABASE_URL! || 'postgres://postgres:postgres@localhost:5556/postgres', {
  dialect: 'postgres',
  logging: false,
});

export default sequelize;
