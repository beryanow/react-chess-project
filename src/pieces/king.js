import Piece from './piece.js';

export default class King extends Piece {
    constructor(player) {
        super(player, (player === 1 ? "/piece_images/king_white.png" : "/piece_images/king_black.png"));
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

    getStepwisePath(forward) {
        return [forward];
    }

}
