import {useState} from 'react';

const useSpeechSynthesis = () => {
    const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);

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

    return {
        isPaused,
        isSpeaking,
        pauseSpeaking,
        resumeSpeaking,
        setSpeakingState,
        stopSpeaking
    }
};

export {useSpeechSynthesis};