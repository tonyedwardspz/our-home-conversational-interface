'use strict';

const responses = require('./responses/regularTasks.js');
const BaseTaskController = require('./baseTaskController.js');

class RegularTasksController extends BaseTaskController {
    constructor() {
        super('Regular Tasks controller');

        this.foodWasteID = 3759539435;
        this.dampTrapsID = 3515033861;
        this.greenHouseID = 3386723556;
        this.meterReadingsID = 3851055740;
        this.smokeDetectorsID = 3860064155;
    }

    async foodWaste(){
        console.info('Emptying food waste');
        return super.isTaskTodayOrBefore(this.foodWasteID, responses.foodWaste);
    }

    async dampTraps(){
        console.info('Checking the damp traps');
        return super.isTaskTodayOrBefore(this.dampTrapsID, responses.dampTraps);
    }

    async greenHouse(){
        console.info('Sorting out the green house');
        return super.isTaskTodayOrBefore(this.greenHouseID, responses.greenHouse);
    }

    async meterReadings(){
        console.info('Submitting the meter readings');
        return super.isTaskTodayOrBefore(this.meterReadingsID, responses.meterReadings);
    }

    async smokeDetectors(){
        console.info('Checking the smoke detectors');
        return super.isTaskTodayOrBefore(this.smokeDetectorsID, responses.smokeDetectors);
    }
}

module.exports = new RegularTasksController();
