const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { hashSync, compareSync } = require('bcrypt');

// Registra dados do usuário
const createUser = async (req, res) => {
    const { username, email, password, role, status } = req.body
    const userImage = req.file ? `/uploads/${req.file.filename}` : null

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
                user_img: userImage
            },
        });

        // Retorne o usuário criado com a senha hasheada
        const { password: _, ...userWithoutPassword } = user; // Remove a senha da resposta
        return res.status(201).json(userWithoutPassword);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: `Erro ao criar usuário. ${error}` });
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

const checkFirstLogin = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        console.log("Quantidade de usuários encontrados:", users.length);

        // Fornece uma informação clara sobre a situação dos usuários
        if (users.length === 0) {
            return res.json({ needsRegistration: true }); // Indica ao front-end que o registro é necessário
        }

        return res.json({ needsRegistration: false }); // Indica ao front-end que pode fazer login
    } catch (error) {
        console.error("Erro ao verificar usuários:", error);
        return res.status(500).json({ error: "Erro ao verificar usuários." });
    }
};
const updateUserRole = async (req, res) => {
    const { user_id } = req.params;
    const { role } = req.body;
  
    console.log('Tentando atualizar role para usuário ID:', user_id, 'para role:', role);
  
    try {
      const updatedUser = await prisma.user.update({
        where: { user_id: parseInt(user_id) },
        data: { role },
      });
      console.log('Usuário atualizado:', updatedUser);
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Erro ao atualizar role do usuário:', error);
      res.status(500).json({ error: "Erro ao atualizar role do usuário." });
    }
};
const deleteUser = async (req, res) => {
    const { user_id } = req.params;
    try {
      await prisma.user.delete({
        where: { user_id: parseInt(user_id) },
      });
      res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
      res.status(500).json({ error: "Error deleting user." });
    }
};
  





module.exports = {
    createUser,
    getAllUsers,
    loginUser,
    checkFirstLogin,
    updateUserRole,
    deleteUser
};

