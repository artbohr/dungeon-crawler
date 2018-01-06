import React, { Component } from "react";

class GameCell extends Component {

  render() {
    return (
      <div
        className={`${this.props.cellClass} ${this.props.extraClass}`}
      />
    );
  }
}

export default GameCell;
