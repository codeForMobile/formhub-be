import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid'
const db = new PrismaClient({log: ['error', 'info', 'query', 'warn']})

const seedDatabase = async () => {
    if((await db.submissions.count()) === 0) {
        await db.submissions.createMany({
            data: [{
                id: uuidv4(),
                data: {
                    name: 'kevin',
                    twitter: 'kevinfb'
                },
                submittedAt: new Date(),
            }]
        })
    }
}
seedDatabase()

export default db