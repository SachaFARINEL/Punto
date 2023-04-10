const {Server} = require("socket.io");

class SocketIO {

    // Constructor function to initialize the SocketIO server
    constructor(server) {
        // Create a new SocketIO server instance using the provided HTTP server
        this.io = new Server(server)
        // Initialize an empty list to store client connections
        this._connections = []
    }

    // Method to start the SocketIO server
    start() {
        // Add a connection listener to the SocketIO server instance
        this.io.on('connection', socket => {
            // Add the newly connected client socket to the connections list
            this._connections.push(socket);
            // Log a message to the console to indicate that a new client has connected
            console.log(`Connected: ${socket.id}`);

            // Add a disconnect listener to the client socket
            socket.on('disconnect', () => {
                // Remove the disconnected client socket from the connections list
                this._connections.splice(this._connections.indexOf(socket), 1);
                // Log a message to the console to indicate that a client has disconnected
                console.log(`Disconnected: ${socket.id}`);
            });
        });
    }

    // Method to send a message to all connected clients
    sendMessage(message) {
        // Send the message to all connected clients
        this.io.emit(message);
    }

    // Getter function to retrieve the list of client connections
    get connections() {
        return this._connections;
    }

}

// Export the SocketIO class for use in other modules
module.exports = SocketIO;
