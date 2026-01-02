import React from 'react';
import { X, Share2, Download, MessageCircle, ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DailyGraceModalProps {
    video: {
        id: string;
        title: string;
        src: string;
        date: string;
        theme: string;
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
            <DialogContent className="max-w-6xl bg-white border-gray-100 p-0 overflow-hidden sm:rounded-2xl shadow-2xl">
                <div className="relative flex flex-col md:flex-row h-[90vh] md:h-[700px]">

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
                            <iframe
                                src={video.src.includes('?') ? `${video.src}&autoplay=1` : `${video.src}?autoplay=1`}
                                title={video.title}
                                className="w-full h-full absolute inset-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-900">
                                <img
                                    src={video.src}
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

                        {/* Mobile Close Button (Overlay) */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 md:hidden rounded-full bg-black/50 p-2 text-white backdrop-blur-sm z-30"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Sidebar Info Column */}
                    <div className="w-full md:w-[400px] bg-white border-l border-gray-100 p-6 md:p-8 flex flex-col text-gray-800 overflow-y-auto relative">

                        {/* Close (Desktop) */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 hidden md:block text-gray-400 hover:text-gray-900 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

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
                            {/* Mobile Nav (Visible only on small screens) */}
                            <div className="flex md:hidden gap-2 mb-2">
                                {onPrev && (
                                    <Button variant="outline" className="flex-1" onClick={onPrev}><ChevronLeft className="w-4 h-4 mr-1" /> Prev Day</Button>
                                )}
                                {onNext && (
                                    <Button variant="outline" className="flex-1" onClick={onNext}>Next Day <ChevronRight className="w-4 h-4 ml-1" /></Button>
                                )}
                            </div>

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
                </div>
            </DialogContent>
        </Dialog>
    );
}
