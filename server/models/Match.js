import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
    roundId: { type: mongoose.Schema.Types.ObjectId, ref: "Round", required: true },
    teamA: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
    teamB: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
    ciphertextA: { type: String, default: "" },
    ciphertextB: { type: String, default: "" },
    decryptedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Team", default: null },
    status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" },
    startTime: { type: Date },
    endTime: { type: Date },
    hintsUsed: { 
        teamA: { type: Number, default: 0 },
        teamB: { type: Number, default: 0 }
    },
    score: { 
        teamA: { type: Number, default: 0 }, 
        teamB: { type: Number, default: 0 } 
    },
    createdAt: { type: Date, default: Date.now }
});

const Match = mongoose.model("Match", matchSchema);
export default Match
