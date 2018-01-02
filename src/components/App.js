import React, { Component } from "react";
import GridLevel from "./GridLevel";
//import Player from "./Player";
import "../styles/App.css";

const weapons = {10:"Fists", 20:"Knife", 30:"Pistol", 40:"AK-47", 50:"RPG"};

class App extends Component {
  constructor(props) {
    super(props);
    this.rows = 30;
    this.cols = 50;
    //this.classes = ["cell wall","cell player","cell enemy","cell health","cell weapon","cell level","cell floor"];

    this.state = {
      grid: Array(this.rows).fill(Array(this.cols).fill("floor")),
      playerRow: 1,
      playerCol: 1,
      health: 100,
      enemy: 50,
      weapon: 10,
      level: 1
    };
  }

  componentDidMount() {
    this.generateLevel(this.generateWalls());
    document.addEventListener("keydown", this.movePlayer);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.movePlayer);
  }

  generateWalls = () => {
    let walls = [];
    let total = 0;
    let rNum1;

    while (total<24) {
      rNum1 = Math.floor(Math.random() * 4) + 2;
      walls.push(total+rNum1);
      total += rNum1;
    }
    return walls;
  };

  generateLevel = (walls) => {
    let newGrid = this.deepCopy(this.state.grid);
    for (let i = 0; i < this.rows; i++) {

      // generate door/doors
      let rNum = Math.floor(Math.random() * 44) + 4;

      for (let k = 0; k < this.cols; k++) {
        // place a door
        if (k===rNum && walls.indexOf(i) > -1){
          newGrid[i][k] = "floor";
        // wall edges
        } else if (k === 0 || k === 49 || i === 0 || i === 29 || walls.indexOf(i) > -1) {
          newGrid[i][k] = "wall";
        }
        // enemies
        if (newGrid[i][k] === "floor" && Math.floor(Math.random() * 160) === 1) newGrid[i][k] = "enemy";
        // health
        if (newGrid[i][k] === "floor" && Math.floor(Math.random() * 600) === 1) newGrid[i][k] = "health";
        // weapon upgrade
        if (newGrid[i][k] === "floor" && Math.floor(Math.random() * 800) === 1) newGrid[i][k] = "weapon";
        // player
        if (i === this.state.playerRow && k === this.state.playerCol) newGrid[i][k] = "player";

      }
    }
    // generate "level" cell
    newGrid[Math.floor(Math.random() * 28)+2][Math.floor(Math.random() * 47)+2] = "level";
    // set the new grid state
    this.setState({ grid: newGrid });
  };

  clear = () => {
    this.setState({
      grid: Array(this.rows).fill(Array(this.cols).fill("floor"))
    });
  };

  movePlayer = event => {
    // shorter vars to check types of cells
    let { grid, playerRow, playerCol } = this.state;

    switch (event.keyCode) {
      case 65:
        if (this.resolveCollision(grid[playerRow][playerCol - 1])) {
          this.setState({ playerCol: playerCol - 1 });
          this.updateGrid(this.state.playerRow, this.state.playerCol, "left");
        }
        break;
      case 68:
        if (this.resolveCollision(grid[playerRow][playerCol + 1])) {
          this.setState({ playerCol: playerCol + 1 });
          this.updateGrid(this.state.playerRow, this.state.playerCol, "right");
        }
        break;
      case 83:
        if (this.resolveCollision(grid[playerRow + 1][playerCol])) {
          this.setState({ playerRow: playerRow + 1 });
          this.updateGrid(this.state.playerRow, this.state.playerCol, "down");
        }
        break;
      case 87:
        if (this.resolveCollision(grid[playerRow - 1][playerCol])) {
          this.setState({ playerRow: playerRow - 1 });
          this.updateGrid(this.state.playerRow, this.state.playerCol, "up");
        }
        break;
      default:
        break;
    }
  };

  // resolve object interactions
  resolveCollision = obj => {
    switch (obj) {
      // wall on this cell
      case "wall":
        return false;
      // enemy on this cell
      case "enemy":
        return false;
      // increase health amount
      case "health":
        this.setState({ health: this.state.health + 10 });
        document.getElementById("gameLog").textContent =
          "Player Picks +10 HP";
        return true;
      // increase weapon power
      case "weapon":
        if (this.state.weapon<50) {
          this.setState({ weapon: this.state.weapon + 10 });
          document.getElementById("gameLog").textContent =
            `Player upgrades weapon to ${weapons[this.state.weapon]}`;
        } else {
          document.getElementById("gameLog").textContent =
            "Maximum weapon reached";
        }

        return true;
      // advance to next lvl
      case "level":
        document.getElementById("gameLog").textContent =
          "Player advances to next level";
        this.setState({ level: this.state.level + 1 });
        this.clear();
        this.generateLevel(this.generateWalls());
        break;

      // floor
      default:
        return true;
    }
  };

  fight = () => {

  };

  updateGrid = (i, k, where) => {
    let newGrid = this.deepCopy(this.state.grid);

    newGrid[i][k] = "player";

    switch (where) {
      case "left":
        newGrid[i][k + 1] = "floor";
        break;
      case "right":
        newGrid[i][k - 1] = "floor";
        break;
      case "up":
        newGrid[i + 1][k] = "floor";
        break;
      case "down":
        newGrid[i - 1][k] = "floor";
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
          {` Level:  ${this.state.level}`}
          <br />
          {`Health:  ${this.state.health}`}
          {` Weapon: ${weapons[this.state.weapon]}`}
          <br />
          {/*` Row: ${this.state.playerRow} Col: ${this.state.playerCol}`*/}
        </div>
        <GridLevel grid={this.state.grid} rows={this.rows} cols={this.cols} />
        <div className="b1">
          <p>Last Action:</p>
          <p><span id="gameLog">Nothing Happened Yet</span></p>
        </div>
        <div className="b2">
          <p>Player <span className="cell player"> </span></p>
          <p>Enemy <span className="cell enemy"> </span></p>
          <p>Health <span className="cell health"> </span></p>
          <p>Weapon <span className="cell weapon"> </span></p>
          <p>Lvl Exit <span className="cell level"> </span></p>
        </div>
      </div>
    );
  }
}

export default App;
