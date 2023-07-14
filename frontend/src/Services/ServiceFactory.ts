class ServiceFactory {
	static get error(): (error: any, options?: any) => void {
		return (error: any, options?: any) => {
			console.log(error, options);
		};
	}
}

export default ServiceFactory;
