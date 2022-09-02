import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/layout";
import { useRouter } from "next/router";

function SubmitHost({ Component, pageProps: {
    session, ...pageProps
} }) {

    const router = useRouter()
    const getLayout = Component.getLayout || ((page) => page)

    return (
        <SessionProvider session={session}>
            { router.pathname.includes("/forms") ? <Layout> { getLayout(<Component {...pageProps} />) } </Layout> : <Component {...pageProps} /> }
        </SessionProvider>
    )
}

export default SubmitHost