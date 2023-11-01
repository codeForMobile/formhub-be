import {gql} from 'apollo-server-core'

const schema = gql`
    scalar JSON
    scalar DateTime

    type Query {
        submissions: [Submissions!]!
    }

    type Mutation {
        queueSubmissionGeneration(count: Int): Boolean!
    }

    type Submissions {
        id: ID!,
        submittedAt: DateTime!,
        data: JSON!
    }
`

export default schema