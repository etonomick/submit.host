import { Menu } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { mutate } from "swr";

export default function FormItem({ form, deleteHandler }) {

    const router = useRouter()

    const [hover, setHover] = useState(false)

    return (
        <div onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>

            <div className={`transition-all duration-250 flex items-center rounded-lg gap-3 p-3 ${!form._id ? "text-slate-500" : "text-slate-600 hover:text-slate-700"} ${router.query.id === form._id ? "bg-slate-300" : " hover:bg-slate-200"}`}>

                <div className="flex-1 truncate font-medium text-md">
                    <Link href={`/forms/${form._id}`}>
                        <a>{form.title}</a>
                    </Link>
                </div>

                {form.unread > 0 && <div className="bg-red-500 text-white text-xs px-2 rounded-full">{form.unread}</div>}

                <div className="text-neutral-400 text-xs">
                    {form.total}
                </div>

                <div className="m-auto w-6 h-6 relative">
                    <div className="absolute">
                        <Menu as="div" className="inline-block text-left relative">

                            <Menu.Button className="flex items-center justify-center w-6 h-6 text-slate-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                </svg>
                            </Menu.Button>

                            <Menu.Items className="absolute p-3 right-0 mt-2 origin-top-right divide-y divide-gray-100 bg-slate-50 rounded-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-40 w-40">
                                <Menu.Item>
                                    <Link href={`/forms/${form._id}/settings`}><a>Settings</a></Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <div onClick={deleteHandler}>Delete</div>
                                </Menu.Item>
                            </Menu.Items>
                        </Menu>
                    </div>
                </div>
            </div>

        </div>
    )
}