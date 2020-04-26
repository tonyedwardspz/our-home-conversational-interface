'use strict';

require('dotenv').config();

const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const dailyTasks = require('./dailyTasks.js');

process.env.DEBUG = 'dialogflow:debug';

exports.riverSide = functions.https.onRequest((request, response) => {
    console.warn("Riverside function hit");
    const agent = new WebhookClient({ request, response });
    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

    function welcome (agent) {
        agent.add(`You called?`);
    }

    function feedDexter (agent) {
        console.log('Function call: feed dexter from riverSide function');
        let response = dailyTasks.feedDexter();
        agent.add(response);
    }

    function fallback (agent) {
        agent.add(`I didn't understand`);
        agent.add(`I'm sorry, can you try again?`);
    }

    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);
    intentMap.set('Feed Dexter', feedDexter);
    agent.handleRequest(intentMap);
});
