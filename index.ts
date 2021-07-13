import dotenv from "dotenv";
import app from "./src/app"
import { Worker } from "./src/worker/worker";
dotenv.config();

const worker = new Worker();
worker.performNotifierWatch()
worker.performOrganizerAllocation()

const serverURL = process.env.SERVER_URL || "localhost";
const serverPort = process.env.SERVER_PORT || 3000;
app.listen(serverPort, () => {
  console.log(`server started at ${serverURL}:${serverPort}`);
});