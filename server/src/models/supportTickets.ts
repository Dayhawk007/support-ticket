import mongoose, { Schema, Document } from 'mongoose';

interface ISupportTicket{
    topic: string;
    description: string;
    dateCreated: Date;
    severity: string;
    type: string;
    assignedTo: string;
    status: string;
    resolvedOn?: Date;
}

enum SupportTicketStatus {
    New = 'new',
    Assigned = 'assigned',
    Resolved = 'resolved',
}

enum SupportTicketSeverity {
    Low = 'low',
    Medium = 'medium',
    High = 'high',
}

const supportTicketSchema: Schema = new Schema({
    topic: { type: String, required: true },
    description: { type: String, required: true },
    dateCreated: { type: Date, required: true },
    severity: { type: String,enum:Object.values(SupportTicketSeverity) , required: true },
    type: { type: String, required: true },
    assignedTo: { type: Schema.Types.ObjectId,ref:"support-agents", required: true },
    status: { type: String, enum: Object.values(SupportTicketStatus), default:SupportTicketStatus.New,required: true },
    resolvedOn: { type: Date },
});


const SupportTicketModel = mongoose.model<ISupportTicket>('support-tickets', supportTicketSchema);

export { SupportTicketModel, SupportTicketStatus, SupportTicketSeverity, ISupportTicket}
