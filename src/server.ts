import express from 'express';
import { generateToken, verifyToken } from './middlewares/authMiddleware';

const app = express();
const port = 8080;

// rota pública - home
app.get('/api/home', (req, res) => {
    return res.status(200).json({ message: 'home da JWT.' });
})

// rota privada - settings
app.get('/api/settings', verifyToken, (req, res) => {
    return res.status(200).json({ message: 'settings da home.' });
})

// Rota para gerar um token manualmente
app.get('/api/generate-token', (req, res) => {
    // Dados falsos para testes
    const testUser = {
        email: 'teste@email.com',
        role: 'ADMIN'
    };

    // Gera o token
    const token = generateToken(testUser);

    return res.status(200).json({ token });
});


app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})
