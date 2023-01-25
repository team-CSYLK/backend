require('dotenv').config();
const env = process.env;

const development = {
  username: env.DBUSERNAME,
  password: env.DBPASSWORD,
  database: env.DBNAME + '_dev',
  host: env.DBHOST,
  dialect: 'mysql'
};

const test = {
  username: env.DBUSERNAME,
  password: env.DBPASSWORD,
  database: env.DBNAME + '_test',
  host: env.DBHOST,
  dialect: 'mysql',
  logging: false,
};

const production = {
  username: env.DBUSERNAME,
  password: env.DBPASSWORD,
  database: env.DBNAME,
  host: env.DBHOST,
  dialect: 'mysql',
};

module.exports = { development, test, production };
