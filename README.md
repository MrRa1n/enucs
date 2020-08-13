# ENUCS Website
[![Build Status](https://travis-ci.com/MrRa1n/enucs.svg?token=gys1DHnnbw7by8y6URN7&branch=develop)](https://travis-ci.com/MrRa1n/enucs)  

This is the official repository for the current Edinburgh Napier University Computing Society (ENUCS) website. The website has been built using Node.js with Pug templating engine. The purpose of the website is for enabling users to find information about the society including events, minutes and financials.

You can view the live website at https://enucs.org.uk.

## Deployment
To deploy on the ENUCS server:

`ssh enucs.org.uk`

`cd /srv/enucs`

`sudo git pull`

`sudo pm2 restart app`


