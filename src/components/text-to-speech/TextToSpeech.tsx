import {createContext, useContext, useEffect, useState} from 'react';

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
    const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [lang, setLang] = useState<string>(_lang);
    const [pitch, setPitch] = useState<number>(_pitch);
    const [rate, setRate] = useState<number>(_rate);
    const [volume, setVolume] = useState<number>(0.5);


    const speechSynthesis = window.speechSynthesis;

    const stopSpeaking = () => {
        if (speechSynthesis) {
            speechSynthesis.cancel();
            setIsSpeaking(false);
            setIsPaused(false);
        }
    };

    const pauseSpeaking = () => {
        if (speechSynthesis && isSpeaking) {
            speechSynthesis.pause();
            setIsPaused(true);
        }
    };

    const resumeSpeaking = () => {
        if (speechSynthesis && isPaused) {
            speechSynthesis.resume();
            setIsPaused(false);
        }
    };

    const setSpeakingState = (speaking: boolean, paused: boolean = false) => {
        setIsSpeaking(speaking);
        setIsPaused(paused);
    };

    return (
        <TextToSpeechContext.Provider value={{
            isPaused,
            isSpeaking,
            lang,
            pauseSpeaking,
            pitch,
            rate,
            resumeSpeaking,
            setLang,
            setPitch,
            setRate,
            setSpeakingState,
            setVolume,
            stopSpeaking,
            targetRef,
            volume
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
    const {lang, rate, pitch, targetRef, setSpeakingState, volume} = useTextToSpeechContext();
    
    const handleSpeak = () => {
        const speechSynthesis = window.speechSynthesis;

        if (!speechSynthesis) {
            console.warn('Browser doesn\'t support text-to-speech');
            return;
        }

        // Cancel any existing speech first
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
        utterance.volume = volume;

        // Setup event listener for controller buttons to work
        utterance.onstart = () => setSpeakingState(true, false);
        utterance.onend = () => setSpeakingState(false, false);
        utterance.onpause = () => setSpeakingState(true, true);
        utterance.onresume = () => setSpeakingState(true, false);
        utterance.onerror = () => setSpeakingState(false, false);
       
        setSpeakingState(true, false);
        
        try {
            speechSynthesis.speak(utterance);
        } catch (error) {
            console.error('Failed to start speech synthesis:', error);
            setSpeakingState(false, false);
        }
    };

    return <button className={className} onClick={handleSpeak} type='button'>
        {buttonText}
    </button>;
};

const StopButton = ({
    className = '',
    buttonText = 'Stop'
}: {
    className?: string,
    buttonText?: string
}) => {
    const {stopSpeaking, isSpeaking} = useTextToSpeechContext();

    return (
        <button 
            className={className} 
            onClick={stopSpeaking} 
            type='button'
            disabled={!isSpeaking}
        >
            {buttonText}
        </button>
    );
};

const PauseButton = ({
    className = '',
    buttonText = 'Pause'
}: {
    className?: string,
    buttonText?: string
}) => {
    const {pauseSpeaking, isSpeaking, isPaused} = useTextToSpeechContext();

    return (
        <button 
            className={className} 
            onClick={pauseSpeaking} 
            type='button'
            disabled={!isSpeaking || isPaused}
        >
            {buttonText}
        </button>
    );
};

const ResumeButton = ({
    className = '',
    buttonText = 'Resume'
}: {
    className?: string,
    buttonText?: string
}) => {
    const {resumeSpeaking, isPaused} = useTextToSpeechContext();

    return (
        <button 
            className={className} 
            onClick={resumeSpeaking} 
            type='button'
            disabled={!isPaused}
        >
            {buttonText}
        </button>
    );
};

// Control group component for convenience
const SpeechControls = ({
    className = '',
    showStop = true,
    showPause = true,
    showResume = true
}: {
    className?: string,
    showStop?: boolean,
    showPause?: boolean,
    showResume?: boolean
}) => {
    return (
        <div className={className}>
            {showStop && <StopButton />}
            {showPause && <PauseButton />}
            {showResume && <ResumeButton />}
        </div>
    );
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

const VoiceSelector = ({className = ''}: {className?: string}) => {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const {lang, setLang} = useTextToSpeechContext();

    useEffect(() => {
        const loadVoices = () => {
            setVoices(speechSynthesis.getVoices());
        };
        
        speechSynthesis.onvoiceschanged = loadVoices;
        loadVoices();
    }, [setVoices]);

    return <select className={className} onChange={(event) => setLang(event.target.value)} value={lang}>
        {voices.map((voice) => <option key={voice.name} value={voice.lang}>
            {voice.name} ({voice.lang})
        </option>)}
    </select>
}

const VolumeController = ({
    className = '',
    labelText = 'Volume'
}: {
    className?: string,
    labelText?: string
}) => {
    const {volume, setVolume} = useTextToSpeechContext();

    return <div className={className}>
        <label htmlFor='volume-controller'>
            {labelText}: {Math.round(volume * 100)}%
            <input 
                max='1'
                min='0'
                onChange={(event) => setVolume(parseFloat(event.target.value))}
                step='0.1'
                type='range'
                value={volume}
            />
        </label>
    </div>
}

TextToSpeech.Speak = SpeakButton;
TextToSpeech.Stop = StopButton;
TextToSpeech.Pause = PauseButton;
TextToSpeech.Resume = ResumeButton;
TextToSpeech.Controls = SpeechControls;
TextToSpeech.RateController = RateController;
TextToSpeech.PitchController = PitchController;
TextToSpeech.VoiceSelector = VoiceSelector;
TextToSpeech.VolumeController = VolumeController;

export default TextToSpeech;