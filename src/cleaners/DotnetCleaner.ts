import fs from "fs";
import path from "path";
import { exec } from "child_process";
import ICleaner from "../ICleaner.js";

export default class DotnetCleaner implements ICleaner {
	get name(): string {
		return "dotnet";
	}

	async isCleanable(dir: string): Promise<boolean> {
		// check if *.csproj or *.vbproj file exists
		const fileNames = fs.readdirSync(dir);
		const csprojFileExists = fileNames.some(
			(fileName) =>
				fileName.endsWith(".csproj") || fileName.endsWith(".vbproj")
		);
		return csprojFileExists;
	}

	async clean(dir: string): Promise<void> {
		// throw error if dir is not cleanable
		if (!(await this.isCleanable(dir))) {
			throw new Error(`${dir} is not cleanable`);
		}

		// run dotnet clean
		await this.runDotnetClean(dir);

		// remove obj, bin and .vs folders
		this.removeIfExists(dir, "obj");
		this.removeIfExists(dir, "bin");
		this.removeIfExists(dir, ".vs");
	}

	private runDotnetClean(dir: string): Promise<void> {
		return new Promise((resolve, reject) => {
			exec("dotnet clean", { cwd: dir }, () => {
				resolve();
			});
		});
	}

	// remove folder if it exists
	private removeIfExists(parentDir: string, folderName: string): void {
		const dir = path.join(parentDir, folderName);
		if (fs.existsSync(dir)) {
			fs.rmSync(dir, { recursive: true });
		}
	}
}
