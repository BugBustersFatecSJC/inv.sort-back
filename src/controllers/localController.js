const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createLocal = async (req, res) => {
    const { local_name } = req.body;

    try {
        const locName = await prisma.local.create({
            data: {
                local_name
            },
        });
        res.status(201).json(locName);
    } catch (error) {
        res.status(400).json({error: "Erro ao criar local"});
    }
}