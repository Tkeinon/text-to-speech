import {useTextToSpeechContext} from 'src/components/text-to-speech/context';

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
};

export {VolumeController};
