import Piece from './piece.js';

export default class Rook extends Piece {
    constructor(player) {
        super(player, (player === 1 ? "/images/rook_white.png" : "/images/rook_black.png"));
    }
}
