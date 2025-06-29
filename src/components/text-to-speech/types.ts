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
    volume: number;
    setLang: (lang: string) => void;
    setPitch: (pitch: number) => void;
    setRate: (rate: number) => void;
    setVolume: (volume: number) => void;
    targetRef: React.RefObject<HTMLElement | null>;
    stopSpeaking: () => void;
    pauseSpeaking: () => void;
    resumeSpeaking: () => void;
    isSpeaking: boolean;
    isPaused: boolean;
    setSpeakingState: (speaking: boolean, paused?: boolean) => void;
}

export type {TextToSpeechProps, TextToSpeechContextType};