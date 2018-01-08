import React, { Component } from "react";

class UpperUI extends Component {
  render() {
    if (!this.props.introBox) {
      return (
        <div className="menu">
          <span className="menuDungeon">{` Dungeon:  ${this.props.dungeon}`}</span>
          <br />
          <span className="menuHealth">{`Health:  ${this.props.health}`}</span>
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
