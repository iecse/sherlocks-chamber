import mongoose from "mongoose";

const leagueSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, 
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
    rounds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Round" }],
    status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" },
    createdAt: { type: Date, default: Date.now }
});

const League = mongoose.model("League", leagueSchema);
export default League
