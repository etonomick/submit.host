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
        <div className="flex min-h-screen bg-yellow-300">
            <div className="w-72 h-full overflow-y-scroll bg-neutral-50 flex flex-col gap-5 p-5">
                <Link href="/forms"><a><div className="text-2xl font-black">submit.host</div></a></Link>

                <Button onClick={async () => {
                    await createForm()
                    mutate([...forms, newForm])
                }}>Create new form</Button>

                <div className="overflow-y-scroll">
                    {forms && forms.map((form, index) => (
                        <div key={form._id ?? index} className={`${!form._id ? "text-gray-500" : "text-green-500"} ${router.query.id === form._id ? "bg-black" : "bg-blue-300"}`}>
                            <Link href={`/forms/${form._id}`}><a>{form.title}</a></Link>
                            <pre className="text-xs">{JSON.stringify(form, null, 2)}</pre>
                        </div>
                    ))}
                </div>

            </div>
            <div className="flex-1 overflow-y-scroll">
                {children}
            </div>
        </div>
    )
}