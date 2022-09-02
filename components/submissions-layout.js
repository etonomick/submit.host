import { Tab } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "../lib/fetcher";

export default function SubmissionsLayout({ children }) {
    const router = useRouter()
    const { id } = router.query

    const { data, error, mutate } = useSWR(`/api/forms/${id}`, fetcher)

    return (
        <div className="flex flex-row h-full">
            <div className="w-72 border-r flex flex-col relative">

                <div className="bg-white/50 backdrop-blur p-3">
                    <div className="text-2xl font-bold">Submissions</div>
                </div>

                <div className="overflow-y-scroll h-full">
                    <Tab.Group>
                        <Tab.List className="bg-white w-full absolute flex space-x-1 p-3 border-b">
                            <Tab>Unread {data && data.form && data.form.submissions && data.form.submissions.filter(submission => submission.is_viewed === false).length}</Tab>
                            <Tab>All {data && data.form && data.form.submissions && data.form.submissions.length}</Tab>
                        </Tab.List>
                        <Tab.Panels className="h-full">
                            <Tab.Panel className="h-full">
                                <div className="h-full flex flex-col items-center justify-center">
                                    <div className="w-8 h-8">
                                        <svg viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                                            <g>
                                                <rect height="13" width="13" fill="none" rx="1" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" x="0.5" y="0.5" />
                                                <path d="M.5,8H4A1,1,0,0,1,5,9,2,2,0,0,0,9,9a1,1,0,0,1,1-1h3.5" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" />
                                            </g>
                                        </svg>
                                    </div>
                                    <div>There is nothing here yet</div>
                                </div>
                                {/* {data && data.form.submissions.filter(submission => submission.is_viewed === false).map(submission => (
                                    <div>
                                        {JSON.stringify(submission, null, 2)}
                                    </div>
                                ))} */}
                            </Tab.Panel>
                            <Tab.Panel>
                                <div className="overflow-y-scroll h-auto flex flex-col pt-14">
                                    {data && data.form && data.form.submissions && data.form.submissions.map((submission, index) => (
                                        <div key={submission._id}>
                                            <Link href={`/forms/${submission.form_id}/${submission._id}`}><a>
                                                <pre className="text-xs font-mono whitespace-pre-wrap">
                                                    {JSON.stringify(submission, null, 2)}
                                                </pre>
                                            </a></Link>
                                        </div>
                                    ))}
                                </div>
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </div>

            </div>

            <div className="flex-1">{children}</div>

        </div>
    )
}