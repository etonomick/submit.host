import { Tab } from "@headlessui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import EmptyState from "./EmptyState";
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

            <div className="w-full md:w-1/3 flex flex-col relative h-72 md:h-full border-r border-r-black">

                <div className="h-full">
                    <Tab.Group>
                        <Tab.List className=" w-full absolute flex border-b border-b-black overflow-hidden">
                            {tabs.map((tab, index) => (
                                <Tab className={({ selected }) => `transition-all duration-250 flex-1 p-3  ${selected ? "border-b-red-500 text-slate-700" : "border-b-white text-slate-500"}`}>{tab}</Tab>
                            ))}
                        </Tab.List>
                        <Tab.Panels className="h-full">
                            <Tab.Panel className="h-screen overflow-y-scroll">
                                <div className="flex flex-col pt-14">
                                    {data && data.form.submissions.filter(submission => !submission.is_viewed).map((submission, index) => (
                                        <SubmissionItem item={submission} key={submission._id} />
                                    ))}
                                </div>
                            </Tab.Panel>
                            <Tab.Panel className="overflow-y-scroll h-screen">
                                <div className="pt-14 flex flex-col">
                                    {data && data.form && data.form.submissions && data.form.submissions.map((submission, index) => (
                                        <SubmissionItem item={submission} key={submission._id} />
                                    ))}
                                </div>
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </div>

            </div>

            <div className="w-full md:w-2/3 flex items-center justify-center">
                {children ? children : <EmptyState />}
            </div>

        </div>
    )
}