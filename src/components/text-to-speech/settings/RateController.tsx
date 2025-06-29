import {useTextToSpeechContext} from 'src/components/text-to-speech/context';

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

export {RateController};
