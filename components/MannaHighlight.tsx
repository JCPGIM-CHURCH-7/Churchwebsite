import React from 'react';
import { Play, Calendar, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MannaHighlightProps {
    video: {
        id: string;
        title: string;
        date: string;
        theme: string;
        thumbnail: string;
        language: 'english' | 'telugu';
    };
    onClick: () => void;
}

export function MannaHighlight({ video, onClick }: MannaHighlightProps) {
    return (
        <div className="relative w-full overflow-hidden rounded-3xl bg-white shadow-xl border border-gray-100 group cursor-pointer" onClick={onClick}>
            <div className="flex flex-col md:flex-row">

                {/* Thumbnail Side */}
                <div className="relative h-64 md:h-auto md:w-2/5 overflow-hidden">
                    <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <div className="h-16 w-16 rounded-full bg-white/90 shadow-lg flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                            <Play className="h-6 w-6 text-gray-900 fill-gray-900 ml-1" />
                        </div>
                    </div>
                </div>

                {/* Content Side */}
                <div className="flex flex-1 flex-col justify-center p-8 md:p-12 bg-gradient-to-br from-white to-blue-50/30">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-800">
                            Today's Manna
                        </span>
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                            {video.language}
                        </span>
                    </div>

                    <h2 className="mb-4 text-3xl font-serif font-bold text-gray-900 md:text-4xl leading-tight group-hover:text-blue-700 transition-colors">
                        {video.title}
                    </h2>

                    <div className="mb-8 flex items-center gap-4 text-sm text-gray-500 font-medium">
                        <span className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4 text-blue-400" />
                            {video.date}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-gray-300" />
                        <span className="text-gray-400">{video.theme}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button className="h-12 rounded-xl bg-gray-900 px-8 text-white shadow-lg shadow-gray-200 hover:bg-blue-600 hover:shadow-blue-200 transition-all">
                            Watch Message
                        </Button>
                        <Button variant="outline" className="h-12 w-12 rounded-xl border-gray-200 p-0 text-gray-500 hover:border-gray-300 hover:text-gray-900 hover:bg-white">
                            <Share2 className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
