import withSub from "../../../lib/withSub";

async function handler(req, res) {

    res.status(200).json({
        sub: req.sub
    })

}

export default withSub(handler)