import React from 'react';

import '../index.css';
import Board from './board.js';
import initializeBoard from "./board_structure_creator";
import King from "../pieces/king";

export default class Game extends React.Component {
    constructor() {
        super(undefined);
        this.state = {
            squares: initializeBoard(),
            sourceSelection: -1,
            whiteKing: 60,
            blackKing: 4,
            player: 1,
            borders: [0, 1, 2, 3, 4, 5, 6, 7, 56, 57, 58, 59, 60, 61, 62, 63,
                15, 23, 31, 39, 47, 55, 8, 16, 24, 32, 40, 48]
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

    isPathEmpty(src, squares) {
        let isLegal = true;
        let flag = -1;
        for (let i = 0; i < src.length; i++) {
            if (this.state.borders.indexOf(src[i]) !== -1) {
                if (flag === 1) {
                    return false;
                }
                flag = 1;
            }
            if (squares[src[i]] !== null) {
                isLegal = false;
            }
        }

        return isLegal;
    }

    isCheck(squares, king) {
        let threats = [];

        for (let i = 0; i < 64; i++) {
            if (squares[i] !== null) {
                if (this.state.player !== squares[i].player) {
                    if (squares[i].isCheck(i, king)) {
                        threats.push(i);
                    }
                }
            }
        }

        let editThreats = threats.slice();

        for (let i = 0; i < threats.length; i++) {
            const stepWisePathToKing = squares[threats[i]].getStepwisePath(threats[i], king);
            if (!this.isPathEmpty(stepWisePathToKing, squares)) {
                editThreats.splice(editThreats.indexOf(threats[i]), 1);
            }
        }

        return editThreats.length > 0;
    }

    handleClick(i) {
        if (this.state.sourceSelection === -1) {
            if (this.state.squares[i] && (this.state.squares[i].player === this.state.player)) {
                const squares = this.state.squares.slice();
                squares[i].style = {...this.state.squares[i].style, backgroundColor: "#3F4077"};

                this.setState({squares: squares, sourceSelection: i});
            }
        } else {
            let squares = this.state.squares.slice();
            const previous = this.state.sourceSelection;

            squares[previous].style = {...this.state.squares[previous].style, backgroundColor: null};

            this.setState({squares: squares});

            const beat = !!squares[i];
            const isMovePossible = squares[previous].isMovePossible(previous, i, beat);
            const stepwisePath = squares[previous].getStepwisePath(previous, i);
            const isMoveLegal = this.isMoveLegal(stepwisePath, i);

            if (isMovePossible && isMoveLegal) {
                const checkSquares = squares.slice();

                let king;
                if (this.state.player === 1) {
                    king = this.state.whiteKing;
                } else if (this.state.player === 2) {
                    king = this.state.blackKing;
                }

                checkSquares[i] = checkSquares[previous];
                checkSquares[previous] = null;
                let tempKing = -1;
                if (checkSquares[i] instanceof King) {
                    if (this.state.player === 1) {
                        tempKing = this.state.whiteKing;
                        this.setState({whiteKing: i});
                    } else if (this.state.player === 2) {
                        tempKing = this.state.blackKing;
                        this.setState({blackKing: i});
                    }

                    king = i;
                }

                if (!this.isCheck(checkSquares, king)) {
                    squares = checkSquares;
                } else {
                    this.setState({sourceSelection: -1, squares: squares});
                    if (tempKing !== -1) {
                        if (this.state.player === 1) {
                            this.setState({whiteKing: tempKing});
                        } else if (this.state.player === 2) {
                            this.setState({blackKing: tempKing});
                        }
                    }
                    return;
                }

                let player = this.state.player === 1 ? 2 : 1;

                this.setState({sourceSelection: -1, squares: squares, player: player});
            } else {
                this.setState({sourceSelection: -1, squares: squares});
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

