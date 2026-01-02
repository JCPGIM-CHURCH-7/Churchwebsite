import React from 'react';
import { ExternalLink, Youtube } from 'lucide-react';

interface SourceChannelLinkProps {
    channel: {
        name: string;
        description: string;
        url: string;
        lang: 'English' | 'Telugu';
        color: string;
    }
}

export function SourceChannelLink({ channel }: SourceChannelLinkProps) {
    return (
        <a
            href={channel.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex-shrink-0 relative w-64 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col items-center text-center gap-3 overflow-hidden"
        >
            {/* Background Decor */}
            <div className={`absolute top-0 left-0 w-full h-1 bg-${channel.color}-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left`} />

            <div className={`w-16 h-16 rounded-full bg-${channel.color}-50 flex items-center justify-center text-${channel.color}-600 mb-2 group-hover:scale-110 transition-transform`}>
                <Youtube className="w-8 h-8" />
            </div>

            <div>
                <span className={`text-[10px] font-bold tracking-widest uppercase text-${channel.color}-600 bg-${channel.color}-50 px-2 py-1 rounded-full mb-2 inline-block`}>
                    {channel.lang}
                </span>
                <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                    {channel.name}
                </h3>
            </div>

            <p className="text-xs text-gray-500 line-clamp-2">
                {channel.description}
            </p>

            <div className="mt-auto pt-4 w-full">
                <div className="text-xs font-semibold text-gray-400 flex items-center justify-center gap-1 group-hover:text-blue-600 transition-colors">
                    Visit Channel <ExternalLink className="w-3 h-3" />
                </div>
            </div>
        </a>
    );
}
