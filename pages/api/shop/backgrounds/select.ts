import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import query from "../../../../lib/db";
import { ExtendedSession } from "../../../../lib/types";

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
        res.status(401).json({ error: 'No Discord ID linked to session. (is the Discord API being called correctly?)' })
        return
    }

    // Querystring checks
    if (!req.query.id) {
        res.status(400).json({ error: 'No background ID provided' })
        return
    }


    try {
        // Deselect all backgrounds
        await query({
            query: "UPDATE `user_background` SET `selected` = 0 WHERE `user_id` = ?",
            values: [session.user.discordId]
        })
        // Select chosen background
        await query({
            query: `UPDATE user_background SET selected = 1 WHERE user_id = ? AND background_id = ?`,
            values: [session.user.discordId, req.query.id]
        })
        res.status(200).json({ success: true })
    } catch (error) {
        res.status(500).json({ error });
    }
}
