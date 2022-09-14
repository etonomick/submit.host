import { useTranslation } from "next-i18next";
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
    }).then(res => res.json()).then(data => {
        router.push(`/forms/${data.insertedIds["0"]}/settings`)
    })

    const [deleteDialog, setDeleteDialog] = useState(false)
    const deleteForm = (id) => fetch(`/api/forms/${id}`, {
        method: "DELETE"
    })

    const [visible, setVisible] = useState(true)

    const { t } = useTranslation()

    return (
        <div className="flex flex-col h-screen bg-neutral-50 font-mono">
            <div className="flex flex-row place-content-between py-3 items-center 
             absolute left-0 top-0 right-0 z-50 border-b border-b-black">
                <div className="flex text-3xl font-bold items-center">
                    <Button onClick={() => setVisible(!visible)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                    </Button>
                    <div>
                        <Link href="/forms"><a>submit.host</a></Link>
                    </div>
                </div>
                <div>{t("my_account")}</div>
            </div>
            <div className="flex flex-col md:flex-row flex-1 pt-16">
                <div className={`${visible ? "w-full md:w-1/4 shrink-0 overflow-clip flex flex-col relative" : "hidden"} relative border-r border-r-black`}>

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
                        }}
                        cancel={() => setDeleteDialog(false)} />

                    <div className="overflow-y-scroll flex flex-col h-screen pb-16 gap-2">
                        {forms && forms.map((form, index) => (
                            <FormItem
                                key={form._id ?? index}
                                form={form} deleteHandler={() => {
                                    setDeleteDialog(form)
                                }} />
                        ))}
                    </div>

                    <div className="absolute left-0 bottom-0 right-0 p-3 z-10 flex items-center place-content-between border-t border-t-black">
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
                <div className={`w-full ${visible ? "md:w-3/4" : "w-full"}`}>
                    {children}
                </div>
            </div>
        </div>
    )
}