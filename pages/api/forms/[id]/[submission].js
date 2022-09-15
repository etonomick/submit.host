import { ObjectId } from "mongodb";
import clientPromise from "../../../../lib/mongodb";

export default async function handler(req, res) {

    const { id, submission } = req.query

    console.log(`${id}/${submission}`)

    const client = await clientPromise
    const db = client.db("test")

    if (req.method === "GET") {

        const data = await db.collection("submissions").findOne({
            _id: ObjectId(submission),
            form_id: ObjectId(id)
        })

        res.status(200).json({
            data
        })

    }

    if (req.method === "PATCH") {
        const data = await db.collection("submissions").updateOne({
            _id: ObjectId(submission)
        }, {
            $set: {
                "is_viewed": true
            }
        })
        res.status(200).json(data)
    }

}