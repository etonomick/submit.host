export default function Input({ value, onChange }) {
    return (
        <input className="w-full text-xl border apprarance-none focus:outline-none p-2" value={value} onChange={onChange} />
    )
}