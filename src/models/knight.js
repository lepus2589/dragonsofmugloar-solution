class Knight {
  _isValid(aName, aAttack, aArmor, aAgility, aEndurance) {
    return typeof aName === 'string' &&
      aName.length > 0 &&
      typeof aAttack === 'number' &&
      aAttack <= 10 &&
      typeof aArmor === 'number' &&
      aArmor <= 10 &&
      typeof aAgility === 'number' &&
      aAgility <= 10 &&
      typeof aEndurance === 'number' &&
      aEndurance <= 10 &&
      aAttack + aArmor + aAgility + aEndurance === 20;
  }

  constructor(...aParameters) {
    let name, attack, armor, agility, endurance;

    if (aParameters.length === 1 && typeof aParameters[0] === 'object') {
      const knight = aParameters[0];
      name = knight.name;
      attack = knight.attack;
      armor = knight.armor;
      agility = knight.agility;
      endurance = knight.endurance;
    } else {
      [name, attack, armor, agility, endurance] = aParameters;
    }

    if (!this._isValid(name, attack, armor, agility, endurance)) {
      throw new Error('Invalid parameters for Knight model.');
    }

    this.name = name;
    this.attack = attack;
    this.armor = armor;
    this.agility = agility;
    this.endurance = endurance;
  }
}

export {Knight};
