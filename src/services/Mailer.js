// @flow

import sendgrid from 'sendgrid';
import type { RecipientModel } from 'emaily-types';

import keys from '../config/keys';

export interface Mailable {
    subject: string;
    recipients: RecipientModel[];
}

const helper = sendgrid.mail;

export default class Mailer extends helper.Mail {
    constructor({ subject, recipients }: Mailable, content: string) {
        super();

        this.sgApi = sendgrid(keys.sendGridKey);
        // eslint-disable-next-line
        this.from_email = new helper.Email('no-reply@email.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);

        this.addContent(this.body);
        this.addClickTracking();
        this.addRecipients();
    }

    formatAddresses(recipients: RecipientModel[]) {
        return recipients.map(({ email }) => new helper.Email(email));
    }

    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    addRecipients() {
        const personalize = new helper.Personalization();
        this.recipients.forEach(recipient => personalize.addTo(recipient));
        this.addPersonalization(personalize);
    }

    async send() {
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON(),
        });

        return await this.sgApi.API(request);
    }
}
