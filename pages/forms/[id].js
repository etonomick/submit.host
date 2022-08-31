import { useRouter } from "next/router";
import useSWR from "swr";
import Layout from "../../components/layout";
import fetcher from "../../lib/fetcher";

export default function FormDetails() {

    const router = useRouter()
    const { id } = router.query

    const { data, error, mutate } = useSWR(`/api/forms/${id}`, fetcher)

    if (error) {
        return (
            <div>Error</div>
        )
    }

    if (!data) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div className="flex bg-orange-400">
            <div className="w-64 bg-green-500">

                <h1 className="text-2xl">{data.form.title}</h1>

                {data && data.form.submissions.map(submission => (
                    <div>
                        <pre className="text-xs font-mono whitespace-pre-wrap">
                            {JSON.stringify(submission.data, null, 2)}
                        </pre>
                    </div>
                ))}

            </div>
        </div>
    )
}

FormDetails.getLayout = function getLayout(page) {
    return (
        <Layout>{page}</Layout>
    )
}