export default function Button({ children, onClick, disabled }) {
    return (
        <button disabled={disabled} className={`transition-all duration-250 inline-flex items-center justify-center px-3 py-2 ${disabled ? "bg-neutral-300 text-black" : children.length > 1 ? "bg-black text-white" : "bg-transparent text-black"}`}
            onClick={!disabled && onClick}>
            {children}
        </button>
    )
}