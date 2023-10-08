import express from 'express'
import morgan from 'morgan'
import http from 'http'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import schema from './graphql/schema'
import resolvers from './graphql/resolvers'
import db from './modules/db'

const app = express()
const startApolloServer = async () => {
    const httpServer = http.createServer(app)
    const server = new ApolloServer({
        typeDefs: schema,
        resolvers: resolvers,
        csrfPrevention:true,
        cache:'bounded',
        plugins: [
            ApolloServerPluginDrainHttpServer({httpServer}),
            ApolloServerPluginLandingPageLocalDefault({embed: true})
        ]
    })
    await server.start()
    server.applyMiddleware({app})
    const port = Number(process.env.PORT ?? 8080)
    await new Promise<void>((resolve) => 
        httpServer.listen({host:'0.0.0.0', port}, resolve)
    )
    console.log(`Server started at ${port}/${server.graphqlPath}`)
}
startApolloServer()

app.use(morgan('dev'))

app.get('/', async (req,res) => {
    const submissions = await db.submissions.findMany()
    res.json(submissions)
})

/* app.listen(port, '0.0.0.0', () => {
    console.log(`Server started on port ${port}`)
}) */