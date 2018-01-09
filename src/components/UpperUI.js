import React, { Component } from "react";

class UpperUI extends Component {
  render() {
    console.log(this.props)
    if (!this.props.introBox) {
      return (
        <div className="menu">
          <span className="menuDungeon">{` Dungeon:  ${this.props.dungeon}`}</span>
          <br />
          <span className="menuLevel">{` Level:  ${this.props.playerLevel}`}</span>
          <span className="menuXP">{` XP:  ${this.props.playerXP}`}</span>
          <span className="menuHealth">{` Health:  ${this.props.health}`}</span>
          <span className="menuAttack">{` Attack:  ${this.props.playerAttack}`}</span>
          <span className="menuWeapon">{` Weapon: ${this.props.weapons[this.props.weapon]}`}</span>
          <br />
        </div>
      );
    } else {
      return null;
    }
  }
}

export default UpperUI;
