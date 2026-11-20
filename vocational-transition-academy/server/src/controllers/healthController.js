export const getHealth = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Udaan Vocational & Empowerment Academy API is running",
    data: {
      service: "vocational-transition-academy-api",
      version: "1.0.0",
      timestamp: new Date().toISOString(),
    },
  });
};