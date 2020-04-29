'use strict';

const responses = require('./responses/habits.js');
const BaseTaskController = require('./baseTaskController.js');

class HabitsController extends BaseTaskController {
    constructor() {

        super('Habits controller');

        this.stoicID = 3464014966;
        this.clothesID = 3447677463;
        this.germanID = 3414504075;
        this.bookID = 3414648271;
    }

    async somethingStoic(){
        console.info('Consume something stoic');
        return super.isTaskTodayOrBefore(this.stoicID, responses.stoic);
    }

    async learnGerman(){
        console.info('Learning something German');
        return super.isTaskTodayOrBefore(this.germanID, responses.learnGerman);
    }

    async clothesReady(){
        console.info('Getting clothes ready for tomorrow');
        return super.isTaskTodayOrBefore(this.clothesID, responses.clothesReady);
    }

    async onePageOfABook(){
        console.info('Reading one page of a book');
        return super.isTaskTodayOrBefore(this.bookID, responses.onePage);
    }
}

module.exports = new HabitsController();
