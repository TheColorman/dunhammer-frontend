import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import query from '../../lib/db'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse  
) {
    const session = await getSession({ req })

    if (!session) {
        res.status(401).json({ error: 'Not authenticated' })
        return
    }

    try {
        const result = await query({
            query: "SELECT * FROM `users` WHERE `id` = ?",
            values: [req.body.id]
        })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ error })
    }
}