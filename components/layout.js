import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import fetcher from "../lib/fetcher";
import Button from "./Button";
import FormItem from "./FormItem";

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

    const deleteForm = (id) => fetch(`/api/forms/${id}`, {
        method: "DELETE"
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

                <div className="overflow-y-scroll divide-y">
                    {forms && forms.map((form, index) => (
                        <FormItem key={form._id ?? index} form={form} deleteHandler={async () => {
                            if (router.query.id === form._id) {
                                router.push("/forms")
                            }
                            deleteForm(form._id)
                            mutate(forms.filter(f => f._id !== form._id))
                        }} />
                    ))}
                </div>

                <div className="absolute left-0 bottom-14 right-0 bg-white p-5 z-10 flex items-center justify-center">
                    <div>{forms && forms.length} forms</div>
                </div>

            </div>
            <div className="flex-1">
                {children}
            </div>
        </div>
    )
}