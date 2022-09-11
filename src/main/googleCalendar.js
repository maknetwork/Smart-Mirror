import { google } from 'googleapis';

const googleCredentials = {
  web: {
    client_id:
      '799627824618-hv6vnm83tphcu988u5vpt9vdlpntv3ih.apps.googleusercontent.com',
    project_id: 'acs-isite',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_secret: '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',
    redirect_uris: ['https://acs-isite.firebaseapp.com/__/auth/handler'],
    javascript_origins: [
      'http://localhost',
      'http://localhost:5000',
      'https://acs-isite.firebaseapp.com',
    ],
  },
};

const token = {
  access_token:
    'ya29.A0AVA9y1uN7wQWL3eIIPHRybSAo5ZTBmqiaZM_swjb0fh1pR4nlrsCxjRdvkZRnwfTaK6z87nrxbojkYBfPQS-JD4c98slTfI6J2knQI3LY4QCS2uaB1woM5OARBMjwe_Qfq80CA9bYBGEy3M4ZygDukauaZuaaCgYKATASATASFQE65dr8l-GNo73sXbx0zaxTyG5Gcg0163',
  refresh_token:
    '1//0gwTJbBIMUdPnCgYIARAAGBASNwF-L9IrFmCIFboA7TbTEM3K8yyWGdfYQUuu-fAx--rjPj_n66o4jNzekwyydDEDaumkZ1IIMBA',
  scope: 'https://www.googleapis.com/auth/calendar.readonly',
  token_type: 'Bearer',
  expiry_date: 1660284556218,
};

const { client_secret, client_id, redirect_uris } = googleCredentials.web;
const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

oAuth2Client.setCredentials(token);
const auth = oAuth2Client;
export const listEvents = google.calendar({ version: 'v3', auth });
//  list all calendars

// return calendar events in an array
