import Piece from './piece.js';

export default class King extends Piece {
    constructor(player) {
        super(player, (player === 1 ? "/images/king_white.png" : "/images/king_black.png"));
    }
}
