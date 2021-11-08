import mongoose, { Schema } from 'mongoose';

const reqString = {
    type: String,
    required: true
}

const economyProfileSchema = new Schema({
    guildId: reqString,
    userId: reqString,
    imperialCredits: {
        type: Number,
        required: true
    }
})

const name = 'economy-profiles'

export default mongoose.models[name] || mongoose.model(name, economyProfileSchema, name)