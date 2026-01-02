import React from 'react';
import { Play } from 'lucide-react';
import { cn } from "@/lib/utils";

interface MannaReelCardProps {
    video: {
        dayId: string;
        title: string;
        thumbnail: string;
    };
    dayNumber: number;
    theme: string;
    language: 'english' | 'telugu';
    onClick: () => void;
}

export function MannaReelCard({ video, dayNumber, theme, language, onClick }: MannaReelCardProps) {
    return (
        <div
            onClick={onClick}
            className={cn(
                "group relative flex-shrink-0 cursor-pointer overflow-hidden rounded-xl bg-gray-200 shadow-lg transition-transform hover:scale-105",
                "w-[160px] h-[280px] md:w-[200px] md:h-[350px]" // Dimensions for vertical reel
            )}
        >
            {/* Thumbnail */}
            <div className="absolute inset-0">
                {video.thumbnail && !video.thumbnail.includes("placeholder") ? (
                    <img src={video.thumbnail} alt={video.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                ) : (
                    <div className={cn(
                        "h-full w-full flex items-center justify-center bg-gradient-to-br",
                        language === 'english' ? "from-blue-100 to-indigo-100" : "from-amber-100 to-orange-100"
                    )}>
                        <span className="text-4xl opacity-20 font-serif italic">
                            {language === 'english' ? "Grace" : "కృప"}
                        </span>
                    </div>
                )}
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/80" />

            {/* Play Icon (Hover) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/30 backdrop-blur-md text-white shadow-xl">
                    <Play className="fill-white ml-1 w-6 h-6" />
                </div>
            </div>

            {/* Top Badges */}
            <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
                <div className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-white shadow-sm backdrop-blur-md",
                    language === 'english' ? "bg-blue-600/80" : "bg-amber-600/80"
                )}>
                    {language === 'english' ? "ENG" : "TEL"}
                </div>
                <div className="px-2 py-0.5 rounded-full bg-black/40 text-[10px] font-medium text-white backdrop-blur-md">
                    Day {dayNumber}
                </div>
            </div>

            {/* Bottom Info */}
            <div className="absolute bottom-0 w-full p-3 text-white">
                <p className="text-[10px] font-medium opacity-80 mb-1 tracking-wide uppercase">{theme}</p>
                <h3 className="line-clamp-2 text-sm font-bold leading-tight shadow-black drop-shadow-md">
                    {video.title}
                </h3>
            </div>
        </div>
    );
}
