import { faker } from '@faker-js/faker'
import db from './db'
import { v4 as uuidv4 } from 'uuid'
import { random } from 'lodash'

const submission = async () => {
    return await db.submissions.create({
        data: {
            id: uuidv4(),
            submittedAt: new Date(),
            data: {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                company: faker.company.buzzVerb(),
                comments: faker.lorem.words(random(30, false))
            }
        }
    })
}

const ModeGenerate = {
    submission
}

export default ModeGenerate