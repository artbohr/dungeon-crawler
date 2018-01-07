import React, { Component } from "react";
import GridLevel from "./GridLevel";
import "../styles/App.css";

const weapons = {10:"Fists", 20:"Knife", 30:"Pistol", 40:"AK-47", 50:"RPG"};

class App extends Component {
  constructor(props) {
    super(props);
    this.rows = 30;
    this.cols = 50;

    this.state = {
      grid: Array(this.rows).fill(Array(this.cols).fill("floor")),
      playerRow: 2,
      playerCol: 2,
      health: 100,
      enemyHP: 50,
      bossHP: 250,
      weapon: 10,
      level: 1,
      fightingNow: "",
      gameLog: "Nothing Happened Yet",
      rdyToMove: true,
    };
  }

  componentDidMount() {
    this.generateLevel(this.generateWalls());
    window.addEventListener("keydown", this.movePlayer);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.movePlayer);
  }

  generateWalls = () => {
    let walls = [];
    let total = 0;
    let rNum1;

    while (total<24) {
      rNum1 = Math.floor(Math.random() * 4) + 3;
      walls.push(total+rNum1);
      total += rNum1;
    }
    return walls;
  };

  generateLevel = (walls) => {
    let newGrid = this.deepCopy(this.state.grid);
    for (let i = 0; i < this.rows; i++) {

      // generate door/doors
      let rNum = Math.floor(Math.random() * 43) + 4;

      for (let k = 0; k < this.cols; k++) {
        // place a door
        if (k===rNum && walls.indexOf(i) > -1 &&
        k !== 0 && k !== 49 && i !== 0 && i !== 29 &&
        k !== 1 && k !== 48 && i !== 1 && i !== 28){

          newGrid[i][k] = "floor";
        // wall edges
      } else if (
          k === 0 || k === 49 || i === 0 || i === 29 ||
          k === 1 || k === 48 || i === 1 || i === 28 ||
          walls.indexOf(i) > -1) {

          if (this.state.level !== 4){
            newGrid[i][k] = "wall";
          }
          else {
            newGrid[i][k] = "boss";
          }

        }
        // enemies
        if (this.state.level !== 4){
          if (newGrid[i][k] === "floor" && Math.floor(Math.random() * 100) === 1) newGrid[i][k] = "enemy";
        }
        // health boosts
        if (newGrid[i][k] === "floor" && Math.floor(Math.random() * 450) === 1) newGrid[i][k] = "health";
        // weapon upgrades
        if (newGrid[i][k] === "floor" && Math.floor(Math.random() * 650) === 1) newGrid[i][k] = "weapon";
        // player
        if (i === this.state.playerRow && k === this.state.playerCol) newGrid[i][k] = "player";

      }
    }
    // generate "level" cell
    if (this.state.level !== 4) newGrid[Math.floor(Math.random() * 25)+4][Math.floor(Math.random() * 42)+4] = "level";
    // set the new grid state
    this.setState({ grid: newGrid });
  };

  // set all the grid to floor cells
  clear = () => {
    this.setState({
      grid: Array(this.rows).fill(Array(this.cols).fill("floor")),
    });
  };

  gameOver = () =>{
    this.setState({
      grid: Array(this.rows).fill(Array(this.cols).fill("wall"))
    });

    setTimeout(()=> this.newGame(), 3000);
  }

  newGame = () =>{
    this.clear();
    this.generateLevel(this.generateWalls());

    this.setState({
        health: 100,
        level: 1,
        gameLog: "You Just Died"
    });
  };

  // you won the game
  winGame = () => {
    this.setState({
        grid: Array(this.rows).fill(Array(this.cols).fill("player")),
        gameLog: "You WON! The end."
      });
  }

  // move the player to selected (pressed key) location
  movePlayer = event => {
    //check if delay is done
    if (!this.state.rdyToMove || this.state.health<1) return;

    // prevent simultaneous calculations
    this.setState({ rdyToMove: false });

    // shorter vars to check types of cells
    let { grid, playerRow, playerCol } = this.state;

    switch (event.keyCode) {
      case 65:
        if (this.resolveCollision(grid[playerRow][playerCol - 1], playerRow, playerCol-1)) {
          this.setState({ playerCol: playerCol - 1 });
          this.updateGrid(this.state.playerRow, this.state.playerCol, "left");
        }
        break;
      case 68:
        if (this.resolveCollision(grid[playerRow][playerCol + 1], playerRow, playerCol+1)) {
          this.setState({ playerCol: playerCol + 1 });
          this.updateGrid(this.state.playerRow, this.state.playerCol, "right");
        }
        break;
      case 83:
        if (this.resolveCollision(grid[playerRow + 1][playerCol], playerRow + 1, playerCol)) {
          this.setState({ playerRow: playerRow + 1 });
          this.updateGrid(this.state.playerRow, this.state.playerCol, "down");
        }
        break;
      case 87:
        if (this.resolveCollision(grid[playerRow - 1][playerCol], playerRow - 1, playerCol)) {
          this.setState({ playerRow: playerRow - 1 });
          this.updateGrid(this.state.playerRow, this.state.playerCol, "up");
        }
        break;
      default:
        break;
    }

    // allow to move
    setTimeout(() => this.setState({ rdyToMove: true }), 5);
  };

  // update player position
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
    this.setState({
      grid: newGrid
    });
  };

  // resolve object interactions
  resolveCollision = (obj, row, col) => {
    // if is a floor cell return true right away
    if (obj === "floor") return true;

    switch (obj) {
      // wall on this cell
      case "wall":
        return false;
      // enemy on this cell
      case "enemy":
        this.fight(row, col);
        // if enemy is alive => resolve fight
        if (this.state.enemyHP > 0){
          this.setState({
            gameLog: `Player hits enemy for
             ${this.state.weapon} DMG, enemy HP: ${this.state.enemyHP}`
          });

          return false;
        // if enemy is dead => eliminate enemy
        } else {
            this.setState({
              gameLog: "Enemy Killed",
              enemyHP: 50
            });

            return true;
        }
      // increase health amount
      case "health":
        this.setState({
          health: this.state.health + 10,
          gameLog:"Player Picks +10 HP"
        });
        return true;
      // increase weapon power
      case "weapon":
        if (this.state.weapon<50) {
          this.setState({
            weapon: this.state.weapon + 10,
            gameLog:`Player upgrades weapon to ${weapons[this.state.weapon+10]}`
          });

        } else {
            this.setState({
              gameLog:"Maximum weapon reached"
            });
        }
        return true;
      // advance to next lvl
      case "level":
        this.setState({
          level: this.state.level + 1,
          gameLog: `Player advances to next level`
        });

        this.clear();
        this.generateLevel(this.generateWalls());
        break;

      case "boss":
        this.fight(row, col, "boss");
        // if boss is alive => resolve fight
        if (this.state.bossHP > 0){
          this.setState({
            gameLog: `Player hits BOSS for
             ${this.state.weapon} DMG, BOSS HP: ${this.state.bossHP}`
          });

          return false;

        } else {
          this.winGame();
          break;
        }
      default:
        break;
    }
  };

  // resolve fights
  fight = (row, col, entity) => {
    // check who are you fighting, if is a new enemy set it's HP to 50
    if (entity !== "boss"){
      if (this.state.fightingNow !== `${row}_${col}`){
        this.setState({
          enemyHP: 50,
          fightingNow: `${row}_${col}`
        });
      }

      this.setState({
        health: this.state.health - 10,
        enemyHP: this.state.enemyHP - this.state.weapon,
      });

    // if it's a boss fight
    } else {
      this.setState({
        health: this.state.health - 20,
        bossHP: this.state.bossHP - this.state.weapon,
      });
    }

    if (this.state.health < 1) this.gameOver();
  };

  // make a deep copy of the grid
  deepCopy = arr => {
    return JSON.parse(JSON.stringify(arr));
  };

  render() {
    return (
      <div>
        <h1>Roguelike Dungeon Crawler</h1>
        <div className="menu">
          {` Level:  ${this.state.level}`}
          <br />
          {`Health:  ${this.state.health}`}
          {` Weapon: ${weapons[this.state.weapon]}`}
          <br />
        </div>
        <GridLevel grid={this.state.grid} rows={this.rows} cols={this.cols}/>
        <div className="b1">
          <p>Last Action:</p>
          <p><span id="gameLog">{this.state.gameLog}</span></p>
        </div>
        <div className="b2">
          <p>Player <span className="cell player"> </span></p>
          <p>Enemy <span className="cell enemy"> </span></p>
          <p>Health <span className="cell health"> </span></p>
          <p>Weapon <span className="cell weapon"> </span></p>
          <p>Lvl Exit <span className="cell level"> </span></p>
          <p>BOSS <span className="cell boss"> </span></p>
        </div>
      </div>
    );
  }
}

export default App;
