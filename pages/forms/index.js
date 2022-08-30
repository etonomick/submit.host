import Layout from "../../components/layout";

export default function FormsIndex() {
    return (
        <div>forms index</div>
    )
}

FormsIndex.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}