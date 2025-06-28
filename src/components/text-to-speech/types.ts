import React from 'react';

type TextToSpeechProps = {
    lang?: string,
    rate?: number;
    pitch?: number;
    targetRef: React.RefObject<HTMLElement | null>
}

export type {TextToSpeechProps};