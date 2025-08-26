import express from "express";
import bodyParser from "body-parser";
import resourceRoutes from "../src/routes/resource.route";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use("/api", resourceRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
