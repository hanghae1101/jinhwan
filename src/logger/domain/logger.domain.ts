export interface ILogSender {
	sendLog(message: string, context?: any, stack?: any): Promise<void>;
}
