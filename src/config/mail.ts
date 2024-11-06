export const mailConfig = {
  host: 'cleaningelements.com',
  port: 465,
  secure: true,
  auth: {
    user: 'info@cleaningelements.com',
    pass: process.env.SMTP_PASSWORD
  },
  from: 'CleaningElements <info@cleaningelements.com>'
};