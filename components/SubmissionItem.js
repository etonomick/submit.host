import Link from "next/link"
import { useRouter } from "next/router"

export default function SubmissionItem({ item }) {

    const router = useRouter()
    const { submission } = router.query

    return (
        <Link href={`/forms/${item.form_id}/${item._id}`}><a>
        <div className={`p-3 rounded-lg ${submission === item._id ? "bg-slate-300" : "bg-transparent"}`}>
            {/* <div>{JSON.stringify(flatten(item.data))}</div> */}
            <div>{Object.values(item.data).toString()}</div>
            {/* <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(item, null, 2)}</pre> */}
        </div>
        </a></Link>
    )
}