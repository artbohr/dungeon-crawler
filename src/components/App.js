import React, { Component } from "react";
import GridLevel from "./GridLevel";
//import Player from "./Player";
import "../styles/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.rows = 30;
    this.cols = 50;

    this.state = {
      grid: Array(this.rows).fill(Array(this.cols).fill(1)),
      playerRow: 15,
      playerCol: 25,
      health: 100,
      weapon: 0,
      level: 0
    };
  }

  /*
  CELLS:

  wall = 0
  floor = 1
  player = 2
  enemy = 3
  hp = 4
  weapon_up = 5

  */

  componentDidMount() {
    this.generateLevel();
    document.addEventListener("keydown", this.movePlayer);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.movePlayer);
  }

  movePlayer = event => {
    // shorter vars to check if types of cells
    let {grid, playerRow, playerCol} = this.state;

    switch (event.keyCode) {
      case 65:
        this.setState({ playerCol: this.state.playerCol - 1 });
        this.update(this.state.playerRow, this.state.playerCol, "left");
        break;
      case 68:
        this.setState({ playerCol: this.state.playerCol + 1 });
        this.update(this.state.playerRow, this.state.playerCol, "right");
        break;
      case 83:
        this.setState({ playerRow: this.state.playerRow + 1 });
        this.update(this.state.playerRow, this.state.playerCol, "down");
        break;
      case 87:
        this.setState({ playerRow: this.state.playerRow - 1 });
        this.update(this.state.playerRow, this.state.playerCol, "up");
        break;
      default:
        break;
    }
  };

  generateLevel = () => {
    console.log("generating");
    let newGrid = this.deepCopy(this.state.grid);
    for (let i = 0; i < this.rows; i++) {
      //if (i === 0 || i === 29) continue;
      for (let k = 0; k < this.cols; k++) {
        // wall edges
        if (k === 0 || k === 49 || i === 0 || i === 29) {
          newGrid[i][k] = 0; continue;
        }
        //enemies
        if (Math.floor(Math.random() * 30) === 10) newGrid[i][k] = 3;
        //player
        if (i === this.state.playerRow && k === this.state.playerCol) newGrid[i][k] = 2;
      }
    }
    this.setState({ grid: newGrid });
  };

  //check cell denomination
  //if floor (0) = can move there and delete floor cell to place player cell(2)
  //if wall (1) = can't move there
  update = (i, k, where) => {
    let newGrid = this.deepCopy(this.state.grid);

    //newGrid[i][k] = 2;
    console.log(newGrid[i][k])
    newGrid[i][k] = 2;

    switch (where) {
      case "left":
        newGrid[i][k + 1] = 1;
        break;
      case "right":
        newGrid[i][k - 1] = 1;
        break;
      case "up":
        newGrid[i + 1][k] = 1;
        break;
      case "down":
        newGrid[i - 1][k] = 1;
        break;
      default:
        break;
    }
    //newGrid[i][k] = 2;
    this.setState({ grid: newGrid });
  };

  deepCopy = arr => {
    return JSON.parse(JSON.stringify(arr));
  };

  render() {
    return (
      <div>
        <h1>Roguelike Dungeon Crawler</h1>
        {/*<button onClick={this.generateLevel}>generate </button>*/}
        <div className="menu">
          {`Health:  ${this.state.health}`}
          {` Weapon: ${this.state.weapon}`}
          {` Level:  ${this.state.level}`}
          <br/>
          {` Row: ${this.state.playerRow} Col: ${this.state.playerCol}`}
        </div>
        <GridLevel grid={this.state.grid} rows={this.rows} cols={this.cols} />
      </div>
    );
  }
}

export default App;
