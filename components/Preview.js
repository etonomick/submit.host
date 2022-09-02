export default function Preview({ submission_id }) {
    return (
        <div>
            {submission_id ? submission_id : "Select something"}
        </div>
    )
}