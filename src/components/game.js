import React from 'react';

import '../index.css';
import Board from './board.js';
import initializeBoard from "./board_structure_creator";

export default class Game extends React.Component {
    constructor() {
        super(undefined);
        this.state = {
            squares: initializeBoard()
        }
    }

    render() {
        return (
            <div>
                <div className="game">
                    <div className="game-board">
                        <Board squares={this.state.squares}/>
                    </div>
                </div>
            </div>
        );
    }
}

