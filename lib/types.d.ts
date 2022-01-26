import { Session } from "next-auth"

export interface ExtendedSession extends Session {
    user: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
        discordId: string | null,
        discriminator: string | null,
    }
}
export type DiscordUser = {
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

export type DBUser = {
    id: string;
    username: string;
    tag: string;
    levelMentions: boolean;
    levelDm: boolean;
    disabled: boolean;
    xp: number;
    level: number;
    coins: number;
    spentMoney: number;
    commandCount: number;
    pingCount: number;
    inviteCount: number;
}

type ShopBackground = {
    id: number;
    name: string;
    description: string;
    price: number;
    thumbnail: string;
    image: string;
}

type ShopCollection = {
    id: number;
    name: string;
    description: string;
    backgrounds: ShopBackground[];
    valid?: boolean;
}

export type ShopBackgrounds = {
    collections: ShopCollection[];
}

export type APIError = {
    error: string;
}

export type AccessTokenResponse = {
    access_token: string;
    token_type: "Bearer";
    expires_in: number;
    refresh_token: string;
    scope: string;
}