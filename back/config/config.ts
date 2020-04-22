import * as dotenv from 'dotenv';
dotenv.config();

interface Config {
  username: string,
  password: string,
  database: string,
  host: string,
  [prop: string]: string,
}
interface IGroupConfig {
  development: Config,
  test: Config,
  production: Config,
}

const config: IGroupConfig = {
  "development": {
    "username": "root",
    "password": process.env.DB_PASSWORD!,
    "database": "react_nsworld",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": "false"
  },
  "test": {
    "username": "root",
    "password": process.env.DB_PASSWORD!,
    "database": "react_nsworld",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": "false"
  },
  "production": {
    "username": "root",
    "password": process.env.DB_PASSWORD!,
    "database": "react_nsworld",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": "false"
  }
}

export default config;
