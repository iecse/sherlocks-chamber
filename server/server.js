import express, { json } from 'express';
import { createServer } from 'http';
import { config } from 'dotenv';
import { initSocket } from './services/socketService.js';
config();

const app = express();
const server = createServer(app);

app.use(json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('help');
});

initSocket(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
