const fs = require('fs');
const crypto = require('crypto');
const WebSocket = require('ws');

const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
const socket = new WebSocket('ws://localhost:3000'); // Listener service URL

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateEncryptedMessage = (payload, key) => {
  const cipher = crypto.createCipher('aes-256-ctr', key);
  let encrypted = cipher.update(payload, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

const sendMessageStream = () => {
  setInterval(() => {
    const randomData = getRandomElement(data);
    const payload = {
      name: randomData.name,
      origin: randomData.origin,
      destination: randomData.destination,
      secret_key: crypto.createHash('sha256').update(JSON.stringify(randomData)).digest('hex'),
    };

    const encryptedMessage = generateEncryptedMessage(JSON.stringify(payload), 'encryption_key');
    socket.send(encryptedMessage);
  }, 10000);
};

socket.on('open', () => {
  sendMessageStream();
});
