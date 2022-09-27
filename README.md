# bilal-google-meet

To run:
node app.js https://meet.google.com/random-string-here

1. Add puppeteer package to open the link in browser
2. Use puppeteer for web scraping
3. Add setinterval for checking the meeting is end or not.
4. On end of meeting:
    * Stop the recording
    * Save it locally
    * close the browser