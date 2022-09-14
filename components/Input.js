export default function Input({ value, onChange }) {
    return (
        <input className="w-full apprarance-none border-2 caret-black border-black bg-gray-50 focus:outline-none p-2 rounded-none" value={value} onChange={onChange} />
    )
}