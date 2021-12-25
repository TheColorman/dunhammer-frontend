import NextAuth from "next-auth"
import DiscordProvider from "next-auth/providers/discord"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import { Session } from "next-auth"

const prisma = new PrismaClient()

interface ExtendedSession extends Session {
    user: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
        discordId: string | null,
        discriminator: string | null,
    }
}

type DiscordUser = {
    id: string;
    username: string;
    discriminator: string;
    avatar: string;
    bot?: boolean;
    system?: boolean;
    mfa_enabled?: boolean;
    banner?: string;
    accent_color?: number;
    locale?: string;
    verified?: boolean;
    email?: string;
    flags?: number;
    premium_type?: 0 | 1 | 2;
    public_flags?: number;
}

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "database",
    },
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
            authorization: "https://discord.com/api/oauth2/authorize?scope=identify%20email%20guilds",
        })
    ],
    secret: process.env.SECRET,
    pages: {
        error: "/"
    },
    callbacks: {
        session: async ({ session, user, token }) => {

            if (!session.user) return session

            // Get Discord token from database
            const discordToken = (await prisma.user.findUnique({
                where: {
                    id: user.id
                },
                select: {
                    accounts: {
                        select: {
                            access_token: true
                        }
                    }
                }
            }))?.accounts[0].access_token

            if (!discordToken) return session
            
            // Get user ID
            const url = "https://discord.com/api/v9/users/@me?"
            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${discordToken}`,
                    "Content-Type": "application/json"
                }
            })
            const data = (await response.json()) as DiscordUser
            
            const extSession = session as ExtendedSession
            extSession.user.discordId = data.id
            extSession.user.discriminator = data.discriminator

            return session
        }
    }
})