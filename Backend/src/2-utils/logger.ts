import fsPromises from "fs/promises";

class Logger {

    public async logError(err: any): Promise<void> {

        const now = new Date();
        let message = "";
        message += "Time: " + now.toLocaleString() + "\n";
        message += "Error: " + err.message + "\n";
        if(err.stack) message += "Stack: " + err.stack + "\n";
        message += "\n-----------------------------------------------------\n\n";
        
        await fsPromises.appendFile("./errors.log", message);
    }

}

export const logger = new Logger();
