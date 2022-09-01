import { useRouter } from "next/router";
import Layout from "../../../components/layout";

export default function Submission() {
    
    const router = useRouter()
    const { id, submission } = router.query

    return (
        <div>
            {id},{submission}
        </div>
    )
}

Submission.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}