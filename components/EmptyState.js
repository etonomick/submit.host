export default function EmptyState({ title = "There is nothing here yet" }) {
    return (
        <div className="flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8">
                <svg viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <rect height="13" width="13" fill="none" rx="1" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" x="0.5" y="0.5" />
                        <path d="M.5,8H4A1,1,0,0,1,5,9,2,2,0,0,0,9,9a1,1,0,0,1,1-1h3.5" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                </svg>
            </div>
            <div>{title}</div>
        </div>
    )
}