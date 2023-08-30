const express = require("express");
const {handleGenerateNewShortURL} = require("../controllers/url");
const {handleGetAnalytics} = require("../controllers/url")
const {handleRedirectUrl}= require("../controllers/url");
const router = express.Router();

router.post("/", handleGenerateNewShortURL); //http://localhost:8001/url send url in body in json format
router.get("/:shortId", handleRedirectUrl); //  http://localhost:8001/url/FJCacP-GJ

router.get("/analytics/:shortId", handleGetAnalytics); //http://localhost:8001/url/analytics/FJCacP-GJ

module.exports = router;