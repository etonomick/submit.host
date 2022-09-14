export default function Button({ children, onClick, disabled }) {
    return (
        <button disabled={disabled} className={`font-mono transition-all font-black duration-250 inline-flex items-center justify-center px-3 py-2 ${disabled ? "bg-slate-200 text-slate-700" : children.length > 1 ? "border-2 border-black shadow-brick-to-l bg-gradient-to-r from-indigo-100 via-purple-100 to-yellow-100 text-black uppercase" : "bg-transparent text-black"}`}
            onClick={!disabled && onClick}>
            {children}
        </button>
    )
}