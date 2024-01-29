import { promises as fs } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const create = async () => {
  const filesDir = join(dirname(fileURLToPath(import.meta.url)), "files");
  const freshFilePath = join(filesDir, "fresh.txt");
  try {
    await fs.access(freshFilePath);
    throw new Error("FS operation failed");
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.writeFile(freshFilePath, "I am fresh and young");
    } else {
      throw error;
    }
  }
};

await create();
