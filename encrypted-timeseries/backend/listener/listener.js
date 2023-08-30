const crypto = require('crypto');
const WebSocket = require('ws');
const mongoose = require('mongoose');

const socketServer = new WebSocket.Server({ port: 3000 });

mongoose.connect('mongodb://localhost:27017/timeseries_db', { useNewUrlParser: true, useUnifiedTopology: true });

const DataPointSchema = new mongoose.Schema({
  name: String,
  origin: String,
  destination: String,
  secret_key: String,
  timestamp: { type: Date, default: Date.now },
});

const DataPoint = mongoose.model('DataPoint', DataPointSchema);

socketServer.on('connection', (socket) => {
  socket.on('message', (encryptedMessage) => {
    const decipher = crypto.createDecipher('aes-256-ctr', 'encryption_key');
    let decrypted = decipher.update(encryptedMessage, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    const payload = JSON.parse(decrypted);

    const { name, origin, destination, secret_key } = payload;

    const calculated_key = crypto.createHash('sha256').update(JSON.stringify({ name, origin, destination })).digest('hex');

    if (secret_key === calculated_key) {
      const newDataPoint = new DataPoint({ name, origin, destination });
      newDataPoint.save();
    }
  });
});
