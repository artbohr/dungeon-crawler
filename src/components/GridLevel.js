import React, { Component } from "react";
import GameCell from "./GameCell";

class GridLevel extends Component {
  render() {
    let cellClass = "";
    let arr = [];

    // creates cells on the grid
    for (let i = 0; i < this.props.rows; i++) {
      for (let k = 0; k < this.props.cols; k++) {

        switch(this.props.grid[i][k]){
          case "wall":
            cellClass = "cell wall";
            break;
          case "floor":
            cellClass = "cell floor";
            break;
          case "player":
            cellClass = "cell player";
            break;
          case "enemy":
            cellClass = "cell enemy";
            break;
          case "health":
            cellClass = "cell health";
            break;
          case "weapon":
            cellClass = "cell weapon";
            break;
          case "level":
            cellClass = "cell level";
            break;
          case "boss":
            cellClass = "cell boss";
            break;

          default:
            break;

        }
        arr.push(
          <GameCell
            cellClass={cellClass}
            key={`key:${i}_${k}`}
          />
        );
      }
    }

    return <div className="grid">{arr}</div>;
  }
}

export default GridLevel;
