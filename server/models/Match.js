import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
    round: Number,
    teamA: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
    teamB: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
    ciphertextA: { type: String, default: "" },
    ciphertextB: { type: String, default: "" },
    winner: { type: mongoose.Schema.Types.ObjectId, ref: "Team", default: null },
    status: { type: String, enum: ["pending", "in_progress", "completed"], default: "pending" },
    startTime: { type: Date },
    endTime: { type: Date },
    
    score: { 
        teamA: { type: Number, default: 0 }, 
        teamB: { type: Number, default: 0 } 
    },
    createdAt: { type: Date, default: Date.now },
});

const Match = mongoose.model("Match", matchSchema);
export default Match
