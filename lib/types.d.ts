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