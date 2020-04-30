'use strict';

const todoist = require('./todoist.js');
const dateHelper = require('./helpers/dates.js');

class BaseTaskController {
    constructor(origin) {
        console.info(`Constructor: BaseTaskController instantiated from ${origin}`);
    }

    async isTaskTodayOrBefore(id, responses){
        return new Promise(async (res, rej) => {

            try {
                const task = await todoist.getTask(id).catch(error => {
                    rej(responses.responses.failure + ': ' + error).then(() => {
                        console.warn(responses.failure);
                        return responses.failure;
                    });
                });

                const dueDate = new Date(task.due.date)
                if (dateHelper.isToday(dueDate) || dueDate  < new Date()) {
                    console.info(responses.notDoneYet);
    
                    await todoist.setTaskAsComplete(id).then(() => {
                        res(responses.success);
                    });
                } else {
                    res(responses.notNeeded);
                }
            } catch(error){
                rej(responses.failure + ': ' + error).then(() => {
                    return responses.failure;
                });
            }
        });
    }
}

module.exports = BaseTaskController;
