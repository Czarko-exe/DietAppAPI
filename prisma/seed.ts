import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const products = [
        { name: 'Pierś z kurczaka', calories: 120, protein: 21.5, fat: 1.3, carbs: 0.0 },
        { name: 'Ryż basmati', calories: 350, protein: 7.0, fat: 0.5, carbs: 78.0 },
        { name: 'Oliwa z oliwek', calories: 884, protein: 0.0, fat: 100.0, carbs: 0.0 },
        { name: 'Jajko kurze (klasa M)', calories: 143, protein: 12.6, fat: 9.5, carbs: 0.7 },
        { name: 'Płatki owsiane górskie', calories: 366, protein: 11.9, fat: 7.2, carbs: 62.4 },
        { name: 'Banan', calories: 89, protein: 1.1, fat: 0.3, carbs: 22.8 },
        { name: 'Twaróg chudy', calories: 86, protein: 18.0, fat: 0.5, carbs: 3.5 },
        { name: 'Masło orzechowe 100%', calories: 588, protein: 25.0, fat: 50.0, carbs: 20.0 },
    ];

    for (const product of products) {
        const exists = await prisma.product.findFirst({
            where: { name: product.name },
        });

        if (!exists) {
            await prisma.product.create({
                data: product,
            });
        }
    }

    console.log('Produkty zostały pomyślnie dodane do bazy!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });