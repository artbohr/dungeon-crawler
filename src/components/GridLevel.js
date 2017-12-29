import React, { Component } from "react";
import GameCell from "./GameCell";

class GridLevel extends Component {
  render() {
    let cellClass = "";
    let arr = [];

    // creates cells on the grid
    for (let i = 0; i < this.props.rows; i++) {
      for (let k = 0; k < this.props.cols; k++) {
        //cellClass = this.props.grid[i][k] === ? "floor cell" : "wall cell";
        switch(this.props.grid[i][k]){
          case 0:
            cellClass = "cell wall"
            break;
          case 1:
            cellClass = "cell floor"
            break;
          case 2:
            cellClass = "cell player"
            break;
          case 3:
            cellClass = "cell enemy"
            break;

          default:
            cellClass = "cell floor"
            break;

        }
        arr.push(
          <GameCell
            cellClass={cellClass}
            key={`key:${i}_${k}`}
            //colorizeCell={this.props.colorizeCell}
            i={i}
            k={k}
          />
        )
      }
    }

    return <div className="grid">{arr}</div>;
  }
}

export default GridLevel;
