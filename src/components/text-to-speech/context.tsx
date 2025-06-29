import {createContext, useContext} from 'react';

import type {TextToSpeechContextType} from 'src/components/text-to-speech/types';

export const TextToSpeechContext = createContext<TextToSpeechContextType | null>(null);

export const useTextToSpeechContext = () => {
    const context = useContext(TextToSpeechContext);
    
    if (!context) {
        throw new Error('useTextToSpeechContext must be used within a TextToSpeech component');
    }

    return context;
}; 
