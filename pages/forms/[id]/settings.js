import { Switch, Tab } from "@headlessui/react"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useRouter } from "next/router"
import { useState } from "react"
import Input from "../../../components/Input"
import Toggle from "../../../components/Toggle"

export default function Settings() {

    const router = useRouter()
    const { id } = router.query

    const [tabs] = useState([
        {
            title: "Overview",
            content: [
                {
                    title: "Form endpoint",
                }
            ]
        },
        {
            title: "Settings",
            content: [
                {
                    title: "Enabled",
                    description: "",
                    key: "enabled",
                    value: false
                },
                {
                    title: "Restrict domain",
                    description: "",
                    key: "domain",
                    value: ""
                }
            ]
        },
        {
            title: "Integrations"
        },
    ])

    return (
        <div className="bg-white h-full p-5">
            <h2 className="text-2xl font-fold">Settings</h2>
            <Tab.Group>
                <Tab.List className="w-full flex border-b">
                    {tabs.map((tab, index) => (
                        <Tab className="p-3">{tab.title}</Tab>
                    ))}
                </Tab.List>
                <Tab.Panels>
                    {tabs.map((tab, index) => (
                        <Tab.Panel>
                            <div className="w-full">
                                {tab.content && tab.content.map(row => (
                                    <div className="flex p-2">
                                        <div className="flex-1">{row.title}</div>
                                        <div className="flex-1">
                                            {typeof row.value === "boolean" ? <Toggle /> : <Input />}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>

        </div>
    )
}

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale))
        }
    }
}