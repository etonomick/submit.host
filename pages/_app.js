import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";

function SubmitHost({ Component, pageProps: {
    session, ...pageProps
} }) {

    const getLayout = Component.getLayout || ((page) => page)

    return (
        <SessionProvider session={session}>
            {getLayout(<Component {...pageProps} />)}
        </SessionProvider>
    )
}

export default SubmitHost