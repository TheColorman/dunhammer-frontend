import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import query from "../../../../lib/db";
import { DBUser, ExtendedSession, ShopBackground } from "../../../../lib/types";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = (await getSession({ req })) as ExtendedSession

    // Authorization checks
    if (!session) {
        res.status(401).json({ error: 'Not authenticated' })
        return
    }
    if (!session.user.discordId) {
        res.status(401).json({ error: 'No Discord ID linked to session. (Try re-authenticating.)' })
        return
    }

    // Querystring checks
    if (!req.query.id) {
        res.status(400).json({ error: 'No background ID provided' })
        return
    }

    const background = ((await query({
        query: "SELECT `bg`.`id`, `bg`.`name`, `bg`.`description`, `bg`.`price`, `bg`.`thumbnail`, `bg`.`image` FROM `backgrounds` `bg` JOIN `background_collection` `bg_cl` ON `bg`.`id` = `bg_cl`.`background_id` JOIN `collections` `cl` ON `bg_cl`.`collection_id` = `cl`.`id` WHERE `bg`.`id` = ? AND `cl`.`valid` = 1",
        values: [req.query.id]
    })) as ShopBackground[]).pop()

    if (!background) {
        res.status(404).json({ error: "This background either doesn't exist, or it doesn't have any active collection." })
        return
    }

    const dbUser = (await query({
        query: "SELECT * FROM `users` WHERE `id` = ?",
        values: [session.user.discordId]
    }) as Array<DBUser>).pop()
    const userBackground = ((await query({
        query: "SELECT `background_id` FROM `user_background` WHERE `user_id` = ? AND `background_id` = ?",
        values: [session.user.discordId, background.id]
    })) as Array<{ id: number }>).pop()

    if (!dbUser) {
        res.status(500).json({ error: "Failed to get user from database." })
        return
    }
    if (userBackground) {
        res.status(400).json({ error: "You already own this background." })
        return
    }
    if (background.price === null) {
        res.status(400).json({ error: "This background isn't for sale." })
        return
    }
    if (dbUser.coins < background.price) {
        res.status(400).json({ error: "You don't have enough coins." })
        return
    }

    // Update user
    await query({
        query: "UPDATE `users` SET `coins` = `coins` - ? WHERE `id` = ?",
        values: [background.price, session.user.discordId]
    })
    await query({
        query: "INSERT `user_background` (`background_id`, `user_id`) VALUES (?, ?)",
        values: [background.id, session.user.discordId]
    })

    res.status(200).json({ success: true })
}