export default class Piece {
    constructor(player, iconUrl, type) {
        this.player = player;
        this.style = {backgroundImage: "url('" + iconUrl + "')", backgroundSize: "100% 100%"};
        this.type = type;
    }
}