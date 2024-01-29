import { createReadStream, createWriteStream } from "fs";
import { createGunzip } from "zlib";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const decompress = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const sourceFilePath = join(__dirname, "files", "archive.gz");
  const destinationFilePath = join(__dirname, "files", "fileToCompress.txt");

  const readStream = createReadStream(sourceFilePath);
  const writeStream = createWriteStream(destinationFilePath);
  const gunzip = createGunzip();

  readStream.pipe(gunzip).pipe(writeStream);

  return new Promise((resolve, reject) => {
    writeStream.on("finish", () => {
      console.log("File decompression completed.");
      resolve();
    });

    writeStream.on("error", (error) => {
      console.error("Error during decompression:", error);
      reject(error);
    });
  });
};

try {
  await decompress();
} catch (error) {
  console.error("Error:", error);
}
