import mongoose from 'mongoose';

export async function connectDB() {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            throw new Error('La variable MONGO_URI no está definida en el entorno.');
        }

        const conn = await mongoose.connect(uri);
        console.log(`🍃 Conectado exitosamente a MongoDB: ${conn.connection.host}/${conn.connection.name}`);
    } catch (error) {
        console.error('❌ Error conectando a MongoDB:', error.message);
        // No terminamos el proceso inmediatamente para permitir que el servidor exponga rutas de error si la DB tarda en arrancar
    }
}
