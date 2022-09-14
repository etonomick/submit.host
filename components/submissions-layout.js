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
                        <Tab.List className=" w-full absolute flex border-b-2 border-b-black overflow-hidden">
                            {tabs.map((tab, index) => (
                                <Tab className={({ selected }) => `transition-all duration-250 flex-1 p-3  ${selected ? "border-b-red-500 text-slate-700" : "border-b-white text-slate-500"}`}>{tab}</Tab>
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
                                <div className="pt-14 flex flex-col px-2">
                                    {data && data.form && data.form.submissions && data.form.submissions.map((submission, index) => (
                                        <SubmissionItem item={submission} key={submission._id} />
                                    ))}
                                </div>
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </div>

            </div>

            <div className="w-full md:w-2/3 border-l-2 border-t-2 border-black flex items-center justify-center">
                {children ? children : <div className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15m.002 0h-.002" />
</svg>
<div>Select submission from the left</div>
                    </div>}
            </div>

        </div>
    )
}