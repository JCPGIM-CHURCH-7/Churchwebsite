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
            className="group relative h-[400px] w-full cursor-pointer overflow-hidden rounded-xl bg-gray-900 shadow-xl transition-all hover:scale-[1.02] hover:shadow-2xl"
            onClick={onClick}
        >
            {/* Thumbnail / Placeholder Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900">
                {/* If we had real thumbnails, Next.js Image would go here */}
                {/* <Image src={video.thumbnail} fill className="object-cover opacity-80 transition-opacity group-hover:opacity-100" /> */}

                {/* Fallback abstract pattern */}
                <div className="h-full w-full opacity-30 mix-blend-overlay"
                    style={{ backgroundImage: 'url("/grid-pattern.svg")', backgroundSize: 'cover' }}></div>
            </div>

            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90" />

            {/* Theme Badge */}
            <div className="absolute top-3 right-3 rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                {video.theme}
            </div>

            {/* Center Play Button (Hidden by default, shows on hover or always visible but subtle) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                    <Play className="h-8 w-8 fill-white text-white" />
                </div>
            </div>

            {/* Bottom Metadata */}
            <div className="absolute bottom-0 w-full p-4 text-white">
                <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-10 w-10 flex-col items-center justify-center rounded-lg bg-white/10 backdrop-blur-md font-bold leading-none">
                        <span className="text-sm">{month}</span>
                        <span className="text-lg">{day}</span>
                    </div>
                    <div>
                        <h3 className="line-clamp-2 text-lg font-bold leading-tight text-white group-hover:text-yellow-400 transition-colors">
                            {video.title}
                        </h3>
                        <p className="text-xs text-gray-300">{year}</p>
                    </div>
                </div>

                {/* Footer Stats / Actions */}
                <div className="flex items-center justify-between border-t border-white/10 pt-2 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                        <Play className="h-3 w-3" /> Watch
                    </span>
                    <span className="flex items-center gap-1">
                        Daily Manna
                    </span>
                </div>
            </div>
        </div>
    );
}
