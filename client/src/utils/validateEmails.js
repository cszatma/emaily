// @flow

const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default function validateEmails(emails: string) {
    const invalidEmails = emails
        .split(',')
        .map(email => email.trim())
        .filter(email => email && !emailRegex.test(email));

    if (invalidEmails.length > 0) {
        // $FlowFixMe
        return `These emails are invalid: ${invalidEmails}`;
    }
}
