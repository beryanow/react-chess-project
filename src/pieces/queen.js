import Piece from './piece.js';

export default class Queen extends Piece {
    constructor(player) {
        super(player, (player === 1 ? "/images/queen_white.png" : "/images/queen_black.png"));
    }
}