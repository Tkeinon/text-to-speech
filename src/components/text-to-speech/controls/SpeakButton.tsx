import {useTextToSpeechContext} from 'src/components/text-to-speech/context';

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

export {SpeakButton}