import express, { json } from 'express';
import { createServer } from 'http';
import { config } from 'dotenv';
import { initSocket } from './services/socketService.js';
import cors from "cors"
import corsOptions from './config/cors.js';
import connectToMongo from "./config/db.js"
import indexRouter from './routes/index.js';
config();

const app = express();
const server = createServer(app);

connectToMongo();

app.use(json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));

// app.get('/test', (req, res) => {
//     res.send('help');
// });

initSocket(server);

app.use('/api', indexRouter)

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
