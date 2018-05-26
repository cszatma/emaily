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

export interface Survey {
    _id: string;
    body: string;
    recipients?: Recipient[];
    subject: string;
    title: string;
    yes: number;
    no: number;
    _user: string;
    dateSent: Date;
    lastResponded: Date;
}

export interface Recipient {
    email: string;
    responded: boolean;
}
