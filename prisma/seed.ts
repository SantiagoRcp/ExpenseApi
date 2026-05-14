import {PrismaClient, CategoryType} from '@prisma/client';
import {PrismaPg} from "@prisma/adapter-pg";
import {Pool} from "pg";
import {env} from "../src/config/envConfig.js";

const connectionString = `${env.DATABASE_URL}`;
const pool = new Pool({connectionString});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({adapter});

const defaultCategories = [
    // Income Categories
    {name: 'Salary', icon: '💰', type: CategoryType.Income, isDefault: true},
    {name: 'Freelance', icon: '💻', type: CategoryType.Income, isDefault: true},
    {name: 'Investments', icon: '📈', type: CategoryType.Income, isDefault: true},
    {name: 'Gift', icon: '🎁', type: CategoryType.Income, isDefault: true},
    {name: 'Other Income', icon: '💵', type: CategoryType.Income, isDefault: true},

    // Expense Categories
    {name: 'Food & Dining', icon: '🍴', type: CategoryType.Expense, isDefault: true},
    {name: 'Groceries', icon: '🛒', type: CategoryType.Expense, isDefault: true},
    {name: 'Rent', icon: '🏠', type: CategoryType.Expense, isDefault: true},
    {name: 'Utilities', icon: '⚡', type: CategoryType.Expense, isDefault: true},
    {name: 'Transportation', icon: '🚗', type: CategoryType.Expense, isDefault: true},
    {name: 'Entertainment', icon: '🎬', type: CategoryType.Expense, isDefault: true},
    {name: 'Shopping', icon: '🛍️', type: CategoryType.Expense, isDefault: true},
    {name: 'Health', icon: '🏥', type: CategoryType.Expense, isDefault: true},
    {name: 'Education', icon: '🎓', type: CategoryType.Expense, isDefault: true},
    {name: 'Travel', icon: '✈️', type: CategoryType.Expense, isDefault: true},
    {name: 'Other Expense', icon: '❓', type: CategoryType.Expense, isDefault: true},
];

async function main() {
    console.log('Starting seeding default categories...');

    for (const category of defaultCategories) {
        const existing = await prisma.category.findFirst({
            where: {
                name: category.name,
                type: category.type,
                isDefault: true,
                userId: null,
            },
        });

        if (!existing) {
            await prisma.category.create({
                data: category,
            });
            console.log(`Created category: ${category.name} ${category.icon} (${category.type})`);
        } else {
            console.log(`Skipped existing category: ${category.name} (${category.type})`);
        }
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
