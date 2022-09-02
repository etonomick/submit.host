import { useRouter } from "next/router"

export default function Settings() {

    const router = useRouter()
    const { id } = router.query

    return (
        <div>
            Settings {id}
        </div>
    )
}