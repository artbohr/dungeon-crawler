import React, { Component } from "react";

class GameCell extends Component {
  render() {
    return (
      <div
        className={this.props.cellClass}
        //onClick={() => this.props.colorizeCell(this.props.i, this.props.k)} 
      />
    );
  }
}

export default GameCell;
