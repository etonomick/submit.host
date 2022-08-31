import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {

    const { id } = req.query

    const client = await clientPromise

    const db = client.db("test")

    const form = await db.collection("forms").findOne({
        "_id": ObjectId(id)
    })

    const submission = await db.collection("submissions").insert({
        form_id: ObjectId(id),
        data: {
            "first_name": "Valery",
            "last_name": "Stepanov",
            order: [
                {
                    title: "Wrath of God",
                    quantity: 1,
                    price: 500
                }
            ]
        }
    })

    res.status(200).json(submission)

}