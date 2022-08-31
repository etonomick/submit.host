export default function Button({ children, onClick }) {
    return (
        <div className="flex items-center justify-center border border-neutral-200 rounded px-3 py-2 cursor-pointer bg-gradient-to-t from-neutral-100 to-neutral-50"
        onClick={onClick}>
            {children}
        </div>
    )
}