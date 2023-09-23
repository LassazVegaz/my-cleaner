import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import ICleaner from "./ICleaner.js";
import NpmCleaner from "./cleaners/NpmCleaner.js";
import DotnetCleaner from "./cleaners/DotnetCleaner.js";

dotenv.config();

const appsDir = process.env.APPS_DIR;

if (!appsDir) {
	throw new Error("APP_DIR not defined");
}

const cleaners: ICleaner[] = [new NpmCleaner(), new DotnetCleaner()];

// get a cleaner for the dir
const getCleaner = async (dir: string) => {
	for (const cleaner of cleaners) {
		if (await cleaner.isCleanable(dir)) {
			return cleaner;
		}
	}
	return null;
};

// go through all folders from the given dir and clean them
const startCleaning = async (from: string) => {
	console.log(`Searching ${from}---------------------------------`);

	const cleaner = await getCleaner(from);

	if (cleaner) {
		console.log(`${cleaner.name} project found in ${from}`);
		console.log("Cleaning...");
		await cleaner.clean(from);
	} else {
		console.log("Nothing to clean");
		// go through all subfolders
		const subFolders = fs.readdirSync(from);
		for (const subFolder of subFolders) {
			const subFolderPath = path.join(from, subFolder);
			if (fs.lstatSync(subFolderPath).isDirectory()) {
				await startCleaning(subFolderPath);
			}
		}
	}
};

startCleaning(appsDir)
	.then(() => {
		console.log("Done");
	})
	.catch((err) => {
		console.error("Cleaning failed");
		console.error(err);
	});
