import {createContext, useContext, useState} from 'react';

import type {TextToSpeechProps, TextToSpeechContextType} from 'src/components/text-to-speech/types';

const TextToSpeechContext = createContext<TextToSpeechContextType | null>(null);

const useTextToSpeechContext = () => {
    const context = useContext(TextToSpeechContext);
    
    if (!context) {
        throw new Error('useTextToSpeechContext must be used within a TextToSpeech component');
    }
    return context;
};

const TextToSpeech = ({
    children,
    lang: _lang = 'en-US',
    rate: _rate = 1,
    pitch: _pitch = 1,
    targetRef
}: TextToSpeechProps) => {
    const [lang, setLang] = useState<string>(_lang);
    const [pitch, setPitch] = useState<number>(_pitch);
    const [rate, setRate] = useState<number>(_rate);

    return (
        <TextToSpeechContext.Provider value={{
            lang,
            pitch,
            rate,
            setLang,
            setPitch,
            setRate,
            targetRef
        }}>
            {children}
        </TextToSpeechContext.Provider>
    );
};

const SpeakButton = () => {
    const {lang, rate, pitch, targetRef} = useTextToSpeechContext();
    
    const handleSpeak = () => {
        const speechSynthesis = window.speechSynthesis;

        if (!speechSynthesis) {
            console.warn('Browser doesn\'t support text-to-speech');
            return;
        }

        const element = targetRef.current;

        if (!element) {
            console.warn('No target element found for speech.');
            return;
        }

        const text = 'value' in element ? (element as HTMLInputElement).value : element.textContent;

        if (!text || text.trim().length === 0) {
            console.warn('No text to read');
            return;
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = rate;
        utterance.pitch = pitch;

        speechSynthesis.cancel();
        speechSynthesis.speak(utterance);
    }

    return <button onClick={handleSpeak}>
        Speak
    </button>
}

TextToSpeech.Speak = SpeakButton;

export default TextToSpeech;