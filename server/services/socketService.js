import { Server } from 'socket.io';
import MESSAGES from '../utils/messageUtils.js';
import Team from '../models/Team.js';
import { checkRoundCompletion, processMatchResult, startRound } from '../utils/gameUtils.js';
let io;

export const initSocket = (server) => {
    io = new Server(server);

    io.on(MESSAGES.CONNECTION, (socket) => {
        console.log(`[+] New client connected: ${socket.id}`);

        socket.on(MESSAGES.JOIN_TOURNAMENT, async ({ teamId, tournamentId }) => {
            await Team.findByIdAndUpdate(teamId, { socketId: socket.id });
            socket.join(tournamentId);
        });

        socket.on(MESSAGES.START_ROUND, async ({ tournamentId }) => {
            const matches = await startRound(tournamentId);
            io.to(tournamentId).emit(MESSAGES.ROUND_STARTED, { matches });
        });

        socket.on(MESSAGES.SUBMIT_RESULT, async ({ matchId, winnerId, tournamentId }) => {
            const match = await processMatchResult(matchId, winnerId);
            const tournament = await checkRoundCompletion(tournamentId);

            io.to(tournamentId).emit(MESSAGES.MATCH_COMPLETED, { match });

            if (tournament.status === "completed") {
                io.to(tournamentId).emit(MESSAGES.TOURNAMENT_COMPLETED, { winner: winnerId });
            } else if (tournament.currentRound > match.round) {
                io.to(tournamentId).emit(MESSAGES.ROUND_COMPLETED, { tournament });
            }
        });

        socket.on(MESSAGES.DISCONNECT, () => {
            console.log(`[-] Client disconnected: ${socket.id}`);
        });
    });
};

export const emitToAllClients = (event, data) => {
    io.emit(event, data);
};

export const emitToClient = (socketId, event, data) => {
    io.to(socketId).emit(event, data);
};
