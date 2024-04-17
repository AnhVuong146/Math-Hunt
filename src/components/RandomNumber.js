import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';

class RandomNumber extends React.Component {
    static propTypes = {
        number: PropTypes.number.isRequired,
        isDisabled: PropTypes.bool.isRequired,
        id: PropTypes.number.isRequired,
        onPress: PropTypes.func.isRequired,
        gameStatus: PropTypes.string.isRequired,
    };
    handlePress = () => {
        if (this.props.isDisabled) { return; }
        this.props.onPress(this.props.id);
        // console.log(this.props.number);
    };
    render() {

        return (
            <View style={styles.randomContainer}>
                <TouchableOpacity onPress={this.handlePress}>
                    <View style={[styles.random, this.props.isDisabled ?
                        (this.props.gameStatus === 'LOST' ? styles.STATUS_LOST : styles.disabled) : null]}>
                        <Text style={[styles.randomFontSize]}>
                            {this.props.number}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    random: {
        backgroundColor: 'burlywood',
        width: Platform.OS === 'ios' ? 125 : 100,
        marginHorizontal: Platform.OS === 'ios' ? 25 : 15,
        marginVertical: Platform.OS === 'ios' ? 33 : 14,
        alignItems: 'center',
        padding: Platform.OS === 'ios' ? 25 : 15,
        borderRadius: 20,
        borderColor: 'black',
        borderWidth: 4,
        bottom: Platform.OS === 'ios' ? 8 : 3,
    },

    randomFontSize: {
        fontSize: 45,
    },

    disabled: {
        opacity: 1,
        color: 'black',
        backgroundColor: 'lime',
    },

    STATUS_LOST: {
        opacity: 5,
        color: 'red',
        backgroundColor: 'red',
    },

});

export default RandomNumber;