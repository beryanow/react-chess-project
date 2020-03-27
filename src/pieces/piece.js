export default class Piece {
    constructor(player, iconUrl) {
        this.player = player;
        this.style = {backgroundImage: "url('" + iconUrl + "')", backgroundSize: "100% 100%"};
    }
}