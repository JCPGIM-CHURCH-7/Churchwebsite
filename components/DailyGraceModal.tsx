import React from 'react';
import { X, Share2, Download, MessageCircle } from 'lucide-react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DailyGraceModalProps {
    video: {
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
            <DialogContent className="max-w-4xl bg-black border-gray-800 p-0 overflow-hidden sm:rounded-2xl">
                <div className="relative flex flex-col md:flex-row h-[80vh] md:h-[600px]">

                    {/* Video Player Column */}
                    <div className="flex-1 bg-black relative flex items-center justify-center">
                        <video
                            src={video.src}
                            controls
                            autoPlay
                            className="max-h-full max-w-full w-auto h-auto object-contain"
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
                    <div className="w-full md:w-80 bg-gray-900 border-l border-gray-800 p-6 flex flex-col text-white overflow-y-auto">

                        {/* Header */}
                        <div className="mb-6">
                            <div className="text-sm font-medium text-yellow-500 mb-1 tracking-wider uppercase">{video.theme}</div>
                            <h2 className="text-2xl font-bold leading-tight mb-2">{video.title}</h2>
                            <div className="text-gray-400 text-sm">{video.date}</div>
                        </div>

                        {/* Description / Devo Text (Placeholder for now) */}
                        <div className="flex-1 text-gray-300 text-sm leading-relaxed mb-6">
                            <p>Allow the grace of God to refresh your spirit today. Watch today's message and be encouraged in your walk of faith.</p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-3">
                            <Button className="w-full bg-green-600 hover:bg-green-700 text-white gap-2">
                                <MessageCircle className="h-4 w-4" /> Share on WhatsApp
                            </Button>
                            <Button variant="outline" className="w-full border-gray-700 hover:bg-gray-800 text-white gap-2">
                                <Share2 className="h-4 w-4" /> Copy Link
                            </Button>
                            <Button variant="ghost" className="w-full text-gray-400 hover:text-white gap-2">
                                <Download className="h-4 w-4" /> Download Video
                            </Button>
                        </div>

                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
