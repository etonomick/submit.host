import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { mutate } from "swr";

export default function FormItem({ form, deleteHandler }) {

    const router = useRouter()

    const [hover, setHover] = useState(false)

    return (
        <div onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <Link href={`/forms/${form._id}`}>
                <a>
                    <div className={`transition-all duration-250 flex items-center gap-3 p-3 ${!form._id ? "text-neutral-500" : "text-black"} ${router.query.id === form._id ? "bg-neutral-200" : "bg-white hover:bg-neutral-50"}`}>
                        <div className="flex-1 truncate">{form.title}</div>
                        <div className={`w-4 h-4 text-neutral-500 hover:text-black ${hover ? "inline-flex" : "opacity-0"}`} onClick={deleteHandler}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>

                        </div>
                        {form.unread > 0 && <div className="bg-red-500 text-white text-xs px-2 rounded-full">{form.unread}</div>}
                        <div className="text-neutral-400 text-xs">{form.total}</div>
                    </div>
                </a>
            </Link>
        </div>
    )
}