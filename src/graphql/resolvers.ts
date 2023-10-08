import {
    GraphQLDateTime
} from 'graphql-iso-date'
import GraphQLJSON from "graphql-type-json"
import db from '../modules/db'

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
    }
}

export default resolvers