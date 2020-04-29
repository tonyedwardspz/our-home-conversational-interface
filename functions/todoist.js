'use strict';

const todoistAPI = require('todoist-rest-api').default;
const functions = require('firebase-functions');

class TodoistController {
    constructor() {
        console.info('Constructor: TodistController instantaited');

        this.todoistToken = functions.config().todoist.id ? functions.config().todoist.id : process.env.TODOIST_TOKEN;
        this.todoist = todoistAPI(this.todoistToken);
    }

    async getProjectTasks (projectID) {
        console.info('Function Call: Get project tasks');

        return new Promise((res, rej) => {
            this.todoist.v1.task.findAll({project_id: projectID}).then( tasks => {
                res(tasks);
            }).catch(error => {
                console.warn(error);
                rej(error);
            });
        });
    }

   async getTask(taskID) {
        console.info('Function Call: Get task');

        return new Promise((res, rej) => {
            this.todoist.v1.task.find(taskID).then( task => {
                console.info(task);
                res(task);
            }).catch(error => {
                console.warn(error);
                rej(error);
            });
        });
    }

    async setTaskAsComplete(taskID) {
        console.info('Function Call: Set task as complete');

        return new Promise((res, rej) => {
            this.todoist.v1.task.close(taskID).then( closed => {
                res(closed);
            }).catch(error => {
                console.warn(error);
                rej(error);
            });
        });
    }
}

module.exports = new TodoistController();