import React, { Component } from "react";
import Header from "./components/Header.js";
import Instructions from "./components/Instructions.js";
import Footer from "./components/Footer.js";
import ArtistImage from "./components/ArtistImage.js";
import imageData from "./data/ImageData.js";



class App extends Component {

  // state of the data array and score variables
  state = {
    imageData,
    score: 0,
    highScore: 0
  };

  // this will run right before the page is fully loaded
  componentWillMount() {
    // randomize the array of objects everytime the page is refreshed
    // taken from w3 schools
    imageData.sort(() => 0.5 - Math.random());
  }

  // our click event for when a photo is selected
  handleOnClick = id => {
    // run these methods as soon as the photo is clicked/selected
    this.componentWillMount();
    this.increaseScore();
    this.increaseHighScore();
    // nice way to set the state I picked up from scrimba.com in the React course
    // 
    this.setState(prevState => {
      // iterate through the previous state array
      const updatedImageData = prevState.imageData.map(photo => {
        // for each index, check its ID, if it matches the photo's,
        // then set photo.clicked to true
        if (photo.id === id) {
          photo.clicked = true;
        }
        // return this index property in the original index number it was found
        return photo;
      });

      // return the updatedImageData object as the updated state
      return {
        imageData: updatedImageData

      }
    });

  }

  // this method will be used to increase the player's score
  increaseScore = () => {
    this.setState({
      score: this.state.score + 1
    });
  }

  // this method will increase the high score only if it is less than 12 and equal to the regular score
  increaseHighScore = () => {
    if (this.state.highScore < 12 && this.state.highScore === this.state.score) {
      this.setState({
        highScore: this.state.highScore + 1
      });
    }
    // since this is checked before the state of the high score is changed, once the high score is 
    // read as 12, then the user will win and reset the game
    if (this.state.score === 11) {
      alert("You won!");
      this.setState({
        highScore: this.state.highScore + 1
      });
      this.resetGame();
    }
  }

  // if a user selects a duplicate picture, alert them and reset the game, but not the high score
  incorrectGuess = () => {
    alert("Duplicate Selection! :(\nTry Again!");
    this.resetGame();
  }

  // this is basically the handleOnClick method except it will reset all values but the high score to 0
  resetGame = () => {
    this.componentWillMount();
    this.setState(prevState => {
      const updatedImageData = prevState.imageData.map(photo => {
        photo.clicked = false;
        return photo;
      });

      return {
        imageData: updatedImageData,
        score: 0
      }
    });
  }

  render() {

    // iterate through the imageData array and create a new array with the ArtistImage component layout and props
    const newImageDataArray = imageData.map(image =>
      <ArtistImage
        photo={image}
        key={image.id}
        // quick ternary expression to see if photo is clicked already
        onClick={image.clicked ? this.incorrectGuess : this.handleOnClick}
      />
    )

    return (
      // our page layout with our components and props being passed down to them
      <div>
        <Header
          score={this.state.score}
          highScore={this.state.highScore} 
          />
        <Instructions
          score={this.state.score}
          highScore={this.state.highScore}
        />
        <div className="container row">
          {newImageDataArray}
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
