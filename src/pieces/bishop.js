import Piece from './piece.js';

export default class Bishop extends Piece {
    constructor(player) {
        super(player, (player === 1 ? "/piece_images/bishop_white.png" : "/piece_images/bishop_black.png"));
    }
}
