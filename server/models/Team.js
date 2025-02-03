import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    members: [{ type: String }],
    password: { type: String, required: true },
    points: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    currentRound: { type: Number, default: 1 },
    socketId: String,
    hintsUsed: [
        {
            hintType: {
                type: String,
                enum: ["operator", "constant", "function"],
                required: true
            },
        }
    ]
});

const Team = mongoose.model("Team", teamSchema)
export default Team
