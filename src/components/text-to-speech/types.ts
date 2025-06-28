import React from 'react';

type TextToSpeechProps = {
    children?: React.ReactNode;
    lang?: string;
    rate?: number;
    pitch?: number;
    targetRef: React.RefObject<HTMLElement | null>;
}

type TextToSpeechContextType = {
    lang: string;
    pitch: number;
    rate: number;
    setLang: (lang: string) => void;
    setPitch: (pitch: number) => void;
    setRate: (rate: number) => void;
    targetRef: React.RefObject<HTMLElement | null>;
}

export type {TextToSpeechProps, TextToSpeechContextType};