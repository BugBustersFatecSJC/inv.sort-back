const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { hashSync, compareSync } = require('bcrypt');

const createUser = async (req, res) => {
    const { username, email, password, role, status } = req.body;

    try {

        const existingUser = await prisma.user.findUnique({
            where: { email: email },
        })

        if (existingUser) {
            return res.status(400).json({ error: "E-mail já está em uso." });
        }

        if (!password) {
            return res.status(400).json({ error: "Senha é obrigatória." });
        }

        const hashedPassword = hashSync(password, 10);

        let user = await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword,
                role: role,
                status: status,
            },
        });

        
        const { password: _, ...userWithoutPassword } = user; 
        return res.status(201).json(userWithoutPassword);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Erro ao criar usuário." });
    }
};



const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();

        if (!users) {
            return res.status(500).json({ error: true, message: 'Não há usuários registrados.' });
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Erro inesperado.' });
    }
};


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
   
        const user = await prisma.user.findUnique({
            where: { email: email },
        });

        if (!user) {
            return res.status(401).json({ error: "E-mail ou senha inválidos." });
        }

       
        const isPasswordValid = compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "E-mail ou senha inválidos." });
        }

        const { password: _, ...userWithoutPassword } = user;
        return res.status(200).json(userWithoutPassword);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao fazer login." });
    }
};


module.exports = {
    createUser,
    getAllUsers,
    loginUser, 
};


