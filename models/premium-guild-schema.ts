import mongoose, { Schema } from 'mongoose';

const reqString = {
    type: String,
    required: true
}

const reqNumber = {
    type: Number,
    required: true
}

const reqBoolean = {
    type: Boolean,
    required: true
}

const reqDate = {
    type: Date,
    required: true
}

const premiumGuildSchema = new Schema({
    guildId: reqString,
    tier: reqString,
    permanent: reqBoolean,
    active: reqBoolean,
    expire: reqDate
})

const name = 'premium-guilds'

export default mongoose.models[name] || mongoose.model(name, premiumGuildSchema, name)