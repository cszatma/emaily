export interface FormValues {
    title: string;
    subject: string;
    body: string;
    recipients: string;
}

const FIELDS = [
    { label: 'Survey Title', name: 'title' },
    { label: 'Subject Line', name: 'subject' },
    { label: 'Email Body', name: 'body' },
    { label: 'Recipient List', name: 'recipients' },
];

export default FIELDS;
