export default function Button({ children, onClick, disabled }) {
    return (
        <button disabled={disabled} className={`inline-flex items-center justify-center px-3 py-2 ${disabled ? "bg-neutral-500 text-black" : "bg-black text-white"}`}
            onClick={!disabled && onClick}>
            {children}
        </button>
    )
}