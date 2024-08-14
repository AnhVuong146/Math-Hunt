import React from "react";
import { View, Text, StyleSheet, Modal, Button, Platform, TouchableOpacity } from "react-native";
import Game from "./Game";

const CustomButton = ({ onPress, title, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

class HomeScreen extends React.Component {
  state = {
    gameId: 1,
    highscore: 0,
    remainingSeconds: 80, //starting time
    showModal: false,
    showInstructions: true,
  };

  // componentDidMount() {
  //   this.startTimer();
  // }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.remainingSeconds !== 0 && this.state.remainingSeconds === 0) {
      // alert("SCORE: " + this.state.highscore)
      this.setState({ showModal: true });
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  startTimer = () => {
    this.timerId = setInterval(() => {
      this.setState(
        (prevState) => ({
          remainingSeconds: prevState.remainingSeconds - 1,
        }),
        () => {
          if (this.state.remainingSeconds === 0) {
            //prevent from going negative seconds
            clearInterval(this.timerId);
          }
        }
      );
    }, 1000);
  };

  resetTimer = () => {
    clearInterval(this.timerId);
    this.setState({ remainingSeconds: 80 }); // Reset to initialSeconds
    this.startTimer();
  };

  updateHighscore = (gameWon = false) => {
    this.setState((prevState) => ({
      highscore: gameWon
        ? prevState.highscore + 1
        : Math.max(0, prevState.highscore - 1),
    }));
  };

  resetGame = (gameWon) => {
    this.setState((prevState) => {
      return { gameId: prevState.gameId + 1 };
    });
    this.updateHighscore(gameWon); // Update highscore based on game outcome
  };

  playAgain = () => {
    this.setState((prevState) => {
      return { gameId: prevState.gameId + 1, highscore: 0 };
    }, this.resetTimer);
  };

  render() {
    return (
      <View style={styles.container}>
        {/* Instructions Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.showInstructions}
          onRequestClose={() => {
            this.setState({ showInstructions: false });
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalGameName}>Welcome to Math Hunt!</Text>
              <Text style={styles.modalCredit}>
                Created by Anh Vuong
              </Text>
              <Text />
              <Text style={styles.modalInstructions}>Instructions: </Text>
              <Text style={styles.modalInstructions}>
                Select numbers that add up to the target sum displayed at the top to earn a point. 
                You'll lose a point for every incorrect guess. 
                You have 80 seconds. Good luck!
              </Text>
              <Text />
              {/* <Button title="Start Game" onPress={() => { 
                this.setState({ showInstructions: false }); 
                this.playAgain(); // Start the timer when the game starts
              }}/> */}
              <CustomButton style={styles.CustomButton}
                title="Start Game" onPress={() => {
                  this.setState({ showInstructions: false });
                  this.playAgain(); // Start the timer when the game starts
                }}
              />
            </View>
          </View>
        </Modal>

        {/* Time's Up Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.showModal}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setState({ showModal: false });
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>TIME'S UP!</Text>
              <Text style={styles.modalText}>
                {" "}
                SCORE: {this.state.highscore}{" "}
              </Text>
              <CustomButton
                title="Play Again"
                onPress={() => {
                  this.playAgain();
                  this.setState({ showModal: false }); // Close the modal when the user decides to play again
                }}
              />
            </View>
          </View>
        </Modal>
        <Game
          key={this.state.gameId}
          onPlayAgain={this.resetGame}
          randomNumberCount={6}
          remainingSeconds={this.state.remainingSeconds}
          highscore={this.state.highscore}
          playAgainButton={this.playAgain}
          updateTimer={this.updateTimer}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Platform.OS === "ios" ? 0 : 22,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 40,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 25,
  },
  modalGameName: {
    fontSize: 28,
    fontStyle: "normal",
    color: "mediumseagreen",
  },
  modalCredit: {
    fontSize: 15,
    color: "red",
    fontStyle: "italic",
  },

  modalInstructions: {
    fontSize: 19,
    textAlign: "center",

  },

  button: {
    backgroundColor: 'dodgerblue', // Button background color
    padding: 15, // Padding inside the button
    borderRadius: 25, // Rounded corners
    alignItems: 'center', // Center the text inside the button
    justifyContent: 'center',
    width: 200, // Button width
    marginTop: 20, // Margin on top
    shadowColor: "#000", // Shadow for button to make it pop a bit
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white', // Text color
    fontSize: 18, // Text size
  },

});

export default HomeScreen;
