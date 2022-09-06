import { Tab } from "@headlessui/react"
import { useRouter } from "next/router"
import { useState } from "react"

export default function Settings() {

    const router = useRouter()
    const { id } = router.query

    const [tabs] = useState([
        {
            title: "Overview",
        },
        {
            title: "Settings"
        },
        {
            title: "Integrations"
        },
    ])

    return (
        <div className="bg-white h-full">
            <Tab.Group>
                <Tab.List>
                    {tabs.map((tab, index) => (
                        <Tab>{tab.title}</Tab>
                    ))}
                </Tab.List>
                <Tab.Panels>
                    {tabs.map((tab, index) => (
                        <Tab.Panel>
                        <div className="w-full h-full flex items-center justify-center">
                            {tab.title}
                        </div>
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>

        </div>
    )
}