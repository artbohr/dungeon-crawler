import React, { Component } from "react";

class WelcomeBox extends Component {
  render() {
    if (this.props.introBox) {
      return (
        <div className="welcomeBox" onClick={this.props.hideIntro}>

          <h2 className="instructions">MOVE WITH</h2>

          <div className="keys">
            <img className="key" alt="w_image" src={"http://www.clipartoday.com/_thumbspd/computer/computer/computer_key_W_9012.png"}/>
            <img className="key" alt="a_image" src={"http://www.clipartoday.com/_thumbspd/computer/computer/computer_key_A_9012.png"}/>
            <img className="key" alt="s_image" src={"http://www.clipartoday.com/_thumbspd/computer/computer/computer_key_S_9012.png"}/>
            <img className="key" alt="d_image" src={"http://www.clipartoday.com/_thumbspd/computer/computer/computer_key_D_9012.png"}/>
          </div>

          <h3 className="instructions2"> Reach level 4 and beat the Boss to win.</h3>
          <h4 className="instructions3"> Click to begin </h4>

        </div>
      );
    } else {
      return null;
    }
  }
}

export default WelcomeBox;
