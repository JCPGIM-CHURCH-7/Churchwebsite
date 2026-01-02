import React from 'react';
import { X, Share2, Download, MessageCircle } from 'lucide-react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DailyGraceModalProps {
    video: {
        id: string;
        title: string;
        src: string;
        date: string;
        theme: string;
    } | null;
    isOpen: boolean;
    onClose: () => void;
}

export function DailyGraceModal({ video, isOpen, onClose }: DailyGraceModalProps) {
    if (!video) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-5xl bg-white border-none p-0 overflow-hidden sm:rounded-2xl shadow-2xl">
                <div className="relative flex flex-col md:flex-row h-[85vh] md:h-[650px]">

                    {/* Video Player Column (YouTube Embed) */}
                    <div className="flex-[2] bg-black relative flex items-center justify-center">
                        <iframe
                            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
                            title={video.title}
                            className="w-full h-full absolute inset-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />

                        {/* Mobile Close Button (Overlay) */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 md:hidden rounded-full bg-black/50 p-2 text-white backdrop-blur-sm"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Sidebar Info Column */}
                    <div className="w-full md:w-96 bg-gray-50 border-l border-gray-200 p-8 flex flex-col text-gray-800 overflow-y-auto">

                        {/* Header */}
                        <div className="mb-6">
                            <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-wider uppercase mb-3">
                                {video.theme}
                            </div>
                            <h2 className="text-2xl font-serif font-bold leading-tight mb-2 text-gray-900">{video.title}</h2>
                            <div className="text-gray-500 text-sm font-medium flex items-center gap-2">
                                <span className="block h-1 w-1 rounded-full bg-gray-400"></span>
                                {video.date}
                            </div>
                        </div>

                        {/* Description / Devo Text */}
                        <div className="flex-1 text-gray-600 text-base leading-relaxed mb-8">
                            <p className="mb-4">"May the grace of the Lord Jesus Christ, and the love of God, and the fellowship of the Holy Spirit be with you all."</p>
                            <p className="text-sm italic text-gray-500">Allow this message to strengthen your heart and renew your mind today.</p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-3 mt-auto">
                            <Button className="w-full bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transition-all gap-2 text-base h-12 rounded-xl">
                                <MessageCircle className="h-5 w-5" /> Share on WhatsApp
                            </Button>
                            <div className="flex gap-3">
                                <Button variant="outline" className="flex-1 border-gray-300 hover:bg-white text-gray-700 gap-2 h-10 rounded-lg">
                                    <Share2 className="h-4 w-4" /> Copy
                                </Button>
                                <Button variant="ghost" className="flex-1 text-gray-500 hover:text-gray-900 gap-2 h-10 rounded-lg">
                                    <Download className="h-4 w-4" /> Save
                                </Button>
                            </div>
                        </div>

                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
