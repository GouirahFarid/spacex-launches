export interface Launch {
    id: string;
    name: string;
    date_utc: string;
    date_local: string;
    success: boolean;
    details: string | null;
    links: {
        patch: {
            small: string | null;
            large: string | null;
        };
        webcast: string | null;
        article: string | null;
        youtube_id: string | null
    };
    launchpad: string;
    payloads: string[];
    failures: {
        time: number;
        altitude: number | null;
        reason: string;
    }[];
}

export interface Payload {
    id: string;
    name: string;
    customers: string[];
}

export interface Launchpad {
    id: string;
    name: string;
    full_name: string;
}

export type LaunchFilter = 'all' | 'success' | 'failed';