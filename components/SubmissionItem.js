import Link from "next/link"
import { useRouter } from "next/router"

export default function SubmissionItem({ item }) {

    const router = useRouter()
    const { submission } = router.query

    return (
        <Link href={`/forms/${item.form_id}/${item._id}`}><a>
            <div className={`p-3 ${submission === item._id ? "border-t border-t-black border-b border-b-black" : "border-t border-b border-transparent bg-transparent"}`}>
                <pre className="text-xs line-clamp-5">{JSON.stringify(item.data, null, 2)}</pre>
                <div className="">{new Date().toLocaleDateString()}</div>
            </div>
        </a></Link>
    )
}