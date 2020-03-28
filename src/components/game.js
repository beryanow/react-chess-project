import React from 'react';

import '../index.css';
import Board from './board.js';
import initializeBoard from "./board_structure_creator";

export default class Game extends React.Component {
    constructor() {
        super(undefined);
        this.state = {
            squares: initializeBoard(),
            sourceSelection: -1,
            player: 1
        }
    }

    isMoveLegal(srcToDestPath, forward) {
        let isLegal = true;
        for (let i = 0; i < srcToDestPath.length; i++) {
            if (this.state.squares[srcToDestPath[i]] !== null) {
                isLegal = false;
            }
        }

        if (this.state.squares[forward] !== null && this.state.squares[forward].player === this.state.player) {
            isLegal = false;
        }

        return isLegal;
    }

    handleClick(i) {
        if (this.state.sourceSelection === -1) {
            if (this.state.squares[i] && (this.state.squares[i].player === this.state.player)) {
                const squares = this.state.squares.slice();
                squares[i].style = {...this.state.squares[i].style, backgroundColor: "#3F4077"};

                this.setState({squares: squares, sourceSelection: i});
            }
        } else {
            const squares = this.state.squares.slice();
            const previous = this.state.sourceSelection;

            squares[previous].style = {...this.state.squares[previous].style, backgroundColor: null};

            this.setState({squares: squares});

            const beat = !!squares[i];
            const isMovePossible = squares[previous].isMovePossible(previous, i, beat);
            const stepwisePath = squares[previous].getStepwisePath(previous, i);
            const isMoveLegal = this.isMoveLegal(stepwisePath, i);

            if (isMovePossible && isMoveLegal) {
                squares[i] = squares[previous];
                squares[previous] = null;

                let player = this.state.player === 1 ? 2 : 1;
                this.setState({
                    sourceSelection: -1,
                    squares: squares,
                    player: player
                });
            } else {
                this.setState({
                    sourceSelection: -1,
                    squares: squares
                });
            }
        }
    }

    render() {
        return (
            <div>
                <div className="game">
                    <div className="game-board">
                        <Board squares={this.state.squares}
                               onClick={(i) => this.handleClick(i)}/>
                    </div>
                </div>
            </div>
        );
    }
}

