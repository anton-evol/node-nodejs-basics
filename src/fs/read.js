import { promises as fs } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const read = async () => {
  const currentDirectory = dirname(fileURLToPath(import.meta.url));
  const fileToReadPath = join(currentDirectory, "files", "fileToRead.txt");

  try {
    const content = await fs.readFile(fileToReadPath, "utf8");
    console.log(content);
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error("FS operation failed");
    } else {
      throw error;
    }
  }
};

await read();
