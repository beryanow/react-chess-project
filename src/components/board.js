import React from 'react';

import '../index.css';
import Square from './square.js';

export default class Board extends React.Component {
    renderSquare(i, squareShade) {
        return <Square style={this.props.squares[i] ? this.props.squares[i].style : null}
                       shade={squareShade}
                       onClick={() => this.props.onClick(i)}/>
    }

    render() {
        const board = [];
        for (let i = 0; i < 8; i++) {
            const squareRow = [];
            for (let j = 0; j < 8; j++) {
                squareRow.push(this.renderSquare((i * 8) + j, ((i + j) % 2) ? "dark-square" : "light-square"));
            }
            board.push(<div className="board-row"> {squareRow} </div>)
        }

        return (
            <div>
                {board}
            </div>
        );
    }
}