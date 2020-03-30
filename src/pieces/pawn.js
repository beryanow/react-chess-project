import Piece from './piece.js';

export default class Pawn extends Piece {
    constructor(player) {
        super(player, (player === 1 ? "/piece_images/pawn_white.png" : "/piece_images/pawn_black.png"));
        this.initialPositions = {
            1: [48, 49, 50, 51, 52, 53, 54, 55],
            2: [8, 9, 10, 11, 12, 13, 14, 15]
        }
    }

    isMovePossible(previous, forward, beat) {
        if (this.player === 1) {
            if ((forward === previous - 8 && !beat) || (forward === previous - 16 && this.initialPositions[1].indexOf(previous) !== -1)) {
                return true;
            } else if (beat && ((forward === previous - 9) || (forward === previous - 7))) {
                return true;
            }
        } else if (this.player === 2) {
            if ((forward === previous + 8 && !beat) || (forward === previous + 16 && this.initialPositions[2].indexOf(previous) !== -1)) {
                return true;
            } else if (beat && ((forward === previous + 9) || (forward === previous + 7))) {
                return true;
            }
        }
        return false;
    }

    getPossibleMoves(stepwisePathToKing, current, squares) {
        let paths = [];

        for (let i = 0; i < stepwisePathToKing.length; i++) {
            const beat = !!squares[stepwisePathToKing[i]];
            if (this.isMovePossible(current, stepwisePathToKing[i], beat)) {
                paths.push(this.getStepwisePathCheckmate(current, stepwisePathToKing[i]));
            }
        }

        return paths;
    }

    isCheck(current, king) {
        if (this.player === 1) {
            if ((king === current - 9) || (king === current - 7)) {
                return true;
            }
        } else if (this.player === 2) {
            if ((king === current + 9) || (king === current + 7)) {
                return true;
            }
        }
        return false;
    }

    getStepwisePath(previous, forward) {
        let stepwisePath = [];

        if (forward === previous - 16) {
            stepwisePath.push(previous - 8);
        } else if (forward === previous + 16) {
            stepwisePath.push(previous + 8);
        }

        return stepwisePath;
    }

    getStepwisePathCheckmate(previous, forward) {
        let stepwisePath = [];

        alert("here +" + forward + " " + previous)
        if (forward === previous - 16) {
            stepwisePath.push(previous - 16);
        } else if (forward === previous + 16) {
            stepwisePath.push(previous + 16);
        } else if (forward === previous - 8) {
            stepwisePath.push(previous - 8);
        } else if (forward === previous + 8) {
            stepwisePath.push(previous + 8);
        }

        return stepwisePath;
    }
}
