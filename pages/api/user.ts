import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import query from '../../lib/db'
import { DBUser, ExtendedSession, APIUserDBBackground } from '../../lib/types'

interface M_DBUser extends DBUser {
    user_id: string;
}

interface M_DBBackground extends APIUserDBBackground {
    background_id: number;
}

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
        res.status(401).json({ error: 'No Discord ID linked to session. (is the Discord API being called correctly?)' })
        return
    }

    try {
        const result = ((await query({
            query: "SELECT `usr`.`id` as `user_id`, `usr`.`username`, `usr`.`tag`, `usr`.`levelMentions`, `usr`.`levelDm`, `usr`.`disabled`, `usr`.`xp`, `usr`.`level`, `usr`.`coins`, `usr`.`spentMoney`, `usr`.`commandCount`, `usr`.`pingCount`, `usr`.`inviteCount`, `bg`.`id` as `background_id`, `bg`.`name`, `bg`.`description`, `price`, `thumbnail`, `image`, `selected` FROM `users` as `usr` JOIN `user_background` as `usr_bg` ON `usr_bg`.`user_id` = `usr`.`id` JOIN `backgrounds` as `bg` ON `bg`.`id` = `usr_bg`.`background_id` WHERE `usr`.`id` = ?",
            values: [session.user.discordId]
        })) as Array<M_DBUser & M_DBBackground>)

        // Extract all users backgrounds
        const backgrounds = result.map(({ background_id, name, description, price, thumbnail, image, selected }) => ({ id: background_id, name, description, price, thumbnail, image, selected }))
        // Extract user and add backgrounds as property
        const user = (({ user_id, username, tag, levelMentions, levelDm, disabled, xp, level, coins, spentMoney, commandCount, pingCount, inviteCount }, backgrounds) => ({ id: user_id, username, tag, levelMentions, levelDm, disabled, xp, level, coins, spentMoney, commandCount, pingCount, inviteCount, backgrounds }))(result[0], backgrounds)

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error })
    }
}