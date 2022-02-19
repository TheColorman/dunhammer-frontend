import { PrismaClient } from '@prisma/client'
import { getSession } from 'next-auth/react'
import query from '../../../lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { GuildPartial } from '../../../lib/discord.types'
import type { ExtendedSession, DBGuild } from '../../../lib/types'

const prisma = new PrismaClient()

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

    if (!session.user.id) {
        res.status(401).json({ error: 'No user ID linked to session. (Try re-authenticating.)' })
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
            res.status(401).json({ error: 'No access token found' })
            return
        }

        const response = await (await fetch(`https://discord.com/api/v9/users/@me/guilds`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })).json() as GuildPartial[]
        //const DSGuilds = response.filter(guild => guild.permissions && (BigInt(guild.permissions) & BigInt(0x20)) == BigInt(0x20)) // 0x20 = Guilds.MANAGE_GUILD
        
        const DBResult = ((await query({
            query: "SELECT `guilds`.`id`, `guilds`.`name`, `guilds`.`icon` FROM `guild_user` JOIN `guilds` ON `guilds`.`id` = `guild_user`.`guild_id` WHERE `guild_user`.`user_id` = ?",
            values: [session.user.discordId]
        })) as Array<DBGuild>)

        const Guilds = response.map(guild => {
            const DBGuild = DBResult.find(g => g.id == guild.id)
            return {
                id: guild.id,
                name: guild.name,
                icon: guild.icon,
                owner: guild.owner,
                permissions: guild.permissions,
                features: guild.features,
                hasDunhammer: !!DBGuild,
            }
        })

        res.status(200).json(Guilds)
    } catch (error) {
        res.status(500).json({ error })
    }
}