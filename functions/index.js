'use strict';

require('dotenv').config();

const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const dailyTasks = require('./dailyTasks.js');

// Deploy versioning
const version = 0.13
console.info(`V${version} deploy datetime is ${new Date}`)

process.env.DEBUG = 'dialogflow:debug';

//let task = dailyTasks.feedDexter(); // Testing function call

exports.riverSide = functions.https.onRequest((request, response) => {
    console.warn("Riverside function hit");
    const agent = new WebhookClient({ request, response });
    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

    function welcome(agent) {
        agent.add(`V ${version}`);
        agent.add(`You called?`);
    }

    async function feedDexter(agent) {
        console.info('Function call: feed dexter from riverSide function');
        let response = await dailyTasks.feedDexter();
        agent.add(response);
    }

    async function emptyLitterTray(agent) {
        console.info('Function call: emptying litter from riverSide function');
        let response = await dailyTasks.emptyLitterTray();
        agent.add(response);
    }
        agent.add(response);
    }

    function emptyLitterTray(agent) {
        console.log('Function call: feed dexter from riverSide function');
        let response = dailyTasks.emptyLitterTray();
        agent.add(response);
    }

    function fallback(agent) {
        agent.add(`I didn't understand`);
        agent.add(`I'm sorry, can you try again?`);
    }

    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);
    intentMap.set('Feed Dexter', feedDexter);
    intentMap.set('Empty Litter Tray', emptyLitterTray);
    agent.handleRequest(intentMap);
});
