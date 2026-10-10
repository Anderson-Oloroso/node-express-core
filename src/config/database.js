import mysql from 'mysql2/promise';

let pool;

export async function connectDB() {
    try {
        pool = mysql.createPool({
            host: process.env.DB_HOST || 'mysql',
            port: Number(process.env.DB_PORT) || 3306,
            user: process.env.DB_USER || 'express_user',
            password: process.env.DB_PASSWORD || 'express_pass123',
            database: process.env.DB_NAME || 'express_core_db',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });

        // Verificar la conexión inicial
        const connection = await pool.getConnection();
        console.log(`🐬 Conectado exitosamente a MySQL: ${process.env.DB_HOST || 'mysql'}:${process.env.DB_PORT || 3306}/${process.env.DB_NAME || 'express_core_db'}`);
        connection.release();
        return pool;
    } catch (error) {
        console.error('❌ Error conectando a MySQL:', error.message);
    }
}

export { pool };
