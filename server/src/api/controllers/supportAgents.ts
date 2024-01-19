import { Request, Response } from 'express';
import httpCodes from '../../config/httpCodes';
import { emailRegex } from '../../config/config';
import { SupportAgentService } from '../../services/supportAgent';

export const createSupportAgent = async (req:Request, res:Response) => {
    try {
        
        var data=req.body;

        if(!data.name || !data.email || !data.phone || !data.description || !data.active){
            console.log("All fields are required")
            return res.status(httpCodes.BAD_REQUEST).json({error:"All fields are required"})
        }
        if(!emailRegex.test(data.email as string)){
            console.log("Invalid email")
            return res.status(httpCodes.BAD_REQUEST).json({error:"Invalid email"})
        }
        if(data.phone.length!==10){
            console.log("Invalid phone number")
            return res.status(httpCodes.BAD_REQUEST).json({error:"Invalid phone number"})
        }


        data={dateCreated:new Date(),...data}

        const supportAgentService= new SupportAgentService();

        const supportAgent=await supportAgentService.createSupportAgent(data);

        return res.status(httpCodes.CREATED).json(supportAgent);

    } catch (error:any) {
        return res.status(httpCodes.INTERNAL_SERVER_ERROR).json({message:error.message});
    }
}