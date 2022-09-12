import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function FormsIndex() {
    return (
        <div className="bg-white h-full">

        </div>
    )
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale))
        }
    }
}