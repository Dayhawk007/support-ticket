import { IDBFetchOptions } from "../config/config";
import {ISupportTicket, SupportTicketModel} from "../models/supportTickets";

class SupportTicketService{
    async createSupportTicket(data:ISupportTicket){
        if(!data.topic || !data.description || !data.severity || !data.type || !data.assignedTo){
            console.log("All fields are required")
            return {error:"All fields are required"}
        }
        const supportTicket = await SupportTicketModel.create(data);
        if(!supportTicket){
            console.log("Error while creating support ticket")
            return {error:"Error while creating support ticket"}
        }
        return supportTicket;
    }

    async getAllSupportTickets(options:IDBFetchOptions){
        const filterOptions=options.filterOptions || {};

        const sortOptions=options.sortOptions || {};

        const limit=options.limit || 10;

        const skip=options.skip || 0;
        
        
        const supportTickets=await SupportTicketModel.find(filterOptions).sort(sortOptions).limit(limit).skip(skip).populate("assignedTo","name").exec();

    
        
        const totalCount=await SupportTicketModel.countDocuments(filterOptions);
        

        if(!supportTickets){
            console.log("Error while fetching support tickets")
            return {error:"Error while fetching support tickets"}
        }

        console.log(supportTickets)

        return {
            paginatedData:supportTickets,
            totalCount

        }

    }
}

export {SupportTicketService}