import React from 'react';
import { X, Share2, Download, MessageCircle, ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const getYouTubeEmbedUrl = (url: string) => {
    try {
        const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
        let videoId = '';
        if (urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be')) {
            if (urlObj.pathname.startsWith('/live/')) {
                videoId = urlObj.pathname.split('/')[2];
            } else if (urlObj.pathname.startsWith('/embed/')) {
                videoId = urlObj.pathname.split('/')[2];
            } else if (urlObj.pathname === '/watch') {
                videoId = urlObj.searchParams.get('v') || '';
            } else if (urlObj.hostname === 'youtu.be') {
                videoId = urlObj.pathname.slice(1);
            }
            if (videoId) {
                return `https://www.youtube.com/embed/${videoId}`;
            }
        }
    } catch (e) {
        // Ignore
    }
    return url;
};

interface DailyGraceModalProps {
    video: {
        id: string;
        title: string;
        src: string;
        date: string;
        theme: string;
        thumbnail: string;
        language: 'english' | 'telugu';
        type: 'image' | 'video';
    } | null;
    isOpen: boolean;
    onClose: () => void;
    onNext?: () => void;
    onPrev?: () => void;
    onLanguageToggle?: () => void;
}

export function DailyGraceModal({ video, isOpen, onClose, onNext, onPrev, onLanguageToggle }: DailyGraceModalProps) {
    if (!video) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-6xl bg-white border-0 p-0 overflow-hidden sm:rounded-2xl shadow-2xl h-[100dvh] sm:h-[700px]">
                <div className="relative flex flex-col md:flex-row h-full">

                    {/* Video Player / Image Column */}
                    <div className="flex-[2] bg-black relative flex items-center justify-center group overflow-hidden">

                        {/* Navigation Overlay (Previous) */}
                        {onPrev && (
                            <button
                                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                                className="absolute left-4 z-20 p-3 rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60 hidden md:block"
                            >
                                <ChevronLeft className="w-8 h-8" />
                            </button>
                        )}

                        {video.type === 'video' ? (
                            video.src.includes('youtube') || video.src.includes('youtu.be') ? (
                                <iframe
                                    src={`${getYouTubeEmbedUrl(video.src)}?autoplay=1&mute=1&playsinline=1`}
                                    title={video.title}
                                    className="w-full h-full absolute inset-0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            ) : (
                                <video
                                    src={encodeURI(video.src)}
                                    controls
                                    autoPlay
                                    muted
                                    playsInline
                                    className="w-full h-full absolute inset-0 bg-black object-contain sm:object-cover"
                                    poster={encodeURI(video.thumbnail)}
                                >
                                    Your browser does not support the video tag.
                                </video>
                            )
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-900">
                                <img
                                    src={encodeURI(video.src)}
                                    alt={video.title}
                                    className="max-h-full max-w-full object-contain"
                                />
                            </div>
                        )}

                        {/* Navigation Overlay (Next) */}
                        {onNext && (
                            <button
                                onClick={(e) => { e.stopPropagation(); onNext(); }}
                                className="absolute right-4 z-20 p-3 rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60 hidden md:block"
                            >
                                <ChevronRight className="w-8 h-8" />
                            </button>
                        )}

                    </div>

                    {/* Sidebar Info Column - Hidden on Mobile */}
                    <div className="hidden md:flex w-[400px] bg-white border-l border-gray-100 p-8 flex-col text-gray-800 overflow-y-auto relative">
                        {/* Header */}
                        <div className="mt-2 mb-6">
                            <div className="flex items-center justify-between mb-3">
                                <div className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold tracking-wider uppercase">
                                    {video.theme}
                                </div>
                                <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">{video.language}</span>
                            </div>

                            <h2 className="text-2xl font-serif font-bold leading-tight mb-2 text-gray-900">{video.title}</h2>
                            <div className="text-gray-500 text-sm font-medium flex items-center gap-2">
                                {video.date}
                            </div>
                        </div>

                        {/* Devo Text Placeholder */}
                        <div className="flex-1 text-gray-600 text-base leading-relaxed mb-8 border-t border-b border-gray-50 py-4">
                            <p className="mb-4 font-serif italic text-lg text-gray-700">"Grace to you and peace from God our Father and the Lord Jesus Christ."</p>
                            <p className="text-sm text-gray-500">
                                This message is curated for <strong>{video.date}</strong>. Let the word of God dwell in you richly. Only believe properly and you will live properly.
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-3 mt-auto">
                            {onLanguageToggle && (
                                <Button
                                    variant="secondary"
                                    onClick={onLanguageToggle}
                                    className="w-full bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-100 h-12 rounded-xl font-semibold"
                                >
                                    <RefreshCw className="mr-2 h-4 w-4" /> Switch to {video.language === 'english' ? 'Telugu' : 'English'}
                                </Button>
                            )}

                            <Button className="w-full bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transition-all gap-2 text-base h-12 rounded-xl">
                                <MessageCircle className="h-5 w-5" /> Share Message
                            </Button>
                        </div>
                    </div>

                    {/* Mobile Overlay Content */}
                    <div className="md:hidden absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white z-20 pointer-events-none">
                        <div className="inline-block px-2 py-0.5 rounded bg-amber-500 text-white text-[10px] font-bold uppercase mb-2">
                            {video.theme}
                        </div>
                        <h2 className="text-xl font-bold mb-1">{video.title}</h2>
                        <p className="text-xs opacity-80 mb-4">{video.date} • {video.language}</p>

                        <div className="flex gap-2 pointer-events-auto">
                            {onLanguageToggle && (
                                <Button
                                    size="sm"
                                    variant="secondary"
                                    onClick={onLanguageToggle}
                                    className="bg-white/20 backdrop-blur-md text-white border-0 hover:bg-white/30"
                                >
                                    <RefreshCw className="w-4 h-4 mr-1" /> {video.language === 'english' ? 'TEL' : 'ENG'}
                                </Button>
                            )}
                            <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 text-white border-0 flex-1"
                            >
                                <Share2 className="w-4 h-4 mr-1" /> Share
                            </Button>
                        </div>
                    </div>

                    {/* Mobile Navigation Buttons */}
                    <div className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
                        {onPrev && (
                            <button onClick={onPrev} className="p-3 rounded-full bg-black/40 text-white backdrop-blur-sm border border-white/20">
                                <ChevronLeft className="w-6 h-6 rotate-90" />
                            </button>
                        )}
                        {onNext && (
                            <button onClick={onNext} className="p-3 rounded-full bg-black/40 text-white backdrop-blur-sm border border-white/20">
                                <ChevronRight className="w-6 h-6 rotate-90" />
                            </button>
                        )}
                    </div>

                    {/* Close Button Mobile */}
                    <button
                        onClick={onClose}
                        className="md:hidden absolute top-4 right-4 z-30 p-2 rounded-full bg-black/40 text-white backdrop-blur-sm"
                    >
                        <X className="w-6 h-6" />
                    </button>

                </div>
            </DialogContent>
        </Dialog>
    );
}
