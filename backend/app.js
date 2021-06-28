const app = require("express")();

// Use body-parser to retrieve the raw body as a buffer
const bodyParser = require("body-parser");

app.post(
	"/webhook",
	bodyParser.raw({ type: "application/json" }),
	(request, response) => {
		const payload = request.body;

		console.log("Got payload: " + payload);

		response.status(200);
	},
);

app.listen(4242, () => console.log("Running on port 4242"));
