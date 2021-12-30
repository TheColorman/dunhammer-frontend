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

export type dbUser = {
    id: string;
    username: string;
    tag: string;
    levelMentions: boolean;
    levelDm: boolean;
    disabled: boolean;
    xp: number;
    level: number;
    coins: number;
    badges: number;
    currentBadges: number;
    backgrounds: number;
    currentBackground: number;
    spentMoney: number;
    commandCount: number;
    pingCount: number;
    inviteCount: number;
}

type shopBackground = {
    id: number;
    name: string;
    description: string;
    price: number;
    thumbnail: string;
    image: string;
}

type shopCollection = {
    id: number;
    name: string;
    description: string;
    backgrounds: shopBackground[];
}

export type shopBackgrounds = {
    collections: shopCollection[];
}

export type apiError = {
    error: string;
}