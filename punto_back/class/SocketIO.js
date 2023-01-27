const {Server} = require("socket.io");

class SocketIO {

    constructor(server) {
        this.io = new Server(server)
        this.connections = []
    }

    start() {
        this.io.on('connection', socket => {
            this.connections.push(socket);
            console.log(`Connected: ${socket.id}`);

            socket.on('disconnect', () => {
                this.connections.splice(this.connections.indexOf(socket), 1);
                console.log(`Disconnected: ${socket.id}`);
            });
        });
    }
}

module.exports = SocketIO;