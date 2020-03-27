import Piece from './piece.js';

export default class Bishop extends Piece {
    constructor(player) {
        super(player, (player === 1 ? "/images/bishop_white.png" : "/images/bishop_black.png"));
    }
}
