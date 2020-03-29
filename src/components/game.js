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
            whiteKing: 60,
            blackKing: 4,
            whiteCheck: -1,
            blackCheck: -1,
            player: 1,
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

    isPathEmpty(srcToDestPath) {
        let isLegal = true;
        for (let i = 0; i < srcToDestPath.length; i++) {
            if (this.state.squares[srcToDestPath[i]] !== null) {
                isLegal = false;
            }
        }

        return isLegal;
    }

    isNewPathEmpty(src, phantom) {
        let isLegal = true;
        for (let i = 0; i < src.length; i++) {
            if ((this.state.squares[src[i]] !== null) && (src[i] !== phantom)) {
                isLegal = false;
            }
        }

        return isLegal;
    }

    isCheckOpen(phantom) {
        if (this.state.player === 1) {
            for (let i = 0; i < this.state.blackThreat.length; i++) {
                const stepWisePathToKing = this.state.squares[this.state.blackThreat[i]].getStepwisePath(this.state.blackThreat[i], this.state.whiteKing);

                if (!this.isNewPathEmpty(stepWisePathToKing, phantom)) {
                    return true;
                }
            }
        } else if (this.state.player === 2) {
            for (let i = 0; i < this.state.whiteThreat.length; i++) {
                const stepWisePathToKing = this.state.squares[this.state.whiteThreat[i]].getStepwisePath(this.state.whiteThreat[i], this.state.blackKing);

                if (!this.isNewPathEmpty(stepWisePathToKing, phantom)) {
                    return true;
                }
            }
        }

        return false;
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
                if (this.state.player === 1) {
                    if (this.state.whiteCheck > -1) {
                        const stepWisePathToKing = squares[this.state.whiteCheck].getStepwisePath(this.state.whiteCheck, this.state.whiteKing);
                        if ((stepWisePathToKing.indexOf(i) !== -1) || (this.state.whiteCheck === i)) {
                            this.setState({whiteCheck: -1});
                        } else {
                            this.setState({sourceSelection: -1});
                            return;
                        }
                    }
                } else if (this.state.player === 2) {
                    if (this.state.blackCheck > -1) {
                        const stepWisePathToKing = squares[this.state.blackCheck].getStepwisePath(this.state.blackCheck, this.state.blackKing);
                        if ((stepWisePathToKing.indexOf(i) !== -1) || (this.state.blackCheck === i)) {
                            this.setState({blackCheck: -1});
                        } else {
                            this.setState({sourceSelection: -1});
                            return;
                        }
                    }
                }

                squares[i] = squares[previous];
                squares[previous] = null;

                if (this.state.player === 1) {
                    const stepWisePathToKing = squares[i].getStepwisePath(i, this.state.blackKing);

                    if (squares[i].isCheck(i, this.state.blackKing) && this.isPathEmpty(stepWisePathToKing)) {
                        this.setState({blackCheck: i});
                    } else {
                        this.setState({blackCheck: -1});
                    }
                } else if (this.state.player === 2) {
                    const stepWisePathToKing = squares[i].getStepwisePath(i, this.state.whiteKing);

                    if (squares[i].isCheck(i, this.state.whiteKing) && this.isPathEmpty(stepWisePathToKing)) {
                        this.setState({whiteCheck: i});
                    } else {
                        this.setState({whiteCheck: -1});
                    }
                }

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

