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
                        <div className="flex-1">{form.title}</div>
                        <div className={`w-4 h-4 ${hover ? "inline-flex" : "hidden"}`} onClick={deleteHandler}>
                            <svg viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                                <g>
                                    <line fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" x1="1" x2="13" y1="3.5" y2="3.5" />
                                    <line fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" x1="5.5" x2="5.5" y1="5.5" y2="11" />
                                    <line fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" x1="8.5" x2="8.5" y1="5.5" y2="11" />
                                    <path d="M2.5,3.5h9a0,0,0,0,1,0,0v9a1,1,0,0,1-1,1h-7a1,1,0,0,1-1-1v-9A0,0,0,0,1,2.5,3.5Z" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M4.5,3.5V3a2.5,2.5,0,0,1,5,0v.5" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" />
                                </g>
                            </svg>
                        </div>
                        {form.unread > 0 && <div className="bg-red-500 text-white px-2 rounded-full">{form.unread}</div>}
                        <div className="text-neutral-400">{form.total}</div>
                    </div>
                </a>
            </Link>
        </div>
    )
}