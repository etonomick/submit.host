import { useRouter } from "next/router";
import SubmissionsLayout from "../../../components/submissions-layout";

export default function Submission() {

    const router = useRouter()
    const { id, submission } = router.query

    return (
        <div className="bg-white h-full flex items-center justify-center">
            {id},{submission}
        </div>
    )
}

Submission.getLayout = function getLayout(page) {
    return <SubmissionsLayout>{page}</SubmissionsLayout>
}