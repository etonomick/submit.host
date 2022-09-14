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

            <div className={`transition-all duration-250 flex items-center gap-3 p-3 ${!form._id ? "" : ""} ${router.query.id === form._id ? "font-black" : ""}`}>

                <div className="flex-1 flex flex-col gap-1.5">
                    <div className="line-clamp-2"><Link href={`/forms/${form._id}`}>
                        <a>{form.title}</a>
                    </Link></div>
                    <div className="text-xs">Created at {new Date().toLocaleDateString()}</div>
                    {/* <div>{JSON.stringify(form)}</div> */}
                </div>

                {form.unread > 0 && <div className="bg-red-500 text-black font-bold text-xs px-2">{form.unread}</div>}

                <div className="text-black text-xs">
                    {form.total}
                </div>

                <div className="m-auto w-6 h-6 relative">
                    <div className="absolute">
                        <Menu as="div" className="inline-block text-left relative">

                            <Menu.Button className="flex items-center justify-center w-6 h-6 text-black">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                </svg>
                            </Menu.Button>

                            <Menu.Items className="absolute right-0 mt-2 origin-top-right divide-y divide-black bg-orange-50 ring-2 ring-black focus:outline-none z-50 w-40 shadow-brick-to-r">
                                <Menu.Item>
                                    <div className="p-2">
                                        <Link href={`/forms/${form._id}/settings`}><a>Settings</a></Link>
                                    </div>
                                </Menu.Item>
                                <Menu.Item>
                                    <div className="p-2">
                                        <div onClick={deleteHandler}>Delete</div>
                                    </div>
                                </Menu.Item>
                            </Menu.Items>
                        </Menu>
                    </div>
                </div>
            </div>

        </div>
    )
}