import Piece from './piece.js';

export default class Queen extends Piece {
    constructor(player) {
        super(player, (player === 1 ? "/images/queen_white.png" : "https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg"));
    }
}