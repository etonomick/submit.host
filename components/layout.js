import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import fetcher from "../lib/fetcher";
import Button from "./Button";

export default function Layout({ children }) {

    const router = useRouter()

    const { data: forms, error, mutate } = useSWR('/api/forms', fetcher)

    const [newForm, setNewForm] = useState({
        title: "Mutate test"
    })

    const createForm = () => fetch("/api/forms", {
        method: "POST",
        body: JSON.stringify(newForm)
    })

    return (
        <div className="h-screen flex flex-row">
            <div className="w-72 h-full border-r flex flex-col gap-5 relative pt-14">

                <div className="absolute top-0 bg-white">
                    <Link href="/forms"><a><div className="text-2xl font-black">submit.host</div></a></Link>
                </div>

                <Button onClick={async () => {
                    await createForm()
                    mutate([...forms, newForm])
                }}>Create new form</Button>

                <div className="overflow-y-scroll p-3">
                    {forms && forms.map((form, index) => (
                        <Link href={`/forms/${form._id}`}><a>
                            <div key={form._id ?? index} className={`flex items-center gap-3 p-3 rounded ${!form._id ? "text-neutral-500" : "text-black"} ${router.query.id === form._id ? "bg-neutral-200" : "bg-white"}`}>
                                <div className="flex-1">{form.title}</div>
                                {form.unread > 0 && <div className="bg-red-500 text-white px-2 rounded-full">{form.unread}</div>}
                                <div className="text-neutral-400">{form.total}</div>
                            </div>
                        </a></Link>
                    ))}
                </div>

                <div className="absolute left-0 bottom-14 right-0 bg-pink-500 p-5 z-10 flex items-center justify-center">
                    <div>{forms && forms.length} forms</div>
                </div>

            </div>
            <div className="flex-1">
                {children}
            </div>
        </div>
    )
}