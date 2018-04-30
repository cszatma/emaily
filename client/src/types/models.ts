export interface User {
    readonly _id: string;
    readonly googleId: string;
    readonly credits: number;
}

export interface StripeToken {
    readonly card: object;
    readonly client_ip: string;
    readonly created: number;
    readonly email: string;
    readonly id: string;
    readonly livemode: boolean;
    readonly object: string;
    readonly type: string;
    readonly used: boolean;
}
