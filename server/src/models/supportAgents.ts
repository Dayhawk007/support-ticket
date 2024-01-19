import mongoose, { Schema, Document } from 'mongoose';

interface ISupportAgent {
    name: string;
    email: string;
    phone: string;
    description: string;
    active: boolean;
    dateCreated: Date;
}

const supportAgentSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    description: { type: String, required: true },
    active: { type: Boolean, required: true },
    dateCreated: { type: Date, default: Date.now }
});

const SupportAgentModel = mongoose.model<ISupportAgent>('support-agents', supportAgentSchema);

export { SupportAgentModel, ISupportAgent}
