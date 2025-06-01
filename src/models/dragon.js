class Dragon {
  _isValid(aScaleThickness, aClawSharpness, aWingStrength, aFireBreath) {
    return typeof aScaleThickness === 'number' &&
      aScaleThickness <= 10 &&
      typeof aClawSharpness === 'number' &&
      aClawSharpness <= 10 &&
      typeof aWingStrength === 'number' &&
      aWingStrength <= 10 &&
      typeof aFireBreath === 'number' &&
      aFireBreath <= 10 &&
      aScaleThickness + aClawSharpness + aWingStrength + aFireBreath === 20;
  }

  constructor(...aParameters) {
    let scaleThickness, clawSharpness, wingStrength, fireBreath;

    if (aParameters.length === 1 && typeof aParameters[0] === 'object') {
      const dragon = aParameters[0];
      scaleThickness = dragon.scaleThickness;
      clawSharpness = dragon.clawSharpness;
      wingStrength = dragon.wingStrength;
      fireBreath = dragon.fireBreath;
    } else {
      [scaleThickness, clawSharpness, wingStrength, fireBreath] = aParameters;
    }

    if (!this._isValid(scaleThickness, clawSharpness, wingStrength, fireBreath)) {
      throw new Error('Invalid parameters for Dragon model.');
    }

    this.scaleThickness = scaleThickness;
    this.clawSharpness = clawSharpness;
    this.wingStrength = wingStrength;
    this.fireBreath = fireBreath;
  }
}

export {Dragon};
