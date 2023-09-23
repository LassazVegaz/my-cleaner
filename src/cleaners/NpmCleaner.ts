import fs from "fs";
import path from "path";
import ICleaner from "../ICleaner.js";

const NODE_MODULES_DIR = "node_modules";

export default class NpmCleaner implements ICleaner {
	get name(): string {
		return "NPM";
	}

	async isCleanable(dir: string): Promise<boolean> {
		// check if dir has node_modules folder
		const nodeModulesDir = path.join(dir, NODE_MODULES_DIR);
		return fs.existsSync(nodeModulesDir);
	}
	async clean(dir: string): Promise<void> {
		// throw error if dir is not cleanable
		if (!(await this.isCleanable(dir))) {
			throw new Error(`${dir} is not cleanable`);
		}

		// remove node_modules folder
		const nodeModulesDir = path.join(dir, NODE_MODULES_DIR);
		fs.rmSync(nodeModulesDir, { recursive: true });
	}
}
