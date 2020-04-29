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

        // get the two tasks
        const amFeed = await todoist.getTask(this.feedDexterAMID);
        const pmFeed = await todoist.getTask(this.feedDexterPMID);

        // get all the dates
        const now = new Date();
        const amFeedDate = new Date(amFeed.due.datetime);
        const pmFeedDate = new Date(pmFeed.due.datetime);
        console.info('now: ' + now + '\nAM feed: ' + amFeedDate + '\nPM feed: ' + pmFeedDate);

        // check whether its before or after now and mark as done appropriatly
        if (dateHelper.isToday(amFeedDate) && now > amFeedDate) {
            console.log('AM feed is before now');

            await todoist.setTaskAsComplete(this.feedDexterAMID).then(() => {
                return `I've noted that Dexter has been fed this morning.`;
            });
            
        } else if (dateHelper.isToday(pmFeedDate) && now > pmFeedDate) {
            await todoist.setTaskAsComplete(this.feedDexterPMID).then(() => {
                return `I've noted that Dexter has been fed this evening.`;
            });
        } else {
            console.log('No feeding needed right now');
            return `Dexter does not need to be fed right now.`;
        }
    }

    doDishes() {
        return `I've noted that dishes have been done.`;
    }

    enptyLitterTray() {
        return `I've noted that the littler tray has been emptied.`;
    }

    feedBirds() {
        return `I've noted that the birds has been fed.`;
    }

    takeOutRubbish() {
        return `I've noted that the rubish has been taken out`;
    }

    takeOutRecycling() {
        return `I've noted that  the recycling has been taken out.`;
    }

    makeBed() {
        return `I've noted that the bed has been made.`;
    }

    waterHousePlants() {
        return `I've noted that house plants have been watered.`;
    }
}

module.exports = new DailyTasksController();
