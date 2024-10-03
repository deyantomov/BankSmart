import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const loggerEnum = {
  err: "ERROR",
  new: "NEW",
  update: "UPDATE"
};

//  get path name using the node url module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function logger(type, message) {
  try {
    //  two directories back = outside of the src/helpers folder
    const targetDir = path.join(__dirname, "../../logs");
    const logFile = path.join(targetDir, "server.log");

    try {
      await fs.mkdir(targetDir, { recursive: true });
    } catch (err) {
      return console.error("Failed to create log directory: ", err.message);
    }

    const logMessage = `${type}: ${message} - ${new Date().toISOString()}\n`;
    
    await fs.appendFile(logFile, logMessage);
    console.log(logMessage);
  } catch (err) {
    console.error("Failed to write log: ", err.message);
  }
}