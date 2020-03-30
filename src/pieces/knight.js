import Piece from './piece.js';

export default class Knight extends Piece {
    constructor(player) {
        super(player, (player === 1 ? "/piece_images/knight_white.png" : "/piece_images/knight_black.png"));
    }


    isMovePossible(previous, forward) {
        return ((previous - 17 === forward) ||
            (previous - 10 === forward) ||
            (previous - 6 === forward) ||
            (previous - 15 === forward) ||
            (previous + 15 === forward) ||
            (previous + 6 === forward) ||
            (previous + 10 === forward) ||
            (previous + 17 === forward));
    }

    isCheck(current, king) {
        return ((current - 17 === king) ||
            (current - 10 === king) ||
            (current - 6 === king) ||
            (current - 15 === king) ||
            (current + 15 === king) ||
            (current + 6 === king) ||
            (current + 10 === king) ||
            (current + 17 === king));
    }

    getPossibleMoves(stepwisePathToKing, current) {
        let paths = [];

        for (let i = 0; i < stepwisePathToKing.length; i++) {
            if (this.isMovePossible(stepwisePathToKing[i], current)) {
                paths.push([stepwisePathToKing[i]]);
            }
        }

        return paths;
    }

    getStepwisePath() {
        return [];
    }

}
