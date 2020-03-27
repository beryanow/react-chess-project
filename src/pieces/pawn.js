import Piece from './piece.js';

export default class Pawn extends Piece {
    constructor(player) {
        super(player, (player === 1 ? "/piece_images/pawn_white.png" : "/piece_images/pawn_black.png"));
    }
}
