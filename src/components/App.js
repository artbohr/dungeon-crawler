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
    //this.generateRooms3();
    document.addEventListener("keydown", this.movePlayer);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.movePlayer);
  }

/*
  generateRooms = () => {
    let newGrid = this.deepCopy(this.state.grid);
    let rNum = Math.floor(Math.random() * 10) + 4;

    //while (rNum < 30 || col_pos < 30){
    // generate 1 cubic room
      for (let i = row_pos; i < rNum; i++) {
        for (let k = col_pos; k < rNum; k++) {
          // place wall cell
          console.log(i,k)
          if (i === row_pos || i === rNum-1 || k === col_pos || k===rNum-1) newGrid[i][k] = "wall";

          }
        }
      //}

    this.setState({ grid: newGrid });
  };*/
  /*
  generateRooms2 = () => {
    /*
    while( !secondline && r + rNum < this.rows )
  	//offset = 2
  	height = 2
  	r = 48
  	secondline = false

  	if r +rNum > 49 && !secondline
  	r = 0
  	secondline = true
  	height + 12

  	total = rNum + offset

  	2=>12, 14=>24, 26=>36, 38=>48


  	reserve (r c) = 2, 2  going to -> rNum (5)
  	[
  	[2,2][2,3][2,4][2,5][2,6]
  	[3,2]			          [3,6]
  	[4,2]			          [4,6]
  	[5,2]			          [5,6]
  	[6,2][6,3][6,4][6,5][6,6]
  	]
  //offset = 2
  r = rNum//+offset
  c = rNum//+offset

  new rNum ()

    let result = []
    let secondline = false;
    let offset = 2;
    let rNum = Math.floor(Math.random() * 10) + 4;
    let row = 2;
    let col = 2;

    while (row + rNum < this.rows) {

      result.push([row+rNum+offset, rNum]);
      row+=(rNum+offset)
      rNum = Math.floor(Math.random() * 10) + 4;


      if (row + rNum+offset > 49 && !secondline){
        console('ch')
      	row = 0
      	secondline = true
      	col += 12
      }
    }
    console.log(result);
  };*/

  generateWalls = () => {
    let walls = [];
    let total = 0;
    let rNum1;

    while (total<25) {
      rNum1 = Math.floor(Math.random() * 6) + 2;
      walls.push(total+rNum1);
      total += rNum1;
    }

    console.log(walls);
    console.log(total);
    return walls;
  };

  generateLevel = (walls) => {
    let rNum = Math.floor(Math.random() * 45) + 5;
    let limit = 2;
    //this.generateRooms();
    //console.log("generating");
    let newGrid = this.deepCopy(this.state.grid);
    for (let i = 0; i < this.rows; i++) {
      //if (i === 0 || i === 29) continue;
      for (let k = 0; k < this.cols; k++) {
        rNum = Math.floor(Math.random() * 45) + 5;
        // wall edges
        //
        if (k === 0 || k === 49 || i === 0 || i === 29 || walls.indexOf(i) > -1) {
          newGrid[i][k] = "wall";
          //newGrid[i][Math.floor(walls.indexOf(i)+10/2)] = "floor";
          //continue;
        }
        if (walls.indexOf(i) > -1 && i!==0 && i !==29 && limit > 0){
          newGrid[i][rNum] = "floor";
          limit -= 1;
        }

        /*
        if (i===1 && k===1){
          newGrid[i][k] = "level"
        }*/
        //enemies
        //if (Math.floor(Math.random() * 30) === 10) newGrid[i][k] = "enemy";
        // health
        //if (Math.floor(Math.random() * 100) === 10) newGrid[i][k] = "health";
        // weapon
        //if (Math.floor(Math.random() * 200) === 10) newGrid[i][k] = "weapon";
        //player
        if (i === this.state.playerRow && k === this.state.playerCol)
          newGrid[i][k] = "player";
      }
      limit = 2
    }
    this.setState({ grid: newGrid });
  };

  clear = () => {
    this.setState({
      grid: Array(this.rows).fill(Array(this.cols).fill("floor"))
    });
  };

  movePlayer = event => {
    // shorter vars to check if types of cells
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
        document.getElementById("field_name").textContent =
          "Player Picks +10 HP";
        return true;
      // increase weapon power
      case "weapon":
        this.setState({ weapon: this.state.weapon + 10 });
        document.getElementById("field_name").textContent =
          "Player Picks +10 Weapon";
        return true;
      // advance to next lvl
      case "level":
        document.getElementById("field_name").textContent =
          "Player advances to next level";
        this.setState({ weapon: this.state.level + 1 });
        this.clear();
        this.generateLevel();
        break;

      // floor
      default:
        return true;
    }
  };

  fight = () => {};

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
          {`Health:  ${this.state.health}`}
          {` Weapon: ${this.state.weapon}`}
          {` Level:  ${this.state.level}`}
          <br />
          {/*` Row: ${this.state.playerRow} Col: ${this.state.playerCol}`*/}
        </div>
        <GridLevel grid={this.state.grid} rows={this.rows} cols={this.cols} />
        <div style={{ margin: "10px" }}>
          Last Action: <span id="field_name">Nothing Happened Yet</span>
        </div>
      </div>
    );
  }
}

export default App;
