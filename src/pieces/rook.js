import Piece from './piece.js';

export default class Rook extends Piece {
    constructor(player) {
        super(player, (player === 1 ? "/piece_images/rook_white.png" : "/piece_images/rook_black.png"));
    }

    isMovePossible(previous, forward) {
        return (Math.abs(previous - forward) % 8 === 0) ||  // vertical line check
            ((forward >= (previous - previous % 8)) && (forward <= previous + (7 - previous % 8))); // horizontal line check
    }

    isCheck(current, king) {
        return (Math.abs(current - king) % 8 === 0) ||  // vertical line check
            ((king >= (current - current % 8)) && (king <= current + (7 - current % 8))); // horizontal line check
    }

    getPossibleMoves(stepwisePathToKing, current) {
        let paths = [];

        for (let i = 0; i < stepwisePathToKing.length; i++) {
            if (this.isMovePossible(stepwisePathToKing[i], current)) {
                paths.push(this.getStepwisePathCheckmate(stepwisePathToKing[i], current));
            }
        }

        return paths;
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
            // vertical path
            increment = 8;
            start += 8;
        } else {
            // horizontal path
            increment = 1;
            start += 1;
        }

        for (let i = start; i < end; i += increment) {
            stepwisePath.push(i);
        }

        return stepwisePath;
    }

    getStepwisePathCheckmate(previous, forward) {
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
            // vertical path
            increment = 8;
            start += 8;
        } else {
            // horizontal path
            increment = 1;
            start += 1;
        }

        for (let i = start; i < end; i += increment) {
            stepwisePath.push(i);
        }

        return stepwisePath;
    }
}
