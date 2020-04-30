'use strict';

require('dotenv').config();

const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const dailyTasks = require('./dailyTasks.js');
const habits = require('./habits.js');
const regularTasks = require('./regularTasks.js');

// Deploy versioning
const version = 0.21;
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

    function simpleResponse(response) {
        console.info(response);
        agent.add(response);
    }

    function welcome(agent) {
        // agent.add(`V ${version}`);
        agent.add(`You called?`);
    }

    async function feedDexter() {
        console.info('Function call: feed dexter from riverSide function');
        await dailyTasks.feedDexter().then(response => {
            simpleResponse(response);
        });
    }

    async function doDishes() {
        console.info('Function call: doing dishes from riverSide function');
        await dailyTasks.doDishes().then(response => {
            simpleResponse(response);
        });
    }

    async function emptyLitterTray() {
        console.info('Function call: emptying litter from riverSide function');
        await dailyTasks.emptyLitterTray().then(response => {
            simpleResponse(response);
        });
    }

    async function feedBirds(agent) {
        console.info('Function call: feeding birds from riverSide function');
        await dailyTasks.feedBirds().then(response => {
            simpleResponse(response);
        });
    }

    async function takeOutRubbish(agent) {
        console.info('Function call: take out rubbish from riverSide function');
        await dailyTasks.takeOutRubbish().then(response => {
            simpleResponse(response);
        });
    }

    async function takeOutRecycling(agent) {
        console.info('Function call: take out recycling from riverSide function');
        await dailyTasks.takeOutRecycling().then(response => {
            simpleResponse(response);
        });
    }

    async function makeBed() {
        console.info('Function call: making bed from riverSide function');
        await dailyTasks.makeBed().then(response => {
            simpleResponse(response);
        });
        
    }

    async function waterHousePlants() {
        console.info('Function call: watering plants from riverSide function');
        await dailyTasks.waterHousePlants().then(response => {
            simpleResponse(response);
        });
    }

    async function somethingStoic() {
        console.info('Function call: something stoic from riverSide function');
        await habits.somethingStoic().then(response => {
            simpleResponse(response);
        });
    }

    async function learnGerman() {
        console.info('Function call: learn german from riverSide function');
        await habits.learnGerman().then(response => {
            simpleResponse(response);
        });
    }

    async function clothesReady() {
        console.info('Function call: clothes from riverSide function');
        await habits.clothesReady().then(response => {
            simpleResponse(response);
        });
    }

    async function onePageOfABook() {
        console.info('Function call: One page of a book from riverSide function');
        await habits.onePageOfABook().then(response => {
            simpleResponse(response);
        });
    }

    async function foodWaste() {
        console.info('Function call: Food Waste from riverSide function');
        await regularTasks.foodWaste().then(response => {
            simpleResponse(response);
        });
    }

    async function dampTraps() {
        console.info('Function call: Damp Traps from riverSide function');
        await regularTasks.dampTraps().then(response => {
            simpleResponse(response);
        });
    }

    async function greenHouse() {
        console.info('Function call: Green house from riverSide function');
        await regularTasks.greenHouse().then(response => {
            simpleResponse(response);
        });
    }

    async function meterReadings() {
        console.info('Function call: Meter readings from riverSide function');
        await regularTasks.meterReadings().then(response => {
            simpleResponse(response);
        });
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

    // Regular Tasks
    intentMap.set('Food Waste', foodWaste);    
    intentMap.set('Damp Traps', dampTraps);
    intentMap.set('Green House', greenHouse);
    intentMap.set('Meter Readings', meterReadings);  

    agent.handleRequest(intentMap);
});
