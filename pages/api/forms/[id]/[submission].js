import { ObjectId } from "mongodb";
import clientPromise from "../../../../lib/mongodb";

export default async function handler(req, res) {

    const { id, submission } = req.query

    console.log(`${id}/${submission}`)

    const client = await clientPromise
    const db = client.db("test")

    const data = await db.collection("submissions").findOne({
        _id: ObjectId(submission),
        form_id: ObjectId(id)
    })

    res.status(200).json({
        data
    })

}