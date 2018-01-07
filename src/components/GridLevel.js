import React, { Component } from "react";
import GameCell from "./GameCell";

class GridLevel extends Component {
  render() {
    let cellClass = "";
    let extraClass = "hidden";
    let arr = [];

    // creates cells on the grid
    for (let i = 0; i < this.props.rows; i++) {
      for (let k = 0; k < this.props.cols; k++) {

        // set visibility, default: hidden
        extraClass = "hidden";

        // set player to visible
        if (this.props.grid[i][k] === "player") extraClass = "notHidden";

        // if walls are not wall borders, check if there is a player close
        // if there is set the cell to visible (in the field of view)
        if (k > 0 && k < 49 && i > 0 && i < 29) {
          if (
            this.props.grid[i + 1][k] === "player" ||
            this.props.grid[i - 1][k] === "player" ||
            this.props.grid[i][k + 1] === "player" ||
            this.props.grid[i][k - 1] === "player" ||
            this.props.grid[i - 1][k - 1] === "player" ||
            this.props.grid[i + 1][k + 1] === "player" ||
            this.props.grid[i - 1][k + 1] === "player" ||
            this.props.grid[i + 1][k - 1] === "player"
          ) {
            extraClass = "notHidden";
          }
        }

        // extend visibility by 1 cell
        if (k > 1 && k < 48 && i > 1 && i < 28) {
          if (
            this.props.grid[i + 2][k] === "player" ||
            this.props.grid[i - 2][k] === "player" ||
            this.props.grid[i][k + 2] === "player" ||
            this.props.grid[i][k - 2] === "player" ||
            this.props.grid[i - 2][k - 2] === "player" ||
            this.props.grid[i + 2][k + 2] === "player" ||
            this.props.grid[i - 2][k + 2] === "player" ||
            this.props.grid[i + 2][k - 2] === "player" ||
            this.props.grid[i + 2][k - 1] === "player" ||
            this.props.grid[i + 2][k + 1] === "player" ||
            this.props.grid[i + 1][k - 2] === "player" ||
            this.props.grid[i - 1][k - 2] === "player" ||
            this.props.grid[i - 2][k + 1] === "player" ||
            this.props.grid[i - 2][k - 1] === "player" ||
            this.props.grid[i + 1][k + 2] === "player" ||
            this.props.grid[i - 1][k + 2] === "player"
          ) {
            extraClass = "notHidden2";
          }
        }

        // if it's the map border set visibility to visible
        if (k === 0 || k === 49 || i === 0 || i === 29) extraClass = "notHidden";
        if (k === 1 || k === 48 || i === 1 || i === 28) extraClass = "notHidden";

        // set cell class
        cellClass = `cell ${this.props.grid[i][k]} ${extraClass}`;

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
