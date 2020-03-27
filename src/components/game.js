import React from 'react';

import '../index.css';
import Board from './board.js';

export default class Game extends React.Component {
    constructor() {
        super(undefined);
        this.state = {
            squares: Array(64).fill(1)
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

