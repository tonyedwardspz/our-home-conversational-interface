'use strict';

const todoistAPI = require('todoist-rest-api').default;
const functions = require('firebase-functions');

class TodoistController {
    constructor() {
        console.info('Constructor: TodistController instantaited');

        this.todoistToken = functions.config().todoist.id ? functions.config().todoist.id : process.env.TODOIST_TOKEN;
        
    }

    async getProjectTasks (projectID) {
        console.info('Function Call: Get project tasks');
        this.todoist = todoistAPI(this.todoistToken);

        try {
            return new Promise((res, rej) => {
                this.todoist.v1.task.findAll({project_id: projectID}).then( tasks => {
                    res(tasks);
                }).catch(error => {
                    console.warn(error);
                    rej(error);
                });
            });
        } catch(err){
            console.warn('ERROR IN GET TASK FUNCTION: ', err);
        }
    }

   async getTask(taskID) {
        console.info('Function Call: Get task');
        this.todoist = todoistAPI(this.todoistToken);

        return new Promise((res, rej) => {
            this.todoist.v1.task.find(taskID).then( task => {
                res(task);
            }).catch(error => {
                console.warn(error);
                rej(error);
            });
        });
    }

    async setTaskAsComplete(taskID) {
        console.info('Function Call: Set task as complete');
        this.todoist = todoistAPI(this.todoistToken);

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