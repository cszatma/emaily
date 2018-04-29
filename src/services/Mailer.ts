import sendgrid from 'sendgrid';

import keys from '../config/keys';
import { RecipientModel } from '../models/Recipient';

export interface Mailable {
    subject: string;
    recipients: RecipientModel[];
}

const helper = sendgrid.mail;

export default class Mailer extends helper.Mail {
    private sgApi: any;
    // tslint:disable-next-line
    private from_email: any;
    private subject: string;
    private body: any;
    private recipients: any;

    constructor({ subject, recipients }: Mailable, content: string) {
        super();

        this.sgApi = sendgrid(keys.sendGridKey);
        this.from_email = new helper.Email('no-reply@emaily.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);

        this.addContent(this.body);
        this.addClickTracking();
        this.addRecipients();
    }

    public async send() {
        const request = this.sgApi.emptyRequest({
            body: this.toJSON(),
            method: 'POST',
            path: '/v3/mail/send',
        });

        return await this.sgApi.API(request);
    }

    private formatAddresses(recipients: RecipientModel[]) {
        return recipients.map(({ email }) => new helper.Email(email));
    }

    private addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    private addRecipients() {
        const personalize = new helper.Personalization();
        this.recipients.forEach((recipient: any) =>
            personalize.addTo(recipient),
        );
        this.addPersonalization(personalize);
    }
}
