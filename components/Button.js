export default function Button({ children, onClick, disabled }) {
    return (
        <button disabled={disabled} className={`transition-all font-black shadow-brick-to-l duration-250 inline-flex items-center justify-center border-2 border-black px-3 py-2 ${disabled ? "bg-slate-200 text-slate-700" : children.length > 1 ? "bg-gradient-to-r from-indigo-100 via-purple-100 to-yellow-100 text-black uppercase" : "bg-transparent text-black"}`}
            onClick={!disabled && onClick}>
            {children}
        </button>
    )
}