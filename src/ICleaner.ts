export default interface ICleaner {
	clean(dir: string): Promise<void>;
	isCleanable(dir: string): Promise<boolean>;
	get name(): string;
}
