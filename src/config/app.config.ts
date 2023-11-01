export default () => ({
	port: parseInt(process.env.PORT, 10) || 3000,
	host: process.env.HOST,
	cloudwatch: {
		accessKey: process.env.AWS_ACCESS_KEY,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
		region: process.env.AWS_REGION,
		logGroup: process.env.LOG_GROUP,
	},
});
