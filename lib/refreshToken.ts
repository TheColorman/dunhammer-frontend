import { User } from "next-auth"
import { PrismaClient } from "@prisma/client"
import { AccessTokenResponse, APIError } from "./types"

const prisma = new PrismaClient()

async function deleteUser(userId: string) {
    return await prisma.user.delete({
        where: {
            id: userId,
        },
        include: {
            accounts: true,
        }
    })
}

export default async function refreshToken(user: User): Promise<{ token: string } | { error: string }> {
    // Get user account
    const userAccount = (await prisma.user.findUnique({
        where: {
            id: user.id,
        },
        include: {
            accounts: true,
        }
    }))?.accounts[0]

    // Return if no account
    if (!userAccount) {
        deleteUser(user.id)
        return { error: "No account found" }
    }

    // Return if token not expired
    const tokenExpiresAt = userAccount.expires_at
    if (tokenExpiresAt && tokenExpiresAt * 1000 > Date.now()) return userAccount.access_token ? { token: userAccount.access_token } : { error: "No token found" }
    // Return if no refresh token
    if (!userAccount.refresh_token) {
        deleteUser(user.id)
        return { error: "No refresh token found" }
    }


    const data = (await (await fetch(`https://discord.com/api/v8/oauth2/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        body: new URLSearchParams({
            client_id: process.env.DISCORD_CLIENT_ID as string,
            client_secret: process.env.DISCORD_CLIENT_SECRET as string,
            grant_type: "refresh_token",
            refresh_token: userAccount.refresh_token,
        })
    })).json()) as AccessTokenResponse | APIError

    // Delete member from database if API error
    if ("error" in data) {
        deleteUser(user.id)
        return { error: data.error }
    }

    // Update user account
    await prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            accounts: {
                update: {
                    where: {
                        id: userAccount.id,
                    },
                    data: {
                        access_token: data.access_token,
                        token_type: data.token_type,
                        expires_at: Math.floor((data.expires_in + Date.now() * 1000) / 1000),
                        refresh_token: data.refresh_token,
                        scope: data.scope,
                    }
                }
            }
        }
    })
    return { token: data.access_token }
}
