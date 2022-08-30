import { useRouter } from "next/router";
import Layout from "../../components/layout";

export default function FormDetails() {

    const router = useRouter()
    const { id } = router.query

    return (
        <div>
            {id}
        </div>
    )
}

FormDetails.getLayout = function getLayout(page) {
    return (
        <Layout>{page}</Layout>
    )
}