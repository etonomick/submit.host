export default function Button({ children, onClick, disabled }) {
    return (
        <button disabled={disabled} className={`inline-flex items-center justify-center px-3 py-2 ${disabled ? "bg-neutral-500 text-black" : children.length > 1 ? "bg-black text-white" : "bg-transparent text-black"}`}
            onClick={!disabled && onClick}>
            {children}
        </button>
    )
}