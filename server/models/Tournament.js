import mongoose from "mongoose";

const tournamentSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
    matches: [{ type:  mongoose.Schema.Types.ObjectId, ref: 'Match' }],
    status: { type: String, enum: ["waiting", "in_progress", "completed"], default: "waiting" },
    currentRound: { type: Number, default: 1 },
    createdAt: { type: Date, default: Date.now }
});

const Tournament = mongoose.model("Tournament", tournamentSchema);
export default Tournament
