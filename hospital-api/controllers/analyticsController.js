import analyticsService from "../services/analyticsService.js";
import logger from "../utilities/logger.js";

const getAnalytics = async (req, res, next) => {
  const {originalUrl:apiPath} = req;
  const recentLimit = parseInt(req.query.recent)||5;

  try {
    logger.log(apiPath, `Analytics request by Admin: ${req.user.email}, recent=${recentLimit}`);
    const data = await analyticsService.getAnalytics(recentLimit);
    res.json({ success: true, analytics: data });
  } catch (err) {
    next(err);
  }

};

export default { getAnalytics };
