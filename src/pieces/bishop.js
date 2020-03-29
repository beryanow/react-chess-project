import Piece from './piece.js';

export default class Bishop extends Piece {
    constructor(player) {
        super(player, (player === 1 ? "/piece_images/bishop_white.png" : "/piece_images/bishop_black.png"));
    }

    isMovePossible(previous, forward) {
        return ((Math.abs(previous - forward) % 9 === 0) || (Math.abs(previous - forward) % 7 === 0));
    }

    isCheck(current, king) {
        return ((Math.abs(current - king) % 9 === 0) || (Math.abs(current - king) % 7 === 0));
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

        if (Math.abs(previous - forward) % 9 === 0) {
            increment = 9;
            start += 9;
        } else {
            increment = 7;
            start += 7;
        }

        for (let i = start; i < end; i += increment) {
            stepwisePath.push(i);
        }

        return stepwisePath;
    }

}




