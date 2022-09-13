import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import useSWR from "swr";
import SubmissionsLayout from "../../../components/submissions-layout";
import fetcher from "../../../lib/fetcher";

export default function Submission() {

    const router = useRouter()
    const { id, submission } = router.query

    const { data, error } = useSWR(`/api/forms/${id}/${submission}`, fetcher)

    return (
        <div className="bg-white h-full flex items-center justify-center">
            <pre className="whitespace-pre-wrap">{data && JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}

Submission.getLayout = function getLayout(page) {
    return <SubmissionsLayout>{page}</SubmissionsLayout>
}

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale))
        }
    }
}