'use strict';

const {Dragon} = require('./dragon');

class Attack {
  constructor(...aParameters) {
    let dragon;

    if (aParameters[0] instanceof Dragon) {
      dragon = aParameters[0];
    } else {
      dragon = new Dragon(aParameters[0].dragon);
    }

    this.dragon = dragon;
  }
}

module.exports.Attack = Attack;
