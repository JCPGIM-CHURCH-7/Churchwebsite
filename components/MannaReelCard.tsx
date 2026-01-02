import React from 'react';
import { Play } from 'lucide-react';
import { cn } from "@/lib/utils";

interface MannaReelCardProps {
    video: {
        title: string;
        thumbnail: string;
        type: 'image' | 'video';
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
            className="relative h-[480px] w-[270px] flex-shrink-0 cursor-pointer overflow-hidden rounded-xl bg-gray-100 shadow-md transition-all hover:scale-[1.02] hover:shadow-xl group"
        >
            {/* Image Thumbnail */}
            <img
                src={video.thumbnail}
                alt={video.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/80" />

            {/* Play Button Overlay (Only if video or generic hover) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="h-14 w-14 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center shadow-lg">
                    <Play className="h-6 w-6 text-white fill-white ml-1" />
                </div>
            </div>

            {/* Content Labels */}
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

            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="line-clamp-2 text-lg font-bold leading-tight mb-1 drop-shadow-md">
                    {theme}
                </h3>
            </div>
        </div>
    );
}
