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

            if (parseInt(previous / 8) % 2 === 0) {
                if (previous % 2 === 0) {
                    squares[previous].style = {...this.state.squares[previous].style, backgroundColor: "#9CAAF8"};
                } else {
                    squares[previous].style = {...this.state.squares[previous].style, backgroundColor: "#6F73D2"};
                }
            } else {
                if (previous % 2 === 0) {
                    squares[previous].style = {...this.state.squares[previous].style, backgroundColor: "#6F73D2"};
                } else {
                    squares[previous].style = {...this.state.squares[previous].style, backgroundColor: "#9CAAF8"};
                }
            }

            this.setState({squares: squares, sourceSelection: -1});

            const isMovePossible = squares[previous].isMovePossible(previous, i);

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

