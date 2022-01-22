import NextAuth from "next-auth"
import DiscordProvider from "next-auth/providers/discord"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import { ExtendedSession, DiscordUser } from "../../../lib/types"
import refreshToken from "../../../lib/refreshToken"

const prisma = new PrismaClient()

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

            const refreshTokenResult = await refreshToken(user)
            const extSession = session as ExtendedSession

            if ("error" in refreshTokenResult) {
                extSession.expired = true
                return extSession
            }

            const { token: discordToken } = refreshTokenResult

            // Get user ID
            const url = "https://discord.com/api/v9/users/@me?"
            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${discordToken}`,
                    "Content-Type": "application/json"
                }
            })
            const data = (await response.json()) as DiscordUser
            extSession.user.discordId = data.id
            extSession.user.discriminator = data.discriminator

            return extSession
        }
    }
})