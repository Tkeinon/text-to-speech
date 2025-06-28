import type {TextToSpeechProps} from 'src/components/text-to-speech/types';

const TextToSpeech = ({
    lang = 'en-US',
    rate = 1,
    pitch = 1,
    targetRef
}: TextToSpeechProps) => {
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

export default TextToSpeech;