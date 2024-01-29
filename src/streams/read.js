import { createReadStream } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const read = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const filePath = join(__dirname, "files", "fileToRead.txt");
  const readStream = createReadStream(filePath, { encoding: "utf8" });

  readStream.on("error", (error) => {
    console.error("Error reading file:", error);
  });

  readStream.pipe(process.stdout);
};

try {
  await read();
} catch (error) {
  console.error("Error:", error);
}
