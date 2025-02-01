import mongoose from "mongoose";

const roundSchema = new mongoose.Schema({
    knockoutId: { type: mongoose.Schema.Types.ObjectId, ref: "Knockout", required: true },
    roundNumber: { type: Number, required: true },
    matches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Match" }],
    status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" },
    createdAt: { type: Date, default: Date.now }
});

const Round = mongoose.model("Round", roundSchema);
export default Round
