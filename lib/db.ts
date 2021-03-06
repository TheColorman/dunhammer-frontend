import mysql from 'serverless-mysql'

const db = mysql({
    config: {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT as unknown as number,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
    }
})

export default async function query({ query , values }: { query: string, values: any[] }): Promise<any[]> {
    const results = await db.query(query, values) as any[]
    await db.end()
    return results
}