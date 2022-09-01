import { Dialog } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import fetcher from "../lib/fetcher";
import Button from "./Button";
import FormItem from "./FormItem";
import Input from "./Input";

export default function Layout({ children }) {

    const router = useRouter()

    const { data: forms, error, mutate } = useSWR('/api/forms', fetcher)

    const [newForm, setNewForm] = useState({
        isOpen: false,
        title: ""
    })

    const createForm = () => fetch("/api/forms", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: newForm.title
        })
    })

    const deleteForm = (id) => fetch(`/api/forms/${id}`, {
        method: "DELETE"
    })

    return (
        <div className="h-screen flex flex-row">
            <div className="w-72 h-screen border-r flex flex-col gap-5 relative">
{/* 
                <div className="absolute top-0 bg-white">
                    <div className="">
                        <Link href="/forms"><a><div className="text-2xl font-black">submit.host</div></a></Link>
                    </div>
                </div> */}

                <Dialog open={newForm.isOpen} onClose={() => setNewForm({ ...newForm, ["isOpen"]: false })} className="relative z-50">
                    {/* <div className="fixed inset-0 bg-black/30" aria-hidden="true" /> */}
                    <div className="fixed inset-0 flex items-center justify-center">
                        <Dialog.Panel className="mx-auto max-w-sm bg-white p-5 border">
                            <Dialog.Title
                                className="text-lg font-medium leading-6 text-gray-900">Create New Form</Dialog.Title>
                            <Input value={newForm.title} onChange={e => setNewForm({ ...newForm, ["title"]: e.target.value })} />
                            <Button
                                disabled={newForm.title.length < 1}
                                onClick={async () => {
                                    await createForm()
                                    mutate([...forms, { title: newForm.title }])
                                }}>Create Form</Button>
                            <Button onClick={() => setNewForm({ ...newForm, ["isOpen"]: false, ["title"]: "" })}>Cancel</Button>
                        </Dialog.Panel>
                    </div>
                </Dialog>

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

                <div className="absolute left-0 bottom-0 right-0 bg-white p-5 z-10 flex items-center justify-center">
                    <div>{forms && forms.length} forms</div>
                    <div>
                    <Button onClick={async () => {
                        setNewForm({ ...newForm, ["isOpen"]: true })
                    }}>new form</Button>
                    </div>
                </div>

            </div>
            <div className="flex-1">
                {children}
            </div>
        </div>
    )
}