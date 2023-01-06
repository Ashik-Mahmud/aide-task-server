const app = require("./app");
const PORT = process.env.PORT || 5000;




// not found route handler
app.get("*", (req, res) => {
    res.redirect(process.env.CLIENT_URL);
});


// global error handler
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});


// not found handler
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.statusCode = 404;
    err.status = "fail";
    next(err);
});









app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.yellow.bold);
});
