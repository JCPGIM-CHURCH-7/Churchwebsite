import React from 'react';
import { Play, Calendar, Heart } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming utils exists

interface DailyVideoCardProps {
    video: {
        id: string;
        title: string;
        date: string;
        theme: string;
        thumbnail?: string;
        type?: string;
    };
    onClick: () => void;
}

export function DailyVideoCard({ video, onClick }: DailyVideoCardProps) {
    // Parse date for display (YYYY-MM-DD -> DD MMM)
    const dateObj = new Date(video.date);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('default', { month: 'short' });
    const year = dateObj.getFullYear();

    return (
        <div
            className="group relative h-[400px] w-full cursor-pointer overflow-hidden rounded-xl bg-white shadow-md transition-all hover:scale-[1.02] hover:shadow-xl border border-gray-100"
            onClick={onClick}
        >
            {/* Thumbnail / Placeholder Gradient */}
            <div className="absolute inset-0 bg-gray-100">
                {/* Real Thumbnail */}
                {video.thumbnail && !video.thumbnail.includes("placeholder") ? (
                    <img src={video.thumbnail} alt={video.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                ) : (
                    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-amber-50">
                        <span className="text-gray-300 font-serif italic text-4xl opacity-20">Grace</span>
                    </div>
                )}
            </div>

            {/* Overlays - Light Theme Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/90" />

            {/* Theme Badge */}
            <div className="absolute top-3 right-3 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-gray-700 backdrop-blur-md shadow-sm border border-white">
                {video.theme}
            </div>

            {/* Center Play Button (YouTube Style) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transform transition-transform group-hover:scale-110">
                    <Play className="h-6 w-6 ml-1 fill-white" />
                </div>
            </div>

            {/* Bottom Metadata */}
            <div className="absolute bottom-0 w-full p-4 text-gray-800">
                <div className="mb-2 flex items-center gap-3">
                    <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-amber-100 text-amber-800 font-bold shadow-sm border border-amber-200">
                        <span className="text-xs uppercase">{month}</span>
                        <span className="text-lg leading-none">{day}</span>
                    </div>
                    <div className="flex-1">
                        <h3 className="line-clamp-2 text-base font-bold leading-tight text-gray-900 group-hover:text-blue-600 transition-colors">
                            {video.title}
                        </h3>
                        <p className="text-xs text-gray-500 font-medium mt-1">{year} • Daily Manna</p>
                    </div>
                </div>

                {/* Footer Stats / Actions */}
                <div className="flex items-center justify-between border-t border-gray-100 pt-2 text-xs text-gray-500 font-medium">
                    <span className="flex items-center gap-1 text-red-500">
                        <Play className="h-3 w-3 fill-current" /> Watch Video
                    </span>
                    <span className="flex items-center gap-1">
                        <Heart className="h-3 w-3" /> Like
                    </span>
                </div>
            </div>
        </div>
    );
}
