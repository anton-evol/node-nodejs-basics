import { promises as fs } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const list = async () => {
  const currentDirectory = dirname(fileURLToPath(import.meta.url));
  const filesDirectory = join(currentDirectory, "files");

  try {
    const fileNames = await fs.readdir(filesDirectory);
    console.log(fileNames);
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error("FS operation failed");
    } else {
      throw error;
    }
  }
};

await list();
