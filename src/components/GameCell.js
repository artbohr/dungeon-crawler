import React, { Component } from "react";

class GameCell extends Component {

  render() {
    return (
      <div
        className={this.props.cellClass}
      />
    );
  }
}

export default GameCell;
