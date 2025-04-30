import { Sequelize } from 'sequelize';

const isProduction = process.env.NODE_ENV === 'production';

let sequelize: Sequelize;

if (isProduction) {
    sequelize = new Sequelize(
        process.env.POSTGRES_DB!, // 'apartments_db'
        process.env.POSTGRES_USER!, // 'postgres'
        process.env.POSTGRES_PASSWORD!, // 'postgres'
        {
            host: process.env.POSTGRES_HOST || 'postgres', // 'postgres' refers to the container name in Docker Compose
            port: Number(process.env.POSTGRES_PORT) || 5432,
            dialect: 'postgres',
            logging: false,
        }
    );
} else {
    sequelize = new Sequelize(
        process.env.MYSQL_DB || 'real_estate',
        process.env.MYSQL_USER || 'root',
        process.env.MYSQL_PASSWORD || 'root',
        {
            host: process.env.MYSQL_HOST || 'localhost',
            port: Number(process.env.MYSQL_PORT) || 3306,
            dialect: 'mysql',
            logging: false,
        }
    );
}

export default sequelize;
