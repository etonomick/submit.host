import useSWR from "swr"
import fetcher from "../lib/fetcher"

export default function Layout({ children }) {

    const { data, error } = useSWR('/api/forms', fetcher)

    return (
        <div className="min-h-screen flex">
            <div className="w-72 overflow-scroll bg-gray-200 flex flex-col gap-5 p-5">
                <div>submit.host</div>
                {JSON.stringify(data)}
                {error && JSON.stringify(error)}
            </div>
            <div className="flex-1">
                {children}
            </div>
        </div>
    )
}