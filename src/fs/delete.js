import { promises as fs } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const remove = async () => {
  const currentDirectory = dirname(fileURLToPath(import.meta.url));
  const fileToRemovePath = join(currentDirectory, "files", "fileToRemove.txt");

  try {
    await fs.access(fileToRemovePath);
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error("FS operation failed");
    } else {
      throw error;
    }
  }

  await fs.unlink(fileToRemovePath);
};

await remove();
