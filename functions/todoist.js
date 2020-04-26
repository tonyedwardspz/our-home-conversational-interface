'use strict';

const todoistAPI = require('todoist-rest-api').default;
const functions = require('firebase-functions');

class TodoistController {
    constructor() {
        console.info('Constructor: TodistController instantaited');

        this.todoistToken = functions.config().todoist.id ? functions.config().todoist.id : process.env.TODOIST_TOKEN;
        this.todoist = todoistAPI(this.todoistToken);
    }

    getProjectTasks (projectID) {
        console.info('Function Call: Get project tasks');

        (async () => {
            let tasks = await this.todoist.v1.task.findAll({project_id: projectID}).catch(error => {
                console.warn(error);
            });
        
            console.info(tasks);
            return tasks;
        })();
    }

    getTask(taskID) {
        console.info('Function Call: Get task');

        (async () => {
            let task = await this.todoist.v1.task.find(taskID).catch(error => {
                console.warn(error);
            });

            console.info('Task Found: ', task);
            return task;
        })();
    }

    setTaskAsComplete(taskID) {
        console.info('Function Call: Set task as complete');

        (async () => {
            let task = await this.todoist.v1.task.close(taskID).catch(error => {
                console.warn(error);
            });

            console.info('Task Closed: ', task);
            return task;
        })();
    }
}

module.exports = new TodoistController();