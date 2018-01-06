import React, { Component } from "react";
import GameCell from "./GameCell";

class GridLevel extends Component {
  render() {
    let cellClass = "";
    let extraClass = "hidden";
    let arr = [];
    //let explored = {};//explored[`key:${i}_${k}`] = extraClass;

    // creates cells on the grid
    for (let i = 0; i < this.props.rows; i++) {
      for (let k = 0; k < this.props.cols; k++) {

        cellClass = `cell ${this.props.grid[i][k]}`;

        if (this.props.grid[i][k] === "player") {
          extraClass = "notHidden"
        }

        if (k > 0 && k < 49 && i > 0 && i < 29 ){
          if (this.props.grid[i+1][k] ===  "player"  ||
              this.props.grid[i-1][k] ===  "player"  ||
              this.props.grid[i][k+1] ===  "player"  ||
              this.props.grid[i][k-1] ===  "player"  ||
              this.props.grid[i-1][k-1] === "player" ||
              this.props.grid[i+1][k+1] === "player" ||
              this.props.grid[i-1][k+1] === "player" ||
              this.props.grid[i+1][k-1] === "player" ||
              this.props.grid[i][k] === "player"){

                extraClass = "notHidden";
          } else {
            extraClass = "hidden";
          }
        } else{
          extraClass = "notHidden";
        }

        arr.push(
          <GameCell
            cellClass={cellClass}
            key={`key:${i}_${k}`}
            extraClass={extraClass}
          />
        );
        extraClass = "hidden"
      }
    }

    return <div className="grid">{arr}</div>;
  }
}

export default GridLevel;
