import {useEffect, useState} from 'react';
import {useTextToSpeechContext} from 'src/components/text-to-speech/context';

const VoiceController = ({className = ''}: {className?: string}) => {
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
};

export {VoiceController};
