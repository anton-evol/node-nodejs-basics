import { cpus } from "node:os";
import { fileURLToPath } from "node:url";
import { Worker, workerData } from "node:worker_threads";
import path, { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const workerPath = path.join(__dirname, "worker.js");
const numOfCpu = cpus().length;

const performCalculations = async () => {
  const workersArray = [];

  for (let i = 0; i < numOfCpu; i++) {
    const worker = new Worker(workerPath, { workerData: 10 + i });
    let promise = new Promise((resolve, reject) => {
      worker.on("message", (value) =>
        resolve({ status: "resolved", data: value })
      ),
        worker.on("error", () => {
          reject({ status: "error", data: null });
        });
    });
    workersArray.push(promise);
  }
  const result = await Promise.allSettled(workersArray);
  console.log(result.map((key) => key["value"] || key["reason"]));
};

await performCalculations();
