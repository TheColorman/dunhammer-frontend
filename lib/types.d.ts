import type { Session } from "next-auth"
import type { GuildPartial } from "./discord.types";

export interface ExtendedSession extends Session {
    user: {
        id?: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
        discordId?: string | null,
        discriminator?: string | null,
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

export type DBBackground = {
    id: number;
    name: string;
    description: string;
    price: number;
    thumbnail: string;
    image: string;
}

export type DBGuild = {
    id: string;
    name: string;
    icon: string;
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

type SqlShopCollection = {
    collection_id: number;
    collection_name: string;
    collection_description: string;
    background_id: number;
    background_name: string;
    background_description: string;
    price: number;
    thumbnail: string;
    image: string;
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

export type BackgroundsBuyResponse = {
    error?: "Not authenticated" | "No Discord ID linked to session." | "No background ID provided" | "This background either doesn't exist, or it doesn't have any active collection." | "Failed to get user from database." | "You already own this background." | "This background isn't for sale." | "You don't have enough coins.";
    success?: true;
}

export interface DBUserBackground extends DBBackground {
    selected: boolean;
}

export type APIUser = DBUser | APIError; 
export type APIUserBackgrounds = DBUserBackground[] | APIError;
export type APIGuilds = GuildPartial[] | APIError;