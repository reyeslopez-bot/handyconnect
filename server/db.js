import { Pool } from 'pg';

const pool = new Pool({
    user: 'yourUsername',
    host: 'localhost',
    database: 'yourDatabaseName',
    password: 'yourPassword',
    port: 5432,
});

export default pool;
