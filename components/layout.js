import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import fetcher from "../lib/fetcher";
import Button from "./Button";
import FormItem from "./FormItem";
import Input from "./Input";
import ModalDialog from "./ModalDialog";

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

    const [deleteDialog, setDeleteDialog] = useState(false)
    const deleteForm = (id) => fetch(`/api/forms/${id}`, {
        method: "DELETE"
    })

    return (
        <div className="h-screen flex flex-row">
            <div className="w-72 h-screen border-r flex flex-col gap-5 relative">

                <div className="absolute top-0 left-0 right-0 bg-white border-b h-16 flex items-center p-3">
                    <div className="">
                        <Link href="/forms"><a><div className="text-2xl font-black">submit.host</div></a></Link>
                    </div>
                </div>

                <ModalDialog
                    open={newForm.isOpen}
                    onClose={() => setNewForm({ ...newForm, ["isOpen"]: false })}
                    title="Create New Form"
                    description="You can rename form later"
                    actionTitle="Create"
                    actionOnClick={async () => {
                        await createForm()
                        mutate([...forms, { title: newForm.title }])
                        setNewForm({ ...newForm, ["isOpen"]: false })
                    }}
                    cancel={() => setNewForm({ ...newForm, ["isOpen"]: false, ["title"]: "" })}>
                    <Input value={newForm.title} onChange={e => setNewForm({ ...newForm, ["title"]: e.target.value })} />
                </ModalDialog>

                <ModalDialog
                    open={deleteDialog ? true : false}
                    onClose={() => setDeleteDialog(false)}
                    title={`Are you sure want to delete ${deleteDialog.title}`}
                    description="This cannot be undone"
                    actionTitle="Delete"
                    actionOnClick={async () => {
                        const id = deleteDialog._id
                        setDeleteDialog(false)
                        if (router.query.id === id) {
                            router.push("/forms")
                        }
                        deleteForm(id)
                        mutate(forms.filter(f => f._id !== id))
                    }} />

                <div className="overflow-y-scroll divide-y pt-16">
                    {forms && forms.map((form, index) => (
                        <FormItem
                            key={form._id ?? index}
                            form={form} deleteHandler={() => {
                                setDeleteDialog(form)
                            }} />
                    ))}
                </div>

                <div className="absolute left-0 bottom-0 right-0 bg-white p-5 z-10 flex items-center place-content-between border-t">
                    <div>{forms && forms.length} forms</div>
                    <div>
                        <Button onClick={async () => {
                            setNewForm({ ...newForm, ["isOpen"]: true })
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                            </svg>
                        </Button>
                    </div>
                </div>

            </div>
            <div className="flex-1">
                {children}
            </div>
        </div>
    )
}