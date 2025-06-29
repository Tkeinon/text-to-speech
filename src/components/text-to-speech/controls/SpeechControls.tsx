import {PauseButton, ResumeButton, StopButton} from 'src/components/text-to-speech/controls/ControlButtons';

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
    return <div className={className}>
        {showStop && <StopButton />}
        {showPause && <PauseButton />}
        {showResume && <ResumeButton />}
    </div>;
};

export {SpeechControls};