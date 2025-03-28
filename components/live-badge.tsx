export function LiveBadge() {
    return (
        <div className="bg-red-600 text-white text-xs font-medium px-2 py-0.5 rounded-sm flex items-center">
            <span className="relative flex h-2 w-2 mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            AO VIVO
        </div>
    )
}