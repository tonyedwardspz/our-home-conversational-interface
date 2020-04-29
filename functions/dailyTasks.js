'use strict';

const todoist = require('./todoist.js');
const dateHelper = require('./helpers/dates.js');
const responses = require('./responses/dailyTasks.js');
const BaseTaskController = require('./baseTaskController.js');

class DailyTasksController extends BaseTaskController {
    constructor() {
        console.info("Constructor: DailyTasksController instantaited");

        super('DailyTasks Controller');

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
        console.info('Doing the dishes');
        return super.isTaskTodayOrBefore(this.dishesID, responses.doDishes, 'The dishes need doing today');
    }

    async emptyLitterTray() {
        console.info('Emptying the litter tray');
        return super.isTaskTodayOrBefore(this.litterTrayID, responses.emptyLitterTray, 'Litter tray needs emptying today');
    }

    async feedBirds() {
        console.info('Feeding the birds');
        return super.isTaskTodayOrBefore(this.birdsID, responses.feedBirds, 'The birds need feeding today');
    }

    async takeOutRubbish() {
        console.info('Taking out the rubbish');
        return super.isTaskTodayOrBefore(this.rubbishID, responses.rubbish, 'The rubbish needs taking out today');
    }

    async takeOutRecycling() {
        console.info('Taking out the recycling');
        return super.isTaskTodayOrBefore(this.recyclingID, responses.recycling, 'The recycling needs taking out today');
    }

    async makeBed() {
        console.info('Making the bed');
        return super.isTaskTodayOrBefore(this.bedIS, responses.makeBed, 'The bed still needs making today');
    }

    async waterHousePlants() {
        console.info('Watering the plants');
        return super.isTaskTodayOrBefore(this.houseplantsID, responses.waterHousePlants, 'The house plants need watering today');
    }
}

module.exports = new DailyTasksController();
