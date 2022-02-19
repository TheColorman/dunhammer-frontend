import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import query from '../../../lib/db'
import type { ExtendedSession, DBUserBackground } from '../../../lib/types'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse  
) {
    const session = (await getSession({ req })) as ExtendedSession

    if (!session) {
        res.status(401).json({ error: 'Not authenticated' })
        return
    }

    if (!session.user.discordId) {
        res.status(401).json({ error: 'No Discord ID linked to session. (Try re-authenticating.)' })
        return
    }

    try {
        const result = ((await query({
            query: "SELECT `bg`.`id`, `bg`.`name`, `bg`.`description`, `price`, `thumbnail`, `image`, `selected` FROM `users` as `usr` JOIN `user_background` as `usr_bg` ON `usr_bg`.`user_id` = `usr`.`id` JOIN `backgrounds` as `bg` ON `bg`.`id` = `usr_bg`.`background_id` WHERE `usr`.`id` = ?",
            values: [session.user.discordId]
        })) as Array<DBUserBackground>)

        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ error })
    }
}