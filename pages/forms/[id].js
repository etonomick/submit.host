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
        <div className="flex flex-row h-full">
            <div className="w-64 overflow-y-scroll">

                <h1 className="text-2xl">{data.form.title}</h1>

                {data && data.form.submissions.map((submission, index) => (
                    <div key={submission._id}>
                        <pre className="text-xs font-mono whitespace-pre-wrap">
                            {JSON.stringify(submission.data, null, 2)}
                        </pre>
                    </div>
                ))}

            </div>
            
            <div className="flex-1">
                Preview
            </div>

        </div>
    )
}

FormDetails.getLayout = function getLayout(page) {
    return (
        <Layout>{page}</Layout>
    )
}