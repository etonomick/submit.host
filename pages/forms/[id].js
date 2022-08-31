import { Tab } from "@headlessui/react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Layout from "../../components/layout";
import fetcher from "../../lib/fetcher";

export default function FormDetails() {

    const router = useRouter()
    const { id } = router.query

    const { data, error, mutate } = useSWR(`/api/forms/${id}`, fetcher)

    return (
        <div className="flex flex-row h-full">
            <div className="w-72 border-r flex flex-col relative">

                <div className="bg-white/50 backdrop-blur p-3">
                    <div className="text-2xl font-bold">Submissions</div>
                </div>

                <div className="overflow-y-scroll">
                    <Tab.Group>
                        <Tab.List className="bg-white w-full absolute flex space-x-1 p-3 border-b">
                            <Tab>Unread {data && data.form.submissions.filter(submission => submission.is_viewed === false).length}</Tab>
                            <Tab>All {data && data.form.submissions.length}</Tab>
                        </Tab.List>
                        <Tab.Panels>
                            <Tab.Panel>
                                {data && data.form.submissions.filter(submission => submission.is_viewed === false).map(submission => (
                                    <div>
                                        {JSON.stringify(submission, null, 2)}
                                    </div>
                                ))}
                            </Tab.Panel>
                            <Tab.Panel>
                                <div className="overflow-y-scroll h-auto flex flex-col">
                                    {data && data.form.submissions.map((submission, index) => (
                                        <div key={submission._id}>
                                            <pre className="text-xs font-mono whitespace-pre-wrap">
                                                {JSON.stringify(submission, null, 2)}
                                            </pre>
                                        </div>
                                    ))}
                                </div>
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </div>

            </div>

            <div className="flex-1 flex flex-col">
                <div className="flex-1 border-b">
                    Preview
                </div>
                <div className="flex-1">
                    Integrations
                </div>
            </div>

        </div>
    )
}

FormDetails.getLayout = function getLayout(page) {
    return (
        <Layout>{page}</Layout>
    )
}