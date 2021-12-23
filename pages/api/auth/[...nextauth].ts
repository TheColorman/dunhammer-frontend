import NextAuth from "next-auth"
import DiscordProvider from "next-auth/providers/discord"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import { URLSearchParams } from "url"

const prisma = new PrismaClient()

type Token = {
    token? : Token,
    accessToken : string,
    accessTokenExpires : number,
    refreshToken : string,
}
type AccessTokenResponse = {
    access_token: string,
    token_type: string,
    expires_in: number,
    refresh_token: string,
    scope: string
}

async function refreshAccessToken(token: Token) {
    try {
        const url = 
            "https://discord.com/api/oauth2/token?" +
            new URLSearchParams([
                ["client_id", process.env.DISCORD_CLIENT_ID as string],
                ["client_secret", process.env.DISCORD_CLIENT_SECRET as string],
                ["grant_type", "refresh_token"],
                ["refresh_token", token.refreshToken],
            ])
        
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            method: "POST",
        })

        const refreshedTokens = await response.json() as AccessTokenResponse

        if (!response.ok) {
            throw refreshedTokens
        }

        return {
            ...token,
            accesToken: refreshedTokens.access_token,
            accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
            refreshToken: refreshedTokens.refresh_token,
        }
    } catch (error) {
        console.log(error)

        return {
            ...token,
            error: "RefreshAccessTokenError"
        }
    }
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
        async session({ session, token: _token, user }) {
            const account = (await prisma.user.findUnique({
                where: {
                    id: user.id,
                },
                include: {
                    accounts: true,
                }
            }))?.accounts[0]
            
            if (!account) return session
            if (!account.access_token || !account.expires_at || !account.refresh_token) return session

            let token = {
                accessToken: account.access_token,
                accessTokenExpires: account.expires_at,
                refreshToken: account.refresh_token,
            }
            // Return if token is still valid
            if (token.accessTokenExpires > Date.now()) return session

            // Refresh token
            token = await refreshAccessToken(token)
            await prisma.account.update({
                where: {
                    id: account.id,
                },
                data: {
                    access_token: token.accessToken,
                    expires_at: token.accessTokenExpires,
                    refresh_token: token.refreshToken,
                }
            })

            return session;
        }
    }
})