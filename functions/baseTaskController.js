'use strict';

const todoist = require('./todoist.js');
const dateHelper = require('./helpers/dates.js');

class BaseTaskController {
    constructor(origin) {
        console.info(`Constructor: BaseTaskController instantiated from ${origin}`);
    }

    async isTodayTask(id, responses, message){
        return new Promise(async (res, rej) => {

            try {
                const task = await todoist.getTask(id).catch(error => {
                    console.warn(error);
                });

                if (dateHelper.isToday(new Date(task.due.date))) {
                    console.info(message);
    
                    await todoist.setTaskAsComplete(id).then(() => {
                        res(responses.success);
                    });
                } else {
                    res(responses.notNeeded);
                }
            } catch(error){
                rej(responses.failure + ': ' + error).then( () => {
                    return responses.failure;
                });
            }
        });
    }
}

module.exports = BaseTaskController;
