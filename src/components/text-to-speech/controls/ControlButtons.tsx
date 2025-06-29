import {useTextToSpeechContext} from 'src/components/text-to-speech/context';

const PauseButton = ({
    className = '',
    buttonText = 'Pause'
}: {
    className?: string,
    buttonText?: string
}) => {
    const {pauseSpeaking, isSpeaking, isPaused} = useTextToSpeechContext();

    return <button 
        className={className} 
        onClick={pauseSpeaking} 
        type='button'
        disabled={!isSpeaking || isPaused}
    >
        {buttonText}
    </button>;
};

const ResumeButton = ({
    className = '',
    buttonText = 'Resume'
}: {
    className?: string,
    buttonText?: string
}) => {
    const {resumeSpeaking, isPaused} = useTextToSpeechContext();

    return <button 
        className={className} 
        onClick={resumeSpeaking} 
        type='button'
        disabled={!isPaused}
    >
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

    return <button 
        className={className} 
        onClick={stopSpeaking} 
        type='button'
        disabled={!isSpeaking}
    >
        {buttonText}
    </button>;
};

export {PauseButton, ResumeButton, StopButton}