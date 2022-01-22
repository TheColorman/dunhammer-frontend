import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import query from '../../lib/db'
import { DBUser, ExtendedSession } from '../../lib/types'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse  
) {
    const session = (await getSession({ req })) as ExtendedSession

    if (!session) {
        res.status(401).json({ error: 'Not authenticated' })
        return
    }

    try {
        const result = ((await query({
            query: "SELECT * FROM `users` WHERE `id` = ?",
            values: [session.user.discordId]
        })) as Array<DBUser>)[0]
        
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ error })
    }
}