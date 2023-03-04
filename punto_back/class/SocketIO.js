const {Server} = require("socket.io");

class SocketIO {

    constructor(server) {
        this.io = new Server(server)
        this._connections = []
    }

    start() {
        this.io.on('connection', socket => {
            this._connections.push(socket);
            console.log(`Connected: ${socket.id}`);

            socket.on('disconnect', () => {
                this._connections.splice(this._connections.indexOf(socket), 1);
                console.log(`Disconnected: ${socket.id}`);
            });
        });
    }

    sendMessage(message) {
        this.io.emit(message);
    }

    get connections() {
        return this._connections;
    }

}

module.exports = SocketIO;