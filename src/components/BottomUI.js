import React, { Component } from "react";

class BottomUI extends Component {
  render() {
    if (!this.props.introBox) {
      return (
        <div>
          <div className="b1">
            <p>Last Action:</p>
            <p><span id="gameLog">{this.props.gameLog}</span></p>
          </div>
          <div className="b2">
            <p>Player <span className="cell player"> </span></p>
            <p>Enemy <span className="cell enemy"> </span></p>
            <p>Health <span className="cell health"> </span></p>
            <p>Weapon <span className="cell weapon"> </span></p>
            <p>Lvl Exit <span className="cell level"> </span></p>
            <p>BOSS <span className="cell boss"> </span></p>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default BottomUI;
