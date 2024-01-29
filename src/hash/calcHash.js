import { createReadStream } from "fs";
import { createHash } from "crypto";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const calculateHash = async () => {
  const currentDirectory = dirname(fileURLToPath(import.meta.url));
  const filePath = join(
    currentDirectory,
    "files",
    "fileToCalculateHashFor.txt"
  );

  return new Promise((resolve, reject) => {
    const hash = createHash("sha256");
    const stream = createReadStream(filePath);

    stream.on("readable", () => {
      const data = stream.read();
      if (data) hash.update(data);
    });

    stream.on("end", () => {
      const hexHash = hash.digest("hex");
      console.log(hexHash);
      resolve(hexHash);
    });

    stream.on("error", (error) => {
      reject(error);
    });
  });
};

try {
  await calculateHash();
} catch (error) {
  console.error("Error calculating hash:", error.message);
}
