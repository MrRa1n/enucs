# ENUCS Website
[![Build Status](https://travis-ci.com/MrRa1n/enucs.svg?token=gys1DHnnbw7by8y6URN7&branch=develop)](https://travis-ci.com/MrRa1n/enucs)  

This is the official repository for the current Edinburgh Napier University Computing Society (ENUCS) website. The website has been built using Node.js with Pug templating engine. The purpose of the website is for enabling users to find information about the society including events, minutes and financials.

You can view the live website at https://enucs.org.uk.

## Deploy
To deploy the website locally:

`git clone https://github.com/enucs/enucs.git`

Ensure you have Postgres installed.

Run the SQL file in `database/` to set up the database tables.

Update `config/database.json` to use the credentials for the database.

Add `tokens.json` to `config/` to add the correct Twitter API token.

`npm install`

`npm run debug` when developing.

## Update
To update the website on the ENUCS server:

`ssh enucs.org.uk`

`cd /srv/enucs`

`sudo git pull`

`npm run build`

`sudo pm2 restart app`
