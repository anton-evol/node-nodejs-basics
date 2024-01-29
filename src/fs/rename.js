import { promises as fs } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const rename = async () => {
  const currentDirectory = dirname(fileURLToPath(import.meta.url));
  const oldFilePath = join(currentDirectory, "wrongFilename.txt");
  const newFilePath = join(currentDirectory, "properFilename.md");

  try {
    await fs.stat(oldFilePath);
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error("FS operation failed");
    } else {
      throw error;
    }
  }

  try {
    await fs.stat(newFilePath);
    throw new Error("FS operation failed");
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.rename(oldFilePath, newFilePath);
    } else {
      throw error;
    }
  }
};

await rename();
