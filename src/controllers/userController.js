const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { hashSync, compareSync } = require('bcrypt');

// Registra dados do usuário
const createUser = async (req, res) => {
    const { username, email, password, role, status } = req.body;

    try {

        // Verifica se o e-mail já está em uso
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

        // Criação um novo usuário com a senha hasheada
        let user = await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword,
                role: role,
                status: status,
            },
        });

        // Retorne o usuário criado com a senha hasheada
        const { password: _, ...userWithoutPassword } = user; // Remove a senha da resposta
        return res.status(201).json(userWithoutPassword);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Erro ao criar usuário." });
    }
};


// Retorna todos os usuários
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

// Função para autenticar um usuário (login)
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verifica se o usuário existe
        const user = await prisma.user.findUnique({
            where: { email: email },
        });

        if (!user) {
            return res.status(401).json({ error: "E-mail ou senha inválidos." });
        }

        // Compara a senha fornecida com a senha hasheada no banco de dados
        const isPasswordValid = compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "E-mail ou senha inválidos." });
        }

        // Retorne o usuário, sem a senha
        const { password: _, ...userWithoutPassword } = user; // Remove a senha da resposta
        return res.status(200).json(userWithoutPassword);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao fazer login." });
    }
};


module.exports = {
    createUser,
    getAllUsers,
    loginUser, // Adicione esta linha
};

