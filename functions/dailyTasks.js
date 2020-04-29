'use strict';

const todoist = require('./todoist.js');
const dateHelper = require('./helpers/dates.js');
const responses = require('./responses/dailyTasks.js');

class DailyTasksController {
    constructor() {
        console.info("Constructor: DailyTasksController instantaited");

        this.feedDexterAMID = 3390004422;
        this.feedDexterPMID = 3760124687;
        this.dishesID = 3441528837;
        this.litterTrayID = 3413457465;
        this.birdsID = 3386738503;
        this.rubbishID = 3386702538;
        this.recyclingID = 3447640080;
        this.bedID = 3441526986;
        this.houseplantsID = 3447632731;
    }

    async feedDexter() {
        console.info(responses.feedDexter.info);

        return new Promise(async (res, rej) => {
            // get the two tasks.
            let amFeed;
            let pmFeed;
            try {
                amFeed = await todoist.getTask(this.feedDexterAMID).catch(error => {
                    rej(responses.feedDexter.failureAM + ': ' + error).then( () => {
                        return responses.feedDexter.failureAM;
                    });
                });
                pmFeed = await todoist.getTask(this.feedDexterPMID).catch(error => {
                    rej(responses.feedDexter.failurePM + ': ' + error).then( () => {
                        return responses.feedDexter.failurePM;
                    });
                });
            } catch(err) {
                rej(responses.feedDexter.failureGeneral + ': ' + err).then( () => {
                    return responses.feedDexter.failureGeneral;
                });
            }

            // get all the dates
            const now = new Date();
            const amFeedDate = new Date(amFeed.due.datetime);
            const pmFeedDate = new Date(pmFeed.due.datetime);
            console.info('now: ' + now + '\nAM feed: ' + amFeedDate + '\nPM feed: ' + pmFeedDate);

            // check whether its before or after now and mark as done appropriatly
            if (dateHelper.isToday(amFeedDate) && now > amFeedDate) {
                console.info('Dexter needs feeding this morning');
                await todoist.setTaskAsComplete(this.feedDexterAMID).then(() => {
                    res(responses.feedDexter.successMorning);
                });
            } else if (dateHelper.isToday(pmFeedDate) && now > pmFeedDate) {
                console.info('Dexter needs feeding this evening');
                await todoist.setTaskAsComplete(this.feedDexterPMID).then(() => {
                    res(responses.feedDexter.successEvening);
                });
            } else {
                res(responses.feedDexter.notNeeded);
            }
        });
    }

    async doDishes() {
        return `I've noted that dishes have been done.`;
    }

    async emptyLitterTray() {
        console.info(responses.emptyLitterTray.info);

        return new Promise(async (res, rej) => {

            try {
                const litterTrayTask = await todoist.getTask(this.litterTrayID);

                if (dateHelper.isToday(new Date(litterTrayTask.due.date))) {
                    console.info('Litter tray needs emptying today');
    
                    await todoist.setTaskAsComplete(this.litterTrayID).then(() => {
                        res(responses.emptyLitterTray.success);
                    });
                } else {
                    res(responses.emptyLitterTray.notNeeded);
                }
            } catch(error){
                rej(responses.emptyLitterTray.failure + ': ' + error).then( () => {
                    return responses.emptyLitterTray.failure;
                });
            }
        });
    }

    async feedBirds() {
        console.info(responses.feedBirds.info);

        return new Promise(async (res, rej) => {

            try {
                const feedBirdsTask = await todoist.getTask(this.birdsID);

                if (dateHelper.isToday(new Date(feedBirdsTask.due.date))) {
                    console.info('The birds need feeding today');
    
                    await todoist.setTaskAsComplete(this.birdsID).then(() => {
                        res(responses.feedBirds.success);
                    });
                } else {
                    res(responses.feedBirds.notNeeded);
                }
            } catch(error){
                rej(responses.feedBirds.failure + ': ' + error).then( () => {
                    return responses.feedBirds.failure;
                });
            }
        });
    }

    async takeOutRubbish() {
        return `I've noted that the rubish has been taken out`;
    }

    async takeOutRecycling() {
        return `I've noted that  the recycling has been taken out.`;
    }

    async makeBed() {
        console.info(responses.makeBed.info);

        return new Promise(async (res, rej) => {

            try {
                const makeBedTask = await todoist.getTask(this.bedID);

                if (dateHelper.isToday(new Date(makeBedTask.due.date))) {
                    console.info('The bed still needs making today');
    
                    await todoist.setTaskAsComplete(this.bedID).then(() => {
                        res(responses.makeBed.success);
                    });
                } else {
                    res(responses.makeBed.notNeeded);
                }
            } catch(error){
                rej(responses.makeBed.failure + ': ' + error).then( () => {
                    return responses.makeBed.failure;
                });
            }
        });
    }

    async waterHousePlants() {
        return `I've noted that house plants have been watered.`;
    }
}

module.exports = new DailyTasksController();
