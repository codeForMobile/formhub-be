import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('submissions', table => {
        table.specificType('id', 'CHAR(36)').primary()
        table.jsonb('data').notNullable()
        table.timestamp('submittedAt').notNullable()
        table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now())
        table.timestamp('updatedAt').notNullable()
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('submissions')
}

