const shortid = require("shortid");
const URL = require("../models/url");


async function handleGenerateNewShortURL(req,res){
    const body = req.body;
    if(!body.url){
        return res.status(400).json({error:'url is required'});
    }
    const shortID = shortid();
    console.log(shortID);
//creating short id in db
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory:[]
    });
 
    // return res.json({id: shortID});   //here we are sending json reponse
    //but we want to render home page as response

    return res.render('home', {
        id:shortID
    });
}

async function handleRedirectUrl(req,res){
        const shortId = req.params.shortId;
    const entry=    await URL.findOneAndUpdate({
        shortId
    },{
        $push:{
            visitHistory:{
                timestamp:Date.now(),
            }
        }
    })
    res.redirect(entry.redirectURL);
}

async function handleGetAnalytics(req, res){

    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});

    return res.json({
        totalClicks: result.visitHistory.length,
        analytics:result.visitHistory,
    });
}

module.exports = {
    handleGenerateNewShortURL,
    handleRedirectUrl,
    handleGetAnalytics,
};