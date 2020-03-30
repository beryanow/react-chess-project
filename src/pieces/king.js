import Piece from './piece.js';

export default class King extends Piece {
    constructor(player) {
        super(player, (player === 1 ? "/piece_images/king_white.png" : "/piece_images/king_black.png"));
    }

    getPossibleMoves(stepwisePathToKing, current, squares) {
        let paths = [];
        const values = [1, 7, 8, 9];

        for (let i = 0; i < values.length; i++) {
            if (stepwisePathToKing.indexOf(current - values[i]) === -1 && !squares[current - values[i]] && (current - values[i] >= 0))  {
                paths.push([current - values[i]]);
            }

            if (stepwisePathToKing.indexOf(current + values[i]) === -1 && !squares[current + values[i]])  {
                paths.push([current + values[i]]);
            }
        }

        return paths;
    }

    isMovePossible(previous, forward) {
        return ((previous - 9 === forward) ||
            (previous - 8 === forward) ||
            (previous - 7 === forward) ||
            (previous - 1 === forward) ||
            (previous + 9 === forward) ||
            (previous + 8 === forward) ||
            (previous + 7 === forward) ||
            (previous + 1 === forward));
    }

    isCheck() {
        return false;
    }

    getStepwisePath() {
        return [];
    }

}
