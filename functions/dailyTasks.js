'use strict';

const todoist = require('./todoist.js');
const dateHelper = require('./helpers/dates.js');

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
        console.info('Feeding Dexter');

        return new Promise(async (res, rej) => {
            // get the two tasks.
            let amFeed;
            let pmFeed;
            try {
                amFeed = await todoist.getTask(this.feedDexterAMID).catch(error => {
                    rej('error getting am feed: ' + error);
                });
                pmFeed = await todoist.getTask(this.feedDexterPMID).catch(error => {
                    rej('error getting pm feed: ' + error);
                });
            } catch(err) {
                rej('error getting feed dexter tasks: ' + err);
            }

            // get all the dates
            const now = new Date();
            const amFeedDate = new Date(amFeed.due.datetime);
            const pmFeedDate = new Date(pmFeed.due.datetime);
            console.info('now: ' + now + '\nAM feed: ' + amFeedDate + '\nPM feed: ' + pmFeedDate);

            // check whether its before or after now and mark as done appropriatly
            if (dateHelper.isToday(amFeedDate) && now > amFeedDate) {
                console.info('AM feed is before now');

                await todoist.setTaskAsComplete(this.feedDexterAMID).then(() => {
                    res(`I've noted that Dexter has been fed this morning.`);
                });
            } else if (dateHelper.isToday(pmFeedDate) && now > pmFeedDate) {
                await todoist.setTaskAsComplete(this.feedDexterPMID).then(() => {
                    res(`I've noted that Dexter has been fed this evening.`);
                });
            } else {
                res(`Dexter does not need to be fed right now.`);
            }
        });
    }

    async doDishes() {
        return `I've noted that dishes have been done.`;
    }

    async enptyLitterTray() {
        console.info('Emptying the litter tray');

        return new Promise(async (res, rej) => {

            try {
                const litterTrayTask = await todoist.getTask(this.litterTrayID);

                if (dateHelper.isToday(new Date(litterTrayTask.due.date))) {
                    console.info('Litter tray needs emptying today');
    
                    await todoist.setTaskAsComplete(this.litterTrayID).then(() => {
                        res(`I've noted that the litter tray has been emptied.`);
                    });
                } else {
                    res(`The litter tray does not need emptying right now.`);
                }
            } catch(error){
                rej('ERROR emptying litter tray ' + error);
            }
        });
    }

    async feedBirds() {
        console.info('Feeding the birds');

        return new Promise(async (res, rej) => {

            try {
                const feedBirdsTask = await todoist.getTask(this.birdsID);

                if (dateHelper.isToday(new Date(feedBirdsTask.due.date))) {
                    console.info('The birds need feeding today');
    
                    await todoist.setTaskAsComplete(this.birdsID).then(() => {
                        res(`I've noted that the birds have been fed.`);
                    });
                } else {
                    res(`The birds do not need feeding right now.`);
                }
            } catch(error){
                rej('ERROR feeding birds');
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
        console.info('Making the bed');

        return new Promise(async (res, rej) => {

            try {
                const makeBedTask = await todoist.getTask(this.bedID);

                if (dateHelper.isToday(new Date(makeBedTask.due.date))) {
                    console.info('The bed still needs making today');
    
                    await todoist.setTaskAsComplete(this.bedID).then(() => {
                        res(`I've noted that the bed has been made.`);
                    });
                } else {
                    res(`The bed dosen't need making right now.`);
                }
            } catch(error){
                rej('ERROR making the bed');
            }
        });
    }

    async waterHousePlants() {
        return `I've noted that house plants have been watered.`;
    }
}

module.exports = new DailyTasksController();
