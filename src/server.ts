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

    const user = (req as any).user;
    console.log(user);
    
    
    if(user.role == 'USER'){
        return res.status(401).json({ message: 'você não pode ter acesso.' })
    }

    return res.status(200).json({ message: 'settings da home.' });
})

app.get('/api/gerar-token', (req, res) => {
    const userTest = {
        email: 'bruce@email.com',
        role: 'USER'
    };

    // Gera o token
    const token = generateToken(userTest);

    return res.status(200).json({ token });
});


app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})
