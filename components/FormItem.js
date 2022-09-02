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

            <div className={`transition-all duration-250 flex items-center gap-3 p-3 ${!form._id ? "text-neutral-500" : "text-black"} ${router.query.id === form._id ? "bg-neutral-200" : "bg-white hover:bg-neutral-50"}`}>
                <div className="flex-1 truncate">
                    <Link href={`/forms/${form._id}`}>
                        <a>{form.title}</a></Link>
                </div>
                {form.unread > 0 && <div className="bg-red-500 text-white text-xs px-2 rounded-full">{form.unread}</div>}
                <div className="text-neutral-400 text-xs">
                    {form.total}
                </div>
                <div className="inline-flex items-center justify-center m-auto w-5 h-5 bg-pink-500">
                    <div className="absolute">
                        <Menu as="div" className="inline-block text-left relative">
                            <Menu.Button>m</Menu.Button>
                            <Menu.Items className="absolute right-0 mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
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