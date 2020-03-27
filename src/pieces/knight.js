import Piece from './piece.js';

export default class Knight extends Piece {
    constructor(player) {
        super(player, (player === 1 ? "/images/knight_white.png" : "/images/knight_black.png"));
    }
}
