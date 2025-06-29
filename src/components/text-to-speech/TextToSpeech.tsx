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

const SpeakButton = ({
    className = '',
    buttonText = 'Speak'
}: {
    className?: string,
    buttonText?: string
}) => {
    const {lang, rate, pitch, targetRef} = useTextToSpeechContext();
    
    const handleSpeak = () => {
        const speechSynthesis = window.speechSynthesis;

        if (!speechSynthesis) {
            console.warn('Browser doesn\'t support text-to-speech');
            return;
        }

        speechSynthesis.cancel();
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

        speechSynthesis.speak(utterance);
    };

    return <button className={className} onClick={handleSpeak} type='button'>
        {buttonText}
    </button>;
};

const RateController = ({
    className = '',
    labelText = 'Rate',
}: {
    className?: string,
    labelText?: string
}) => {
    const {rate, setRate} = useTextToSpeechContext();

    const onChange = (value: string) => {
        const val = parseFloat(value);

        if (!isNaN(val)) {
            setRate(val);
        }
    }

    return <div className={className}>
        <label htmlFor='rate-controller'>
            {labelText}: {rate.toFixed(1)}x
            <input 
                type='range'
                min='0.5' 
                max='2.0' 
                step='0.1' 
                value={rate} 
                onChange={(event) => onChange(event.target.value)} 
                id='rate-controller'
            />
        </label>
    </div>;
};

const PitchController = ({
    className = '',
    labelText = 'Pitch',
}: {
    className?: string,
    labelText?: string,
}) => {
    const {pitch, setPitch} = useTextToSpeechContext();

    const onChange = (value: string) => {
        const val = parseFloat(value);

        if (!isNaN(val)) {
            setPitch(val);
        }
    }

    return <div className={className}>
        <label htmlFor='pitch-controller'>
            {labelText}: {pitch}x
            <input 
                type='range'
                min='0.5' 
                max='2.0' 
                step='0.1' 
                value={pitch} 
                onChange={(event) => onChange(event.target.value)} 
                id='pitch-controller'
            />
    </label>
    </div>;
};

TextToSpeech.Speak = SpeakButton;
TextToSpeech.RateController = RateController;
TextToSpeech.PitchController = PitchController;

export default TextToSpeech;