import { useSession } from "next-auth/react";

export default function Index() {

    const { data: session, status } = useSession()

    return (
        <></>
    )
}