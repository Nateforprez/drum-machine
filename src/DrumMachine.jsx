import React from 'react'; 
import './DrumMachine.css'; 

const audioFileNames = [
    {name: "Heater 1", file: "./audio-files/Heater-1.mp3"}, 
    {name: "Heater 2", file: "./audio-files/Heater-2.mp3"}, 
    {name: "Heater 3", file: "./audio-files/Heater-3.mp3"}, 
    {name: "Heater 4", file: "./audio-files/Heater-4.mp3"}, 
    {name: "Clap", file: "./audio-files/Clap.mp3"}, 
    {name: "Open HH", file: "./audio-files/OpenHH.mp3"}, 
    {name: "Kick n' Hat", file: "./audio-files/Kick_n_Hat.mp3"}, 
    {name: "Kick", file: "./audio-files/Kick.mp3"}, 
    {name: "Closed HH", file: "./audio-files/ClosedHH.mp3"}
]
const audioFileBankNames = [
    {name: "Chord 1", file: "./audio-files/Heater-1.mp3"}, 
    {name: "Chord 2", file: "./audio-files/Heater-2.mp3"}, 
    {name: "Chord 3", file: "./audio-files/Heater-3.mp3"},
    {name: "Shaker", file: "./audio-files/Heater-4.mp3"}, 
    {name: "Clap", file: "./audio-files/Clap.mp3"}, 
    {name: "Open H", file: "./audio-files/OpenHH.mp3"}, 
    {name: "Closed H", file: "./audio-files/Kick_n_Hat.mp3"}, 
    {name: "Punchy Kick", file: "./audio-files/Kick.mp3"}, 
    {name: "Side Stick", file: "./audio-files/ClosedHH.mp3"}
]

class DrumMachine extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            powerOn: true, 
            bank: false, 
            info: '', 
            activeKey: null, 
            volume: 50
        }
        //
        this.validKeys = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C']; 
        //
        this.handlePowerClick = this.handlePowerClick.bind(this);
        this.handleBankClick = this.handleBankClick.bind(this); 
        this.handleBtnClick = this.handleBtnClick.bind(this);  
        this.handleKeyDown = this.handleKeyDown.bind(this); 
        this.playAudio = this.playAudio.bind(this); 
        this.selectName = this.selectName.bind(this); 
        this.handleVolumeChange = this.handleVolumeChange.bind(this); 
    }
    handlePowerClick() {
        this.setState((prev => ({powerOn: !prev.powerOn, info: ''}))); 
    }
    handleBankClick() {
        if (this.state.powerOn)
            this.setState((prev => ({bank: !prev.bank, info: prev.bank ? 'Heater Kit' : "Smooth Piano Kit"}))); 
    }
    playAudio(event) {
        const btnId = event.currentTarget.id.split('-')[1]; 
        const audio = document.getElementById(btnId);
        audio.currentTime = 0; 
        audio.play(); 
    }
    selectName(index) {
        const name = this.state.bank ? audioFileBankNames[index].name : audioFileNames[index].name;  
        this.setState(({info: name})); 
    }
    handleBtnClick(event, index) {
        if (this.state.powerOn) {
            this.playAudio(event); 
            this.selectName(index);
        } 
    }
    handleKeyDown(event) {
        const keyPressed = event.key.toUpperCase(); 
        if (this.validKeys.includes(keyPressed)) {
            this.setState(({activeKey: keyPressed})); 
            const btn = document.getElementById("btn-" + keyPressed); 
            btn.click();

            setTimeout(() => {
                this.setState({activeKey: null})
            }, 100); 
        }
    }
    handleVolumeChange(event) {
        const soundVolume = event.target.value; 
        const audios = document.querySelectorAll('audio'); 
        audios.forEach(audio => {
            audio.volume = soundVolume/100; 
        }); 
        this.setState(({volume: soundVolume, info: 'Volume: ' + soundVolume}), () => {
            setTimeout(() => {
                this.setState({info: ''})
            }, 2000);
        }); 
    }
    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown); 
    }

    render() {
        const inactiveStyle = {backgroundColor: "#6b6b6b"}; 
        
        const getAudioFile = (index) => {
            return this.state.bank ? audioFileBankNames[index].file : audioFileNames[index].file; 
        }
        
        return (
            <>
                <div id="drum-machine">
                    <div id="drum-machine-hud" style={{color: 'white'}}>
                        <div id="btn-container">
                            <button className={this.state.activeKey === 'Q' ? 'activeStyle btn drum-pad' : ' btn drum-pad'} id="btn-Q" onClick={(event) => this.handleBtnClick(event, 0)} style={!this.state.powerOn ? inactiveStyle : {}}>
                                Q
                                <audio className='clip' id='Q' src={getAudioFile(0)}></audio>
                            </button>
                            <button className={this.state.activeKey === 'W' ? 'activeStyle btn drum-pad' : ' btn drum-pad'} id="btn-W" onClick={(event) => this.handleBtnClick(event, 1)} style={!this.state.powerOn ? inactiveStyle : {}}>
                                W
                                <audio className='clip' id='W' src={getAudioFile(1)}></audio>
                            </button>
                            <button className={this.state.activeKey === 'E' ? 'activeStyle btn drum-pad' : ' btn drum-pad'} id="btn-E" onClick={(event) => this.handleBtnClick(event, 2)} style={!this.state.powerOn ? inactiveStyle : {}}>
                                E
                                <audio className='clip' id='E' src={getAudioFile(2)}></audio>
                            </button>
                            <button className={this.state.activeKey === 'A' ? 'activeStyle btn drum-pad' : ' btn drum-pad'} id="btn-A" onClick={(event) => this.handleBtnClick(event, 3)} style={!this.state.powerOn ? inactiveStyle : {}}>
                                A
                                <audio className='clip' id='A' src={getAudioFile(3)}></audio>
                            </button>
                            <button className={this.state.activeKey === 'S' ? 'activeStyle btn drum-pad' : ' btn drum-pad'} id="btn-S" onClick={(event) => this.handleBtnClick(event, 4)} style={!this.state.powerOn ? inactiveStyle : {}}>
                                S
                                <audio className='clip' id='S' src={getAudioFile(4)}></audio>
                            </button>
                            <button className={this.state.activeKey === 'D' ? 'activeStyle btn drum-pad' : ' btn drum-pad'} id="btn-D" onClick={(event) => this.handleBtnClick(event, 5)} style={!this.state.powerOn ? inactiveStyle : {}}>
                                D
                                <audio className='clip' id='D' src={getAudioFile(5)}></audio>
                            </button>
                            <button className={this.state.activeKey === 'Z' ? 'activeStyle btn drum-pad' : ' btn drum-pad'} id="btn-Z" onClick={(event) => this.handleBtnClick(event, 6)} style={!this.state.powerOn ? inactiveStyle : {}}>
                                Z
                                <audio className='clip' id='Z' src={getAudioFile(6)}></audio>
                            </button>
                            <button className={this.state.activeKey === 'X' ? 'activeStyle btn drum-pad' : ' btn drum-pad'} id="btn-X" onClick={(event) => this.handleBtnClick(event, 7)} style={!this.state.powerOn ? inactiveStyle : {}}>
                                X
                                <audio className='clip' id='X' src={getAudioFile(7)}></audio>
                            </button>
                            <button className={this.state.activeKey === 'C' ? 'activeStyle btn drum-pad' : ' btn drum-pad'} id="btn-C" onClick={(event) => this.handleBtnClick(event, 8)} style={!this.state.powerOn ? inactiveStyle : {}}>
                                C
                                <audio className='clip' id='C' src={getAudioFile(8)}></audio>
                            </button>
                        </div>

                        <div id="adjustor-container">

                            <div id="power-container">
                                <h2 style={{color: 'black'}}>Power</h2>
                                <div className="switch" id="power-switch">
                                        <div className="off-switch" id="off-power-switch" onClick={this.handlePowerClick} style={{display: this.state.powerOn ? 'none' : 'block', cursor: "pointer"}}></div>
                                        <div className="on-switch" id="on-power-switch" onClick={this.handlePowerClick} style={{display: this.state.powerOn ? 'block' : 'none', cursor: "pointer"}}></div>
                                </div>
                            </div>
                            
                            <div id="display"><h2>{this.state.info}</h2></div>
                            
                            <input className="slider" id="volume-slider" type="range" min="0" max="100" value={this.state.volume} onChange={this.handleVolumeChange} disabled={this.state.powerOn ? false : true}>
                            </input>

                            <div id="bank-container">
                                <h2 style={{color: 'black'}}>Bank</h2>
                                <div className="switch" id="bank-switch">
                                        <div className="off-switch" id="off-bank-switch" onClick={this.handleBankClick} style={{display: this.state.bank ? 'none' : 'block', cursor: "pointer"}}></div>
                                        <div className="on-switch" id="on-bank-switch" onClick={this.handleBankClick} style={{display: this.state.bank ? 'block' : 'none', cursor: "pointer"}}></div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </>
        ); 
    }
}

export default DrumMachine 
