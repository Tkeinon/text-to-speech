import {useTextToSpeechContext} from 'src/components/text-to-speech/context';

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
    };

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

export {PitchController};