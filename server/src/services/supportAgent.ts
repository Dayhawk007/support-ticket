import { ISupportAgent ,SupportAgentModel} from "../models/supportAgents";

class SupportAgentService{
    async createSupportAgent(data:ISupportAgent){
        if(!data.name || !data.email || !data.phone || !data.description){
            console.log("All fields are required")
            return {error:"All fields are required"}
        }
        const supportAgent = await SupportAgentModel.create(data);
        if(!supportAgent){
            console.log("Error while creating support agent")
            return {error:"Error while creating support agent"}
        }
        return supportAgent;
    }
}

export {SupportAgentService}