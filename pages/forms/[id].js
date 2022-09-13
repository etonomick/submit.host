import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import SubmissionsLayout from "../../components/submissions-layout";

export default function FormDetails() { }

FormDetails.getLayout = function getLayout() { return <SubmissionsLayout /> }

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale))
        }
    }
}