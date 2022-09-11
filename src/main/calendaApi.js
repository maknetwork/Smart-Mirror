const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

const TOKEN_PATH = 'token.json';

// load auth token and refresh token from file
fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return console.error('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Calendar API.
    authorize(JSON.parse(token), listEvents);
    


function listEvents(auth) {
    const calendar = google.calendar({ version: 'v3', auth });
  //  list all calendars
    calendar.calendarList.list({
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const calendars = res.data.items;
      console.log('Calendars:');
      calendars.forEach((calendar) => {
        console.log(calendar.summary);
      }
      );
    }
  
  
    calendar.events.list(
      {
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
      },
      (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const events = res.data.items;
        if (events.length) {
          console.log('Upcoming 10 events:');
          events.map((event, i) => {
            const start = event.start.dateTime || event.start.date;
            console.log(`${start} - ${event.summary}`);
          });
        } else {
          console.log('No upcoming events found.');
        }
      }
    );
  }
  