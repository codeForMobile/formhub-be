import {
    GraphQLDateTime
} from 'graphql-iso-date'
import GraphQLJSON from "graphql-type-json"
import db from '../modules/db'
import { enqueue } from '../modules/queue'

const resolvers = {
    DateTime: GraphQLDateTime,
    JSON: GraphQLJSON,
    Query: {
        submissions: () =>{
            return db.submissions.findMany({
                orderBy: {
                    submittedAt: 'desc'
                }
            }) 
        }
    },
    Mutation: {
        queueSubmissionGeneration: async () => {
           await enqueue('generateSubmissions')
           return true;
        }
    }
}

export default resolvers