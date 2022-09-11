export default function Button({ children, onClick, disabled }) {
    return (
        <button disabled={disabled} className={`transition-all duration-250 inline-flex items-center justify-center rounded px-3 py-2 ${disabled ? "bg-slate-200 text-slate-700" : children.length > 1 ? "bg-blue-500 text-white" : "bg-transparent text-black"}`}
            onClick={!disabled && onClick}>
            {children}
        </button>
    )
}