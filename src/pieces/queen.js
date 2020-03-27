import Piece from './piece.js';

export default class Queen extends Piece {
    constructor(player) {
        super(player, (player === 1 ? "/piece_images/queen_white.png" : "/piece_images/queen_black.png"));
    }
}