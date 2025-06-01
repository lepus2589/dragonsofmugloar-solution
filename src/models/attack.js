import * as models from './index.js'

class Attack {
  constructor(...aParameters) {
    let dragon;

    if (aParameters[0] instanceof models.Dragon) {
      dragon = aParameters[0];
    } else {
      dragon = new models.Dragon(aParameters[0].dragon);
    }

    this.dragon = dragon;
  }
}

export {Attack};
