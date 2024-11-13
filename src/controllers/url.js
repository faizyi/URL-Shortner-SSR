import shortid from "shortid"
import URL from "../models/url.js"
export const generateShortURL = async (req, res) => {
    const body = req.body;
    if (!body.url) return res.status(400).render("home", { error: "url is required" });
    const existingURL = await URL.findOne({ redirectURL: body.url });
    if (existingURL) return res.render("home", { id: existingURL.shortID, urls: [existingURL]})
    const shortID = shortid()
    const shortURL = await URL.create({
        shortID: shortID,
        redirectURL: body.url,
        user: req.user._id,
        visitHistory: []
    });
    console.log(shortURL)
    return res.render("home", {
        id: shortID,
        urls: [shortURL]
    })
}

export const redirectURL = async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortID: shortId
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                }
            }
        }
    );
    if (!entry) {
        return res.status(404).send("Short URL not found");
    }
    res.redirect(entry.redirectURL);
}

export const deleteShortId = async (req, res) => {
    console.log(req.params.id)
    await URL.findByIdAndDelete(req.params.id);
    res.render("home")
}

export const analyticsURL = async (req, res) => {
    const shortID = req.params.shortId;
    const result = await URL.findOne({ shortID });
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    })
}