const express = require("express"),
	axios = require("axios").default,
	fs = require("fs")
const app = express()

const websiteData = fs.readFileSync("index.html", { encoding: "utf8" })
const iconData = fs.readFileSync("favicon.ico")

app.get("/asjs", (req, res) => {
	if (!req.originalUrl.endsWith("/")) {
		res.redirect("asjs/")
		return
	}
	res.header("Content-Type", "text/html")
	res.send(websiteData)
})

app.get("/asjs/favicon.ico", (req, res) => {
	res.header("Content-Type", "image/x-icon")
	res.send(iconData)
})

app.get("/asjs/:id", async (req, res) => {
	const data = await axios.get(`https://pastebin.com/raw/${req.params.id}`, {
		validateStatus: () => true,
	})
	res.header("Content-Type", "application/javascript")
	res.send(data.status !== 200 ? 'alert("Invalid pastebin id!")' : data.data)
})

app.listen(process.env.NODE_ENV !== "production" ? 8080 : 80)
