'use strict';

require('dotenv').config();

const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const dailyTasks = require('./dailyTasks.js');

// Deploy versioning
const version = 0.15
console.info(`V${version} deploy datetime is ${new Date}`)

process.env.DEBUG = 'dialogflow:debug';

//let task = dailyTasks.feedDexter(); // Testing function call

exports.riverSide = functions.https.onRequest((request, response) => {
    console.info("Riverside function hit");
    console.info('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.info('Dialogflow Request body: ' + JSON.stringify(request.body));

    const agent = new WebhookClient({ request, response });

    function welcome(agent) {
        // agent.add(`V ${version}`);
        agent.add(`You called?`);
    }

    async function feedDexter(agent) {
        console.info('Function call: feed dexter from riverSide function');
        let response = await dailyTasks.feedDexter();
        console.info(response);
        agent.add(response);
    }

    async function emptyLitterTray(agent) {
        console.info('Function call: emptying litter from riverSide function');
        let response = await dailyTasks.emptyLitterTray();
        console.info(response);
        agent.add(response);
    }

    async function feedBirds(agent) {
        console.info('Function call: feeding birds from riverSide function');
        let response = await dailyTasks.feedBirds();
        console.info(response);
        agent.add(response);
    }

    async function makeBed(agent) {
        console.info('Function call: making bed from riverSide function');
        let response = await dailyTasks.makeBed();
        console.info(response);
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
    intentMap.set('Feed Birds', feedBirds);
    intentMap.set('Make Bed', makeBed);
    agent.handleRequest(intentMap);
});
