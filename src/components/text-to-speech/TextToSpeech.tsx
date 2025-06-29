import {useState} from 'react';

import {useSpeechSynthesis} from 'src/components/hooks/useSpeechSynthesis';
import {TextToSpeechContext} from 'src/components/text-to-speech/context';
import type {TextToSpeechProps} from 'src/components/text-to-speech/types';
import {PauseButton, ResumeButton, StopButton} from 'src/components/text-to-speech/controls/ControlButtons';
import {SpeakButton} from 'src/components/text-to-speech/controls/SpeakButton';
import {SpeechControls} from 'src/components/text-to-speech/controls/SpeechControls';
import {PitchController, RateController, VoiceController, VolumeController} from 'src/components/text-to-speech/settings';

const TextToSpeech = ({
    children,
    lang: _lang = 'en-US',
    rate: _rate = 1,
    pitch: _pitch = 1,
    targetRef
}: TextToSpeechProps) => {
    const {
        isPaused,
        isSpeaking,
        pauseSpeaking,
        resumeSpeaking,
        setSpeakingState,
        stopSpeaking
    } = useSpeechSynthesis();

    const [lang, setLang] = useState<string>(_lang);
    const [pitch, setPitch] = useState<number>(_pitch);
    const [rate, setRate] = useState<number>(_rate);
    const [volume, setVolume] = useState<number>(0.5);

    return <TextToSpeechContext.Provider value={{
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
    </TextToSpeechContext.Provider>;
};

TextToSpeech.Speak = SpeakButton;
TextToSpeech.Stop = StopButton;
TextToSpeech.Pause = PauseButton;
TextToSpeech.Resume = ResumeButton;
TextToSpeech.Controls = SpeechControls;
TextToSpeech.RateController = RateController;
TextToSpeech.PitchController = PitchController;
TextToSpeech.VoiceController = VoiceController;
TextToSpeech.VolumeController = VolumeController;

export default TextToSpeech;