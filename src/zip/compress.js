import { createReadStream, createWriteStream } from "fs";
import { createGzip } from "zlib";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const compress = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const sourceFilePath = join(__dirname, "files", "fileToCompress.txt");
  const destinationFilePath = join(__dirname, "files", "archive.gz");

  const readStream = createReadStream(sourceFilePath);
  const writeStream = createWriteStream(destinationFilePath);
  const gzip = createGzip();

  readStream.pipe(gzip).pipe(writeStream);

  return new Promise((resolve, reject) => {
    writeStream.on("finish", () => {
      console.log("File compression completed.");
      resolve();
    });

    writeStream.on("error", (error) => {
      console.error("Error during compression:", error);
      reject(error);
    });
  });
};

try {
  await compress();
} catch (error) {
  console.error("Error:", error);
}
