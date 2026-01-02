import React from 'react';
import { cn } from "@/lib/utils";

type Language = 'english' | 'telugu' | 'both';

interface LanguageToggleProps {
    value: Language;
    onChange: (value: Language) => void;
}

export function LanguageToggle({ value, onChange }: LanguageToggleProps) {
    return (
        <div className="inline-flex items-center rounded-full bg-gray-100 p-1 shadow-inner">
            <button
                onClick={() => onChange('english')}
                className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                    value === 'english'
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-500 hover:text-gray-900"
                )}
            >
                English
            </button>
            <button
                onClick={() => onChange('both')}
                className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                    value === 'both'
                        ? "bg-white text-purple-600 shadow-sm"
                        : "text-gray-500 hover:text-gray-900"
                )}
            >
                Both
            </button>
            <button
                onClick={() => onChange('telugu')}
                className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                    value === 'telugu'
                        ? "bg-white text-amber-600 shadow-sm"
                        : "text-gray-500 hover:text-gray-900"
                )}
            >
                Telugu
            </button>
        </div>
    );
}
