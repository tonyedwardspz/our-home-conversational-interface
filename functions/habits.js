'use strict';

const todoist = require('./todoist.js');
const dateHelper = require('./helpers/dates.js');
const responses = require('./responses/habits.js');

class HabitsController {
    constructor() {
        console.info("Constructor: HabitsController instantaited");

        this.stocicID = 3464014966;
        this.clothesID = 3447677463;
        this.germanID = 3414504075;
        this.bookID = 3414648271;
    }

    async somethingStoic(){
        console.info('Consume something stoic');

        return new Promise(async (res, rej) => {

            try {
                const stoicTask = await todoist.getTask(this.stocicID);

                if (dateHelper.isToday(new Date(stoicTask.due.date))) {
                    console.info('Something stoic yet to be consumed');
    
                    await todoist.setTaskAsComplete(this.stocicID).then(() => {
                        res(responses.stoic.success);
                    });
                } else {
                    res(responses.stoic.notNeeded);
                }
            } catch(error){
                rej(responses.stoic.failure + ': ' + error).then( () => {
                    return responses.stoic.failure;
                });
            }
        });
    }

    async learnGerman(){
        console.info('Learning something German');

        return new Promise(async (res, rej) => {

            try {
                const germanTask = await todoist.getTask(this.germanID);

                if (dateHelper.isToday(new Date(germanTask.due.date))) {
                    console.info(`You've not learned anything german yet`);
    
                    await todoist.setTaskAsComplete(this.germanID).then(() => {
                        res(responses.learnGerman.success);
                    });
                } else {
                    res(responses.learnGerman.notNeeded);
                }
            } catch(error){
                rej(responses.learnGerman.failure + ': ' + error).then( () => {
                    return responses.learnGerman.failure;
                });
            }
        });
    }

    async clothesReady(){
        console.info('Getting clothes ready for tomorrow');

        return new Promise(async (res, rej) => {

            try {
                const clothesTask = await todoist.getTask(this.clothesID);

                if (dateHelper.isToday(new Date(clothesTask.due.date))) {
                    console.info(`You've not got your clothes ready yet`);
    
                    await todoist.setTaskAsComplete(this.clothesID).then(() => {
                        res(responses.clothesReady.success);
                    });
                } else {
                    res(responses.clothesReady.notNeeded);
                }
            } catch(error){
                rej(responses.clothesReady.failure + ': ' + error).then( () => {
                    return responses.clothesReady.failure;
                });
            }
        });
    }

    async onePageOfABook(){
        console.info('Reading one page of a book');

        return new Promise(async (res, rej) => {

            try {
                const bookTask = await todoist.getTask(this.bookID);

                if (dateHelper.isToday(new Date(bookTask.due.date))) {
                    console.info(`You've not read a page of a book yeat`);
    
                    await todoist.setTaskAsComplete(this.bookID).then(() => {
                        res(responses.onePage.success);
                    });
                } else {
                    res(responses.onePage.notNeeded);
                }
            } catch(error){
                rej(responses.onePage.failure + ': ' + error).then( () => {
                    return responses.onePage.failure;
                });
            }
        });
    }

}