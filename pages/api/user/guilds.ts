import { PrismaClient } from '@prisma/client'
import { getSession } from 'next-auth/react'
import query from '../../../lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { GuildPartial } from '../../../lib/discord.types'
import type { ExtendedSession, DBGuild, APIError, DSGuildExt } from '../../../lib/types'

const prisma = new PrismaClient()

const fetchDiscordGuilds = async (session: ExtendedSession): Promise<APIError | GuildPartial[]> => {
    if (!session.user.id) {
        return { error: 'No user ID linked to session. (Try re-authenticating.)', status: 401 }
    }

    try {
        // Fetch user guilds from Discord
        const accessToken = (await prisma.user.findFirst({
            where: {
                id: session.user.id
            },
            include: {
                accounts: true
            }
        }))?.accounts[0]?.access_token

        if (!accessToken) {
            return { error: 'No Discord access token found', status: 401 }
        }

        const response = await fetch(`https://discord.com/api/v9/users/@me/guilds`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
        const json = await response.json()
        if (response.status && response.status !== 200) {
            return Object.assign({ error: json.message, status: response.status }, json)
        }
        return json as GuildPartial[]
    } catch (e: any) {
        return { error: e.message, status: 500 }
    }
}
const fetchLocalGuilds = async (session: ExtendedSession): Promise<DBGuild[]> => {
    return ((await query({
        query: "SELECT `guilds`.`id`, `guilds`.`name`, `guilds`.`icon` FROM `guild_user` JOIN `guilds` ON `guilds`.`id` = `guild_user`.`guild_id` WHERE `guild_user`.`user_id` = ?",
        values: [session.user.discordId]
    })) as DBGuild[])

}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = (await getSession({ req })) as ExtendedSession

    if (!session) {
        res.status(401).json({ error: 'Not authenticated', status: 401 })
        return
    }

    if (!session.user.discordId) {
        res.status(401).json({ error: 'No Discord ID linked to session. (Try re-authenticating.)', status: 401 })
        return
    }

    const full = req.query.full === 'true'

    const localGuilds = await fetchLocalGuilds(session)
    if (full) {
        const discordGuilds = await fetchDiscordGuilds(session)
        if ("status" in discordGuilds && discordGuilds.status !== 200 || "error" in discordGuilds) {
            return res.status(discordGuilds.status).json(discordGuilds)
        }
        
        const Guilds = discordGuilds.map(guild => {
            const DBGuild = localGuilds.find(g => g.id == guild.id)
            return {
                id: guild.id,
                name: guild.name,
                icon: guild.icon,
                owner: guild.owner,
                permissions: guild.permissions,
                features: guild.features,
                hasDunhammer: !!DBGuild,
            }
        }) as DSGuildExt[]
        return res.status(200).json(Guilds)
    }

    return res.status(200).json(localGuilds)
}