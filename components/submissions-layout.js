import { Tab } from "@headlessui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import SubmissionItem from "./SubmissionItem";

export default function SubmissionsLayout({ children }) {
    const router = useRouter()
    const { id } = router.query

    const { data, error, mutate } = useSWR(`/api/forms/${id}`, fetcher)

    const [tabs] = useState([
        "Unread",
        "All"
    ])

    return (
        <div className="flex flex-col md:flex-row gap-3 w-full h-full">

            <div className="w-full md:w-1/3 flex flex-col relative h-72 md:h-full">

                <div className="h-full">
                    <Tab.Group>
                        <Tab.List className="bg-white w-full rounded-lg absolute shadow flex  divide-x overflow-hidden text-sm font-medium">
                            {tabs.map((tab, index) => (
                                <Tab className={({selected}) => `transition-all duration-250 flex-1 p-3 border-b-2  ${selected ? "border-b-red-500 text-slate-700" : "border-b-white text-slate-500"}`}>{tab}</Tab>
                            ))}
                        </Tab.List>
                        <Tab.Panels className="h-full">
                            <Tab.Panel className="h-full">
                                <div className="flex flex-col items-center justify-center h-full">
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
                            </Tab.Panel>
                            <Tab.Panel className="overflow-y-scroll h-screen">
                                <div className="pt-16">
                                {data && data.form && data.form.submissions && data.form.submissions.map((submission, index) => (
                                    <SubmissionItem item={submission} key={submission._id} />
                                ))}
                                </div>
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </div>

            </div>

            <div className="w-full md:w-2/3">{children}</div>

        </div>
    )
}