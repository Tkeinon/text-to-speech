import {useRef} from 'react';

import TextToSpeech from 'src/components/text-to-speech/TextToSpeech'
import 'src/App.css'


function App() {
    const textRef = useRef<HTMLElement>(null);
    const paragraphRef = useRef<HTMLElement>(null);

    return <div className="App">
        <textarea
            ref={textRef as React.RefObject<HTMLTextAreaElement>}
            placeholder="Type something to read aloud"
        />
        <TextToSpeech targetRef={textRef}>
        <TextToSpeech.RateController />
            <TextToSpeech.PitchController />
            <TextToSpeech.Speak />
            <TextToSpeech.Controls />
            <TextToSpeech.VoiceController />
            <TextToSpeech.VolumeController />
        </TextToSpeech>
        <br />
        <p ref={paragraphRef as React.RefObject<HTMLParagraphElement>}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer consequat, est sed cursus bibendum, lectus purus sodales tellus, 
        tempor mollis ligula arcu a dui. Praesent at ullamcorper augue, vitae elementum erat. Praesent pretium ex sed velit aliquam pellentesque. 
        Praesent eu tristique tortor. Nunc vitae nisl laoreet, efficitur orci sed, mattis mauris.
        Quisque pharetra luctus semper. Nunc pellentesque vitae tellus sit amet maximus. 
        Vivamus gravida justo quis tortor dictum interdum. Duis ornare vehicula tincidunt.
        </p>
        <TextToSpeech targetRef={paragraphRef}>
            <TextToSpeech.RateController />
            <TextToSpeech.PitchController />
            <TextToSpeech.Speak />
            <TextToSpeech.Controls />
            <TextToSpeech.VoiceController />
            <TextToSpeech.VolumeController />
        </TextToSpeech>
    </div>
}

export default App
