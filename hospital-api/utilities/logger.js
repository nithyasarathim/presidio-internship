const logger = {
    log: (apiPath, message) => {
      const timestamp = new Date().toISOString();
      console.log(`[${timestamp}] [${apiPath}] ${message}`);
    },
  };
  
 export default logger;
  