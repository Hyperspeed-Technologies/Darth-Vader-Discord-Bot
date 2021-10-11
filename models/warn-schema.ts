import mongoose, { Schema } from 'mongoose';

const reqString = {
    type: String,
    required: true
}

const warnSchema = new Schema({
    userId: reqString,
    guildId: reqString,
    warns: {
        type: [{
            warningId: reqString,
            reason: reqString,
            moderatorId: reqString,
            timestamp: {
                type: Date,
                required: true
            }
        }]
    }
})

const name = 'user-warnings'

export default mongoose.models[name] || mongoose.model(name, warnSchema, name)