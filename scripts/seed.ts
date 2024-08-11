const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
    try {
        await database.category.createMany({
            data: [
                { name: "Engenharia Química" },
                { name: "Engenharia de Software" },
                { name: "Pericia Criminal" },
                { name: "Biotecnologia Industrial" },
                { name: "Medicina" },
                { name: "Termodinâmica" },
            ]
        });

        console.log("Success")
    } catch (error) {
        console.log("Erro na seed do banco de dados de categorias");
    } finally {
        await database.$disconnect();
    }
}

main();