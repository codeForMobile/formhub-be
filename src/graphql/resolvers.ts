import {
    GraphQLDateTime
} from 'graphql-iso-date'
import GraphQLJSON from "graphql-type-json"
import db from '../modules/db'
import { enqueue } from '../modules/queue'
import { times } from 'lodash'

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
        queueSubmissionGeneration: async (_:any, {count}: {count:number}) => {
           await Promise.all(
            times(count ?? 1).map (async () => {
            await enqueue('generateSubmissions')
           }))
           return true;
        }
    }
}

export default resolvers