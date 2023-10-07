import { PrismaClient } from '@prisma/client'
import express from 'express'
import morgan from 'morgan'
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

const app = express()
app.use(morgan('dev'))

app.get('/', async (req,res) => {
    const submissions = await db.submissions.findMany()
    res.json(submissions)
})

const port = Number(process.env.PORT ?? 8080)

app.listen(port, '0.0.0.0', () => {
    console.log(`Server started on port ${port}`)
})