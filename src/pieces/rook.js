import Piece from './piece.js';

export default class Rook extends Piece {
    constructor(player) {
        super(player, (player === 1 ? "/piece_images/rook_white.png" : "/piece_images/rook_black.png"));
    }
}
