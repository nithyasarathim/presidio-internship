// utils/logger.js
const logRequest = (req, res) => {
  const start = new Date();

  // Hook into response finish event
  res.on('finish', () => {
    const log = {
      time: start.toISOString(),
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
    };
    console.log(JSON.stringify(log));
  });
};

export default logRequest;
