import { createWriteStream } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const write = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const filePath = join(__dirname, "files", "fileToWrite.txt");
  const writeStream = createWriteStream(filePath);

  process.stdin.pipe(writeStream);

  writeStream.on("error", (error) => {
    console.error("Error writing file:", error);
  });

  process.stdin.on("end", () => {
    writeStream.end();
  });

  return new Promise((resolve, reject) => {
    writeStream.on("finish", () => {
      console.log("Finished writing to file.");
      resolve();
    });

    writeStream.on("error", (error) => {
      console.error("Stream encountered an error:", error);
      reject(error);
    });
  });
};

try {
  await write();
} catch (error) {
  console.error("Error:", error);
}
