import Piece from './piece.js';

export default class Knight extends Piece {
    constructor(player) {
        super(player, (player === 1 ? "/piece_images/knight_white.png" : "/piece_images/knight_black.png"));
    }
}
