import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    members: [{ type: String }],
    points: { type: Number, default: 0 }
});

const Team = mongoose.model("Team", teamSchema)
export default Team
