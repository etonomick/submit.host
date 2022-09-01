import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";
import withToken from "../../../lib/withSub";

async function handler(req, res) {

    const { id } = req.query

    const client = await clientPromise
    const db = client.db("test")

    const form = await db.collection("forms").aggregate([
        {
            $match: {
                "_id": ObjectId(id),
            }
        },
        {
            $lookup: {
                from: "submissions",
                localField: "_id",
                foreignField: "form_id",
                as: "submissions",
            }
        },
        {
            $addFields: { 
                submissions_count: { 
                    $size: "$submissions" 
                }
            }
        }]).toArray().then(data => data[0])

    res.status(200).json({ form })

}

export default withToken(handler)