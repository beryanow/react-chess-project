import Piece from './piece.js';

export default class King extends Piece {
    constructor(player) {
        super(player, (player === 1 ? "/piece_images/king_white.png" : "/piece_images/king_black.png"));
    }
}
