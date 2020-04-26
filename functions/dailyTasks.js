'use strict';

const todoist = require('./todoist.js');

class DailyTasksController {
  constructor() {
    console.info("Constructor: DailyTasksController instantaited");

    this.dexterAM = 3390004422;
    this.dexterPM = 3760124687;
    this.dishes = 3441528837;
    this.litterTray = 3413457465;
    this.birds = 3386738503;
    this.rubbish = 3386702538;
    this.recycling = 3447640080;
    this.bed = 3441526986;
    this.houseplants = 3447632731;
  }

  feedDexter() {
    console.info('Feeding Dexter');

    // get the two tasks

    // get current datetime

    // check that they're for today

    // check whether its before or after 2pm

    // mark the relevant task as done.

    todoist.setTaskAsComplete(this.dexterAM);

    return `I've noted that Dexter has been fed.`;
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
