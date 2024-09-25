const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createUser = async (req, res) => {
    const { username, email, password, role, created_at, status  } = req.body;

    try {
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password,
                role,
                created_at,
                status
            },
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({error: "Erro ao criar usuário"});
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar usuários. "});
    }
}

module.exports = {
    createUser,
    getAllUsers
};