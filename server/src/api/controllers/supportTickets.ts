import { Request, Response } from 'express';
import httpCodes from '../../config/httpCodes';
import { SupportTicketSeverity } from '../../models/supportTickets';
import { SupportTicketService } from '../../services/supportTickets';

export const getAllSupportTickets= async (req: Request, res: Response) => {
    try {
        const filterOptions=req.query.filterOptions ? JSON.parse(req.query.filterOptions as string) : {};
        const sortOptions=req.query.sortOptions ? JSON.parse(req.query.sortOptions as string) : {};
        const limit=req.query.limit ? parseInt(req.query.limit as string) : 10;
        const skip=req.query.skip ? parseInt(req.query.skip as string) : 0;

        const supportTicketService= new SupportTicketService();

        const supportTickets=await supportTicketService.getAllSupportTickets({filterOptions,sortOptions,limit,skip});
        return res.status(httpCodes.OK).json(supportTickets);
    } catch (error: any) {
        return res.status(httpCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}


export const createSupportTicket= async (req: Request, res: Response) => {
    try {
        var data=req.body;
        console.log(data);
        if(!data.topic || !data.description || !data.severity || !data.type || !data.assignedTo){
            console.log("Error in the request body, all fields are required");
            return res.status(httpCodes.BAD_REQUEST).json({error:"Error in the request body, all fields are required"});
        }
        if(!Object.values(SupportTicketSeverity).includes(data.severity)){
            console.log("Error in the request body, severity is invalid");
            return res.status(httpCodes.BAD_REQUEST).json({error:"Error in the request body, severity is invalid"});
        }

        data={dateCreated:new Date(),...data}

        const supportTicketService= new SupportTicketService();

        const supportTicket=await supportTicketService.createSupportTicket(data);

        return res.status(httpCodes.CREATED).json(supportTicket);
    } catch (error: any) {
        return res.status(httpCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}