import Piece from './piece.js';

export default class Queen extends Piece {
    constructor(player) {
        super(player, (player === 1 ? "/piece_images/queen_white.png" : "/piece_images/queen_black.png"));
    }

    isMovePossible(previous, forward) {
        return ((Math.abs(previous - forward) % 9 === 0) || (Math.abs(previous - forward) % 7 === 0)) || // like bishop
            ((Math.abs(previous - forward) % 8 === 0) || (forward >= (previous - previous % 8) && (forward <= previous + (7 - previous % 8)))); // like rook
    }

    isCheck(current, king) {
        return ((Math.abs(current - king) % 9 === 0) || (Math.abs(current - king) % 7 === 0)) || // like bishop
            ((Math.abs(current - king) % 8 === 0) || (king >= (current - current % 8) && (king <= current + (7 - current % 8)))); // like rook
    }

    getStepwisePath(previous, forward) {
        let stepwisePath = [];
        let start, end, increment;

        if (previous > forward) {
            start = forward;
            end = previous;
        } else {
            start = previous;
            end = forward;
        }

        if (Math.abs(previous - forward) % 8 === 0) {
            increment = 8;
            start += 8;
        } else if (Math.abs(previous - forward) % 9 === 0) {
            // left diagonal
            increment = 9;
            start += 9;
        } else if (Math.abs(previous - forward) % 7 === 0) {
            // right diagonal
            increment = 7;
            start += 7;
        } else {
            increment = 1;
            start += 1;
        }

        for (let i = start; i < end; i += increment) {
            stepwisePath.push(i);
        }

        return stepwisePath;
    }
}