import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Animated, ImageBackground, Platform } from 'react-native';
import RandomNumber from './RandomNumber';
import shuffle from 'lodash.shuffle';

class Game extends React.Component {
    static propTypes = {
        randomNumberCount: PropTypes.number.isRequired,
        remainingSeconds: PropTypes.number.isRequired,
        onPlayAgain: PropTypes.func.isRequired,
        highscore: PropTypes.number.isRequired,
        playAgainButton: PropTypes.func.isRequired,
    };

    state = {
        selectedIds: [],
    };

    gameStatus = 'PLAYING';

    randomNumbers = Array.from({ length: this.props.randomNumberCount })
        .map(() => 1 + Math.floor(10 * Math.random()));

    target = this.randomNumbers
        .slice(0, this.props.randomNumberCount - 2) //creates a new array that excludes the last two elements
        .reduce((acc, curr) => acc + curr, 0) //iterates through the new array and accumulate it starting with 0
    
    shuffledRandomNumbers = shuffle(this.randomNumbers);

    isNumberSelected = (numberIndex) => {
        return this.state.selectedIds.indexOf(numberIndex) >= 0;
    };

    selectNumber = (numberIndex) => {
        this.setState((prevState) => ({
            selectedIds: [...prevState.selectedIds, numberIndex], //copy original array and then add the number index
        }));                                                              //The spread operator (...) is used to copy the contents of the previous array into a new array, to which numberIndex is then added.
    };

    componentDidUpdate(prevProps, prevState) {
        // Check if remainingSeconds has changed to 0 and end the game if it has
        if (this.props.remainingSeconds === 0 && prevProps.remainingSeconds !== 0) {
          this.endGame();
        } else if (prevState.selectedIds !== this.state.selectedIds) {
          this.updateGameStatus();
        }
      }
    
      endGame = () => {
        // Explicitly setting game status to LOST when timer hits 0
        this.gameStatus = 'LOST';
        this.forceUpdate(); // This makes React re-render the component to reflect the updated status
      };
    
      updateGameStatus = () => {
        // This remains as your existing logic to calculate game status based on selected numbers
        this.gameStatus = this.calcGameStatus();
        // Optionally call this.forceUpdate() here if you're manipulating `gameStatus` directly without calling setState
        this.forceUpdate();
    };

    calcGameStatus = () => {
        const sumSelected = this.state.selectedIds.reduce((acc, curr) => {
            return acc + this.shuffledRandomNumbers[curr];
        }, 0);
        
        if (this.props.remainingSeconds === 0) {
            return 'LOST';
        }
        if (sumSelected < this.target){
            return 'PLAYING';
        }
        if (sumSelected === this.target){
            this.props.onPlayAgain(true); // Player won, pass true
            return 'WON';
        }
        
        if (sumSelected > this.target){
            this.props.onPlayAgain(false); // Player lost, pass false
            return 'LOST';
        }  
    };

    render() {
        const gameStatus = this.gameStatus;
        console.log(this.gameStatus);

        return (
            <View style={styles.container}>
                <View style={[styles.target, styles[`STATUS_${gameStatus}`]]}>
                    <Text style={[styles.targetFontSize]}>{this.target}</Text>
                </View>
                <View style={styles.randomContainer}>
                    {this.shuffledRandomNumbers.map((randomNumber, index) =>
                        <RandomNumber
                            key={index}
                            id={index}
                            number={randomNumber}
                            isDisabled={this.isNumberSelected(index) || gameStatus !== 'PLAYING'}
                            gameStatus={gameStatus}
                            onPress={this.selectNumber}
                        />
                    )}
                </View>
                <View style={styles.highscore}>
                    <Text style = {styles.highscoreFontSize}>SCORE: {this.props.highscore}</Text>
                </View>

                <View style={styles.timer}>
                    <Text style={styles.timerFontSize}>  {this.props.remainingSeconds}</Text>
                </View>
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'mediumseagreen',
        backgroundColor: '#70a980',
        flex: 1,
        // paddingTop: Platform.OP === 'ios' ? 60 : 20,
    },

    target: {
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        // marginHorizontal: 50,
        // marginTop: 50,
        margin: 25,
        borderRadius: 20,
        flexWrap: 'wrap',
        borderColor: 'black',
        borderWidth: 4,
        padding: 10,
        marginTop: Platform.OS === 'ios' ? 50: 20,
    },

    targetFontSize: {
        fontSize: 50,
    },

    randomContainer: {
        justifyContent: 'space-around',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: 'darkslategrey',
        borderColor: 'lightgreen',
        borderRadius: 20,
        borderWidth: 8,
        padding: 0,
        margin: 20,
        marginBottom: Platform.OS === 'ios' ? 0 : -10,
    },

    STATUS_PLAYING: {
        backgroundColor: 'white',
    },

    STATUS_WON: {
        backgroundColor: 'lime',
    },

    STATUS_LOST: {
        backgroundColor: 'red',
    },

    timer: {
        backgroundColor: 'darkslategrey',
        marginLeft: Platform.OS === 'ios' ? 40 : 40,
        marginRight: Platform.OS === 'ios' ? 335 : 325,
        color: 'white',
        borderRadius: 20,
        marginBottom: 10,
        bottom: Platform.OS === 'ios' ? 20 : 0,
        left: 10,
    },

    timerFontSize: {
        fontSize: 25,
        color: 'white',
    },

    highscore: {
        alignContent: 'center',
        alignItems: 'center',
        margin: 20,
        marginTop: Platform.OS === 'ios' ? 35 : 35,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10, 
        flexWrap: 'wrap',
        marginHorizontal: 95,
        marginBottom: Platform.OS === 'ios' ? 50 : 15,
    },

    highscoreFontSize: {
        fontSize: 24,
    },

    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    }
    
});

export default Game;