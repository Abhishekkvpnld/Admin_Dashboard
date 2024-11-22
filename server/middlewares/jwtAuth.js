import jwt from "jsonwebtoken";

export const adminAuth = async (req, res, next) => {
  try {
    const adminToken = req.cookies?.token || req.headers?.cookie;

    if (!adminToken) {
      throw new Error("Please login first..🔐");
    }

    jwt.verify(adminToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        throw new Error("auth error🔐");
      }

      req.user = decoded;
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: true,
      message: "Authentication Error...🔐",
    });
  }
};
