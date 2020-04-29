'use strict';

const responses = require('./responses/habits.js');
const BaseTaskController = require('./baseTaskController.js');

class HabitsController extends BaseTaskController {
    constructor() {
        console.info("Constructor: HabitsController instantaited");

        super('Habits controller');

        this.stocicID = 3464014966;
        this.clothesID = 3447677463;
        this.germanID = 3414504075;
        this.bookID = 3414648271;
    }

    async somethingStoic(){
        console.info('Consume something stoic');
        return super.isTaskTodayOrBefore(this.stocicID, responses.stoic, `Something stoic yet to be consumed`);
    }

    async learnGerman(){
        console.info('Learning something German');
        return super.isTaskTodayOrBefore(this.germanID, responses.learnGerman, `You've not learned anything german yet`);
    }

    async clothesReady(){
        console.info('Getting clothes ready for tomorrow');
        return super.isTaskTodayOrBefore(this.clothesID, responses.clothesReady, `You've not got your clothes ready yet`);
    }

    async onePageOfABook(){
        console.info('Reading one page of a book');
        return super.isTaskTodayOrBefore(this.bookID, responses.onePage, `You've not read a page of a book yet`);
    }
}

module.exports = new HabitsController();
