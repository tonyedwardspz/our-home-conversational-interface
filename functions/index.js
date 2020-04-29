'use strict';

require('dotenv').config();

const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const dailyTasks = require('./dailyTasks.js');
const habits = require('./habits.js');

// Deploy versioning
const version = 0.19
console.info(`V${version} deploy datetime is ${new Date}`)

process.env.DEBUG = 'dialogflow:debug';

// Testing function calls
//let task = dailyTasks.feedDexter(); // Testing function call
//let task = habits.somethingStoic();

exports.riverSide = functions.https.onRequest((request, response) => {
    console.info("Riverside function hit");
    console.info('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.info('Dialogflow Request body: ' + JSON.stringify(request.body));

    const agent = new WebhookClient({ request, response });

    function welcome(agent) {
        // agent.add(`V ${version}`);
        agent.add(`You called?`);
    }

    async function feedDexter() {
        console.info('Function call: feed dexter from riverSide function');
        let response = await dailyTasks.feedDexter();
        console.info(response);
        agent.add(response);
    }

    async function doDishes() {
        console.info('Function call: doing dishes from riverSide function');
        let response = await dailyTasks.doDishes();
        console.info(response);
        agent.add(response);
    }

    async function emptyLitterTray() {
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

    async function takeOutRubbish(agent) {
        console.info('Function call: take out rubbish from riverSide function');
        let response = await dailyTasks.takeOutRubbish();
        console.info(response);
        agent.add(response);
    }

    async function takeOutRecycling(agent) {
        console.info('Function call: take out recycling from riverSide function');
        let response = await dailyTasks.takeOutRecycling();
        console.info(response);
        agent.add(response);
    }

    async function makeBed() {
        console.info('Function call: making bed from riverSide function');
        let response = await dailyTasks.makeBed();
        console.info(response);
        agent.add(response);
    }

    async function waterHousePlants() {
        console.info('Function call: watering plants from riverSide function');
        let response = await dailyTasks.waterHousePlants();
        console.info(response);
        agent.add(response);
    }

    async function somethingStoic() {
        console.info('Function call: something stoic from riverSide function');
        let response = await habits.somethingStoic();
        console.info(response);
        agent.add(response);
    }

    async function learnGerman() {
        console.info('Function call: learn german from riverSide function');
        let response = await habits.learnGerman();
        console.info(response);
        agent.add(response);
    }

    async function clothesReady() {
        console.info('Function call: clothes from riverSide function');
        let response = await habits.clothesReady();
        console.info(response);
        agent.add(response);
    }

    async function onePageOfABook() {
        console.info('Function call: One page of a book from riverSide function');
        let response = await habits.onePageOfABook();
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

    // Setup daily tasks
    intentMap.set('Feed Dexter', feedDexter);
    intentMap.set('Do Dishes', doDishes);
    intentMap.set('Empty Litter Tray', emptyLitterTray);
    intentMap.set('Feed Birds', feedBirds);
    intentMap.set('Take Out The Rubbish', takeOutRubbish);
    intentMap.set('Take Out The Recycling', takeOutRecycling)
    intentMap.set('Make Bed', makeBed);
    intentMap.set('Water House Plants', waterHousePlants);

    // Setup habits
    intentMap.set('Something Stoic', somethingStoic);
    intentMap.set('Learn German', learnGerman);
    intentMap.set('Clothes Ready', clothesReady);
    intentMap.set('One Page Of A Book', onePageOfABook)

    agent.handleRequest(intentMap);
});
