import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/layout";

function SubmitHost({ Component, pageProps: {
    session, ...pageProps
} }) {

    const getLayout = Component.getLayout || ((page) => page)

    return (
        <SessionProvider session={session}>
            <Layout>
            {getLayout(<Component {...pageProps} />)}
            </Layout>
        </SessionProvider>
    )
}

export default SubmitHost