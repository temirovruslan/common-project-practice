import express from "express";
import cors from "cors";

const app = express();

// Define the port number to listen on
const port = 4444;

app.use(cors());
app.use(express.json());

// Define a route handler for the root URL
app.get("/", (req, res) => {
	res.send("Hello, world!");
});

app.post("/send", (req, res) => {
	res.json(req.body);
});

// Start the server
app.listen(port, (err) => {
	if (err) {
		return console.log(err);
	}
	console.log(`Server running at http://localhost:${port}/`);
});
