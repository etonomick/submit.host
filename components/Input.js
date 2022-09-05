export default function Input({ value, onChange }) {
    return (
        <input className="w-full border apprarance-none focus:outline-none p-2 rounded" value={value} onChange={onChange} />
    )
}