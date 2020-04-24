'use strict';

class DexterController {
  constructor() {}

  feed(agent) {
    agent.add(`I've noted that Dexter has been fed.`);
  }

}

module.exports = new DexterController();
