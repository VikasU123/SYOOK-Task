// main.js
const socket = new WebSocket('ws://localhost:3000'); // Listener service URL

socket.onmessage = (event) => {
  const dataContainer = document.getElementById('data-container');
  const decryptedData = event.data; // Decrypt and process the data as needed
  const dataElement = document.createElement('p');
  dataElement.textContent = decryptedData;
  dataContainer.appendChild(dataElement);
};
