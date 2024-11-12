import shortid from "shortid"
import URL from "../models/url.js"
export const generateShortURL = async (req, res) => {
    const body = req.body;
    if (!body.url) return res.status(400).render("home", { error: "url is required" });
    const existingURL = await URL.findOne({redirectURL: body.url});
    // const allUrls = await URL.find({});
    // if (allUrls) res.render("home", {urls : allUrls})
    if(existingURL) return res.render("home", {id: existingURL.shortID})
    const shortID = shortid()
    await URL.create({
        shortID: shortID,
        redirectURL: body.url,
        visitHistory: []
    });
    return res.render("home", {
        id: shortID,
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

export const deleteShortId = async (req, res)=>{
    console.log(req.params.id)
    await URL.findByIdAndDelete(req.params.id);
    res.render("home")
    // if(!id) return res.status(404).render("home");
    // const allUrls = await URL.find({});
    // if (allUrls) res.render("home", {urls : allUrls})
}

export const analyticsURL = async (req, res) => {
    const shortID = req.params.shortId;
    const result = await URL.findOne({ shortID });
    return res.json({ 
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory
 })
}