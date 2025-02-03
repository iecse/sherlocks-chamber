import { createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

const TournamentContext = createContext();

export const TournamentProvider = ({ children }) => {
    const [socket] = useState(() => io("http://localhost:3000"));
    const [tournamentId, setTournamentId] = useState("");
    const [matches, setMatches] = useState([]);
    const [winnerId, setWinnerId] = useState("");

    useEffect(() => {
        socket.on("ROUND_STARTED", ({ matches }) => setMatches(matches));
        socket.on("MATCH_COMPLETED", ({ match }) =>
            setMatches((prev) => prev.map((m) => (m._id === match._id ? match : m)))
        );
        socket.on("ROUND_COMPLETED", ({ tournament }) => alert(`Round ${tournament.currentRound} completed!`));
        socket.on("TOURNAMENT_COMPLETED", ({ winner }) => alert(`Tournament Winner: Team ${winner}`));

        return () => socket.disconnect();
    }, [socket]);

    return (
        <TournamentContext.Provider value={{ socket, tournamentId, setTournamentId, matches, setMatches, winnerId, setWinnerId }}>
            {children}
        </TournamentContext.Provider>
    );
};

export default TournamentContext;
