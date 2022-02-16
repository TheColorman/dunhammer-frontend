type Snowflake = string;
type GuildFeature = "ANIMATED_ICON" | "BANNER" | "COMMERCE" | "COMMUNITY" | "DISCOVERABLE" | "FEATURABLE" | "INVITE_SPLASH" | "MEMBER_VERIFICATION_GATE_ENABLED" | "MONETIZATION_ENABLED" | "MORE_STICKERS" | "NEWS" | "PARTNERED" | "PREVIEW_ENABLED" | "PRIVATE_THREADS" | "ROLE_ICONS" | "SEVEN_DAY_THREAD_ARCHIVE" | "THREE_DAY_THREAD_ARCHIVE" | "TICKETED_EVENTS_ENABLED" | "VANITY_URL" | "VERIFIED" | "VIP_REGIONS" | "WELCOME_SCREEN_ENABLED";

type GuildPartial = {
    id: Snowflake;
    name: string;
    icon?: string;
    owner?: boolean;
    permissions?: string;
    features: GuildFeature[];
}

export { GuildPartial };