import { promises as fs, createReadStream, createWriteStream } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const copy = async () => {
  const currentDirectory = dirname(fileURLToPath(import.meta.url));
  const sourceDir = join(currentDirectory, "files");
  const targetDir = join(currentDirectory, "files_copy");

  try {
    await fs.access(sourceDir);
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error("FS operation failed");
    } else {
      throw error;
    }
  }

  try {
    await fs.access(targetDir);
    throw new Error("FS operation failed");
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }

  const copyFiles = async (source, target) => {
    await fs.mkdir(target, { recursive: true });
    const entries = await fs.readdir(source, { withFileTypes: true });

    for (const entry of entries) {
      const sourcePath = join(source, entry.name);
      const targetPath = join(target, entry.name);

      if (entry.isDirectory()) {
        await copyFiles(sourcePath, targetPath);
      } else {
        await new Promise((resolve, reject) => {
          const readStream = createReadStream(sourcePath);
          const writeStream = createWriteStream(targetPath);
          readStream.on("error", reject);
          writeStream.on("error", reject);
          writeStream.on("finish", resolve);
          readStream.pipe(writeStream);
        });
      }
    }
  };

  await copyFiles(sourceDir, targetDir);
};

await copy();
