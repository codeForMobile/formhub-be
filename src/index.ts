import { PrismaClient } from '@prisma/client'
import express from 'express'
import morgan from 'morgan'
import { v4 as uuidv4 } from 'uuid'

const db = new PrismaClient({log: ['error', 'info', 'query', 'warn']})

const seedDatabase = async () => {
    if((await db.post.count()) === 0) {
        await db.post.createMany({
            data: [{
                id: uuidv4(),
                slug: 'ultimate-node-stack',
                title: 'ultimate node stack 2022',
                publishedAt: new Date(),
            },{
                id: uuidv4(),
                slug: 'draft post',
                title: 'draft post'
            }]
        })
    }
}
seedDatabase()

const app = express()
app.use(morgan('dev'))

app.get('/', async (req,res) => {
    const posts = await db.post.findMany()
    res.json(posts)
})

const port = Number(process.env.PORT ?? 8080)

app.listen(port, '0.0.0.0', () => {
    console.log(`Server started on port ${port}`)
})