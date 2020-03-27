import Piece from './piece.js';

export default class Pawn extends Piece {
    constructor(player) {
        super(player, (player === 1 ? "/images/pawn_white.png" : "/images/pawn_black.png"));
    }
}
