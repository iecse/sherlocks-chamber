import Match from "../models/Match.js";
import Team from "../models/Team.js";
import Tournament from "../models/Tournament.js";

export async function createFixtures(tournamentId, roundNumber) {
    const tournament = await Tournament.findById(tournamentId).populate('teams');
    const activeTeams = tournament.teams.filter(p => p.isActive);

    const shuffledTeams = activeTeams.sort(() => Math.random() - 0.5);

    const matches = [];
    for (let i = 0; i < shuffledTeams.length; i += 2) {
        const match = new Match({
            round: roundNumber,
            teamA: shuffledTeams[i]._id,
            teamB: shuffledTeams[i + 1] ? shuffledTeams[i + 1]._id : null
        });
        await match.save();
        matches.push(match);
    }

    tournament.matches.push(...matches.map(m => m._id));
    await tournament.save();

    return matches;
}

export async function startRound(tournamentId) {
    const tournament = await Tournament.findById(tournamentId);
    tournament.status = 'in_progress';
    await tournament.save();

    const matches = await createFixtures(tournamentId, tournament.currentRound);
    return matches;
}

export async function processMatchResult(matchId, winnerId) {
    const match = await Match.findById(matchId);
    match.winner = winnerId;
    match.status = 'completed';
    await match.save();

    const loserId = match.teamA.equals(winnerId) ? match.teamB : match.teamA;
    await Team.findByIdAndUpdate(loserId, { isActive: false });

    return match;
}

export async function checkRoundCompletion(tournamentId) {
    const tournament = await Tournament.findById(tournamentId)
        .populate('matches')
        .populate('teams');

    const currentRoundMatches = tournament.matches.filter(m => m.round === tournament.currentRound);
    const allMatchesCompleted = currentRoundMatches.every(m => m.status === 'completed');

    if (allMatchesCompleted) {
        const activeTeams = tournament.teams.filter(p => p.isActive);
        if (activeTeams.length === 1) {
            tournament.status = 'completed';
        } else {
            tournament.currentRound += 1;
        }
        await tournament.save();
    }

    return tournament;
}
