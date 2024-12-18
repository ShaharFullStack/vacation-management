import cors from "cors";
import express, { Express, Request } from "express";
import fileUpload from "express-fileupload";
import rateLimit from "express-rate-limit";
import fs from "fs";
import helmet from "helmet";
import https, { ServerOptions } from "https";
import path from "path";
import { fileSaver } from "uploaded-file-saver";
import { appConfig } from "./2-utils/app-config";
import { likeController } from "./5-controllers/like-controllers";
import { userController } from "./5-controllers/user-controller";
import { vacationController } from "./5-controllers/vacation-controller";
import { errorMiddleware } from "./6-middleware/error-middleware";
import { loggerMiddleware } from "./6-middleware/logger-middleware";
import { securityMiddleware } from "./6-middleware/security-middleware";


class App {

    public server: Express;
    public start(): void {

        // Create the server: 
        this.server = express();

        // Prevent DoS attack: 
        this.server.use(rateLimit({
            windowMs: 5000,
            limit: 1000,
            skip: (request: Request) => request.originalUrl.startsWith("/api/vacations/images/")
        }));

        // Prevent problematic response headers: 
        this.server.use(helmet({ crossOriginResourcePolicy: false }));

        // Enable CORS: 
        const corsOrigins = [
            "http://localhost:3000",
            "http://localhost:3000",
            "http://localhost:3100",
            "https://localhost:3100"];
        this.server.use(cors({ origin: corsOrigins }));

        // Tell express to create a request.body object from the body json:
        this.server.use(express.json());

        // Tell express to create request.file object from files sent by the front:

        this.server.use(fileUpload());

        const absolutePath = path.join(__dirname, "1-assets", "images");
        fileSaver.config(absolutePath);
        this.server.use("/api/vacations/images", express.static(absolutePath));


        // Register custom middleware:
        this.server.use(loggerMiddleware.consoleLogRequest);
        this.server.use(securityMiddleware.preventXssAttack);

        // Connect controllers to the server:
        this.server.use("/api", vacationController.router);
        this.server.use("/api", likeController.router)
        this.server.use("/api", userController.router);

        // Register route not found middleware: 
        this.server.use("*", errorMiddleware.routeNotFound);

        // Register catch-all middleware: 
        this.server.use(errorMiddleware.catchAll);

        // Run server: 
        if (appConfig.isDevelopment) {
            this.server.listen(appConfig.port, () =>
                console.log("Listening on http://localhost:"
                    + appConfig.port
                    + " |+|+|+|+ Reading........."
                    + corsOrigins));
        }
        else {
            const options: ServerOptions = {
                cert: fs.readFileSync(path.join(__dirname, "1-assets", "cert", "4100.crt")),
                key: fs.readFileSync(path.join(__dirname, "1-assets", "cert", "4100-privateKey.key")),
            };
            const httpsServer = https.createServer(options, this.server);
            httpsServer.listen(appConfig.port, () => console.log("Listening on https://localhost:" + appConfig.port));
        }

    }

}

export const app = new App(); // export app for the testing
app.start();

