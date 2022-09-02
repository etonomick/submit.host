import { useSession } from "next-auth/react";

export default function Index() {

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-1 flex items-center justify-center w-full">
                <h1 className="text-5xl font-bold"><div className="inline-flex bg-line bg-no-repeat p-12 bg-cover">Submit</div> forms <span className="inline-flex py-5" style={{
                    background: 'url("/img/highlight.svg")',
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat"
                }}>without</span> JavaScript</h1>
            </div>
            <div>
                features
            </div>
        </div>
    )
}