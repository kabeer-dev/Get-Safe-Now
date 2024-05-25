import React, { useState, useEffect, useRef } from 'react';
import VideoCallContext from './VideoCallContext';
import Peer from 'simple-peer';
import { notification } from 'antd';
import Teams from '../assests/teams.mp3';
import CallingTune from '../assests/calling.mp3';
import Favicon from '../assests/favicon.png';
import Timer from 'time-counter';
import useAuth from 'hooks/useAuth';
import { io } from 'socket.io-client';
import testAudio from '../assests/test-audio.wav';
import '../video-chat-app.css';
import 'antd/dist/reset.css'
import "font-awesome/css/font-awesome.min.css";

const socketConnection = io.connect(process.env.REACT_APP_SOCKET_URL);

// const servers = {
//   iceServers: [
//     {
//       urls: "stun:openrelay.metered.ca:80",
//     },
//     {
//       urls: "turn:openrelay.metered.ca:80",
//       username: "openrelayproject",
//       credential: "openrelayproject",
//     },
//     {
//       urls: "turn:openrelay.metered.ca:443",
//       username: "openrelayproject",
//       credential: "openrelayproject",
//     },
//     {
//       urls: "turn:openrelay.metered.ca:443?transport=tcp",
//       username: "openrelayproject",
//       credential: "openrelayproject",
//     },
//   ],
// };

// const servers = {
//   iceServers: [
//     { urls: 'stun:stun.l.google.com:19302' },
//     { urls: 'stun:stun1.l.google.com:19302' },
//     { urls: 'stun:stun2.l.google.com:19302' },
//     { urls: 'stun:stun3.l.google.com:19302' },
//     { urls: 'stun:stun4.l.google.com:19302' },
//     {
//       url: 'turn:turn.bistri.com:80',
//       credential: 'homeo',
//       username: 'homeo',
//     },
//     {
//       url: 'turn:turn.anyfirewall.com:443?transport=tcp',
//       credential: 'webrtc',
//       username: 'webrtc',
//     },
//   ],
// };

// Trial express turn servers
// const servers = {
//   iceServers: [
//     {
//       url: 'turn:relay1.expressturn.com:3478',
//       username: 'efMLRWH4J7TSION671',
//       credential: 'DwcAzFUjKyOvGCIE',
//     },
//   ],
// };

// Premium express turn servers
const servers = {
    iceServers: [
        { urls: 'stun:relay2.expressturn.com:443' },
        { urls: 'stun:relay3.expressturn.com:80' },
        { urls: 'stun:relay3.expressturn.com:443' },
        { urls: 'stun:relay4.expressturn.com:3478' },
        { urls: 'stun:relay5.expressturn.com:3478' },
        { urls: 'stun:relay6.expressturn.com:3478' },
        { urls: 'stun:relay7.expressturn.com:3478' },
        { urls: 'stun:relay8.expressturn.com:3478' },
        {
            urls: 'turn:relay2.expressturn.com:443',
            username: 'efV0SPHGZEV3L34KOK',
            credential: 'YR4N2REgZ4ovRNtc'
        },
        {
            urls: 'turn:relay3.expressturn.com:80',
            username: 'efV0SPHGZEV3L34KOK',
            credential: 'YR4N2REgZ4ovRNtc'
        },
        {
            urls: 'turn:relay3.expressturn.com:443',
            username: 'efV0SPHGZEV3L34KOK',
            credential: 'YR4N2REgZ4ovRNtc'
        },
        {
            urls: 'turn:relay4.expressturn.com:3478',
            username: 'efV0SPHGZEV3L34KOK',
            credential: 'YR4N2REgZ4ovRNtc'
        },
        {
            urls: 'turn:relay5.expressturn.com:3478',
            username: 'efV0SPHGZEV3L34KOK',
            credential: 'YR4N2REgZ4ovRNtc'
        },
        {
            urls: 'turn:relay6.expressturn.com:3478',
            username: 'efV0SPHGZEV3L34KOK',
            credential: 'YR4N2REgZ4ovRNtc'
        },
        {
            urls: 'turn:relay7.expressturn.com:3478',
            username: 'efV0SPHGZEV3L34KOK',
            credential: 'YR4N2REgZ4ovRNtc'
        },
        {
            urls: 'turn:relay8.expressturn.com:3478',
            username: 'efV0SPHGZEV3L34KOK',
            credential: 'YR4N2REgZ4ovRNtc'
        }
    ]
};

var countDown = new Timer({
    direction: 'down',
    startValue: '0:30' // one minute
});

const VideoCallContextProvider = ({ children }) => {
    const { user, logout } = useAuth();

    const [callAccepted, setCallAccepted] = useState(false);
    const [callDecline, setCallDecline] = useState(true);
    const [callEnded, setCallEnded] = useState(false);
    const [stream, setStream] = useState(null);
    const [chat, setChat] = useState([]);
    const [name, setName] = useState('');
    const [call, setCall] = useState({});
    const [me, setMe] = useState('');
    const [myUuid, setMyUuid] = useState('');
    const [userName, setUserName] = useState('');
    const [otherUser, setOtherUser] = useState('');
    const [otherUserUuid, setOtherUserUuid] = useState('');
    const [otherUserName, setOtherUserName] = useState('');
    const [myVdoStatus, setMyVdoStatus] = useState(false);
    const [userVdoStatus, setUserVdoStatus] = useState();
    const [otherUserScreenShareStatus, setOtherUserScreenShareStatus] = useState(false);
    const [myMicStatus, setMyMicStatus] = useState(false);
    const [myBluetoothStatus, setMyBluetoothStatus] = useState(false);
    const [userMicStatus, setUserMicStatus] = useState();
    const [msgRcv, setMsgRcv] = useState('');
    const [screenShare, setScreenShare] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [calling, setCalling] = useState(false);
    const [callStatus, setCallStatus] = useState('');
    const [summary, setSummary] = useState();
    const [showSummary, setShowSummary] = useState(false);
    const [pricePerMinute, setPricePerMinute] = useState(2);
    const [callDeclineAfterSeconds, setCallDeclineAfterSeconds] = useState(30);
    const [defaultTitle, setDefaultTitle] = useState('Video chat');
    const [notifyAfterSecondsOfTabInactivity, setNotifyAfterSecondsOfTabInactivity] = useState(60);
    const [isShown, setIsShown] = useState(false);
    const [testAudioPlaying, setTestAudioPlaying] = useState(false);
    const [callConnected, setCallConnected] = useState(false);
    const [callTime, setCallTime] = useState('00:00');
    const [amount, setAmount] = useState(0);
    const [otherUserSummary, setOtherUserSummary] = useState(null);
    const [openPaymentAuthorizationModal, setOpenPaymentAuthorizationModal] = useState(false);
    const [paymentAuthorizationStatus, setPaymentAuthorizationStatus] = useState(null);
    const [paymentAuthorizationMessage, setPaymentAuthorizationMessage] = useState(null);
    const [maxDuration, setMaxDuration] = useState('59:30');
    const [maxCallTime, setMaxCallTime] = useState('1 hour');
    const [callPrice, setCallPrice] = useState((pricePerMinute * 60).toFixed(2));
    const [cd, setCd] = useState('');
    const [refreshing, setRefreshing] = useState(true);
    const [showSettingsModel, setShowSettingsModel] = useState(false);

    const socketRef = useRef(socketConnection);
    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();
    const screenTrackRef = useRef();
    const Audio = useRef();
    const activeStream = useRef(stream);
    const myVideoStatusRef = useRef(myVdoStatus);
    const myVideoInitialStatusRef = useRef(myVdoStatus);
    const myMicInitialStatusRef = useRef(myMicStatus);
    const myMicStatusRef = useRef(myMicStatus);
    const myUuidRef = useRef(myUuid);
    const activeTimeout = useRef();
    const callStatusRef = useRef(callStatus);
    const callRef = useRef(call);
    const maxDurationRef = useRef(maxDuration);
    const maxCallTimeRef = useRef(maxCallTime);
    const currentInterval = useRef('');
    const speakersDeviceIdRef = useRef('');
    const callDeclineTimeoutRef = useRef('');
    const setCallingTimeoutRef = useRef('');
    const inCallRef = useRef(false);
    const analyserCanvas = useRef(null);
    const audioTesting = useRef();
    const mySocketIdRef = useRef();
    const otherUserSocketIdRef = useRef();
    const otherUserUuidRef = useRef();
    const countUpTimer = useRef(null);
    const connectionLostTimeoutRef = useRef(null);
    const myStatusRef = useRef('online');
    const otherUserStatusRef = useRef(null);
    const callIdRef = useRef();
    const tabActivationIntervalRef = useRef();
    const chatRef = useRef(chat);
    const showSettingsModelRef = useRef(null);
    const cameraTesting = useRef();
    const audioDeviceIdRef = useRef();
    const videoDeviceIdRef = useRef();

    const speakerDeviceId = localStorage.getItem('speaker_device_id');
    const microphoneDeviceId = localStorage.getItem('microphone_device_id');
    const cameraDeviceId = localStorage.getItem('camera_device_id');

    useEffect(() => {
        checkAudioVideoPermissions();
        getMediaDevices();

        if (speakerDeviceId) {
            attachSinkId(Audio.current, speakerDeviceId);
            attachSinkId(audioTesting.current, speakerDeviceId);
            speakersDeviceIdRef.current = speakerDeviceId;
        }

        socketRef.current.on('logout', () => {
            console.log('socket on logout');
            logout();
        });

        socketRef.current.on('refreshOnlineUsers', () => {
            socketRef.current.emit('getMySocketId');
        });

        if (!socketRef.current.connected) {
            console.log('latest testing connecting socket');
            socketRef.current.disconnect();
            socketRef.current.connect();
        }

        socketRef.current.emit('getMySocketId');

        socketRef.current.on('me', (id) => {
            console.log('latest testing on me adding new user');
            setMe(id);
            newUser();
        });

        console.log('adding socket listener disconnect');
        socketRef.current.on('disconnect', () => {
            console.log('latest testing disconnected');
            notifyMe('Connection to the server is lost', 'Kindly check your internet connection');
            if (inCallRef.current) {
                setCallStatus('Connection to the server is lost. Kindly check your internet connection');
                connectionLostTimeoutRef.current = setTimeout(() => {
                    setSummary('');
                    setOtherUserSummary('');
                    leaveCall(false);
                }, 15000);
            }
        });

        socketRef.current.io.on('reconnection_attempt', () => {
            console.log('latest testing reconnection attempt');
        });

        socketRef.current.io.on('reconnect', () => {
            console.log('latest testing reconnected');
            socketRef.current.emit('getMySocketId');
            setCallStatus('');
            if (connectionLostTimeoutRef.current) {
                clearTimeout(connectionLostTimeoutRef.current);
                connectionLostTimeoutRef.current = null;
            }
        });

        socketRef.current.on('new_connect', (data) => {
            setOnlineUsers(data);
            console.log('new_connect', data);
            console.log('otherUserUuidRef.current', otherUserUuidRef.current);
            if (otherUserUuidRef.current) {
                let otherUserIndex = data.findIndex((user) => user.id === otherUserUuidRef.current);
                console.log('otherUserIndex', otherUserIndex);
                if (otherUserIndex !== -1 && data[otherUserIndex]['socketId'] != otherUserSocketIdRef.current) {
                    otherUserSocketIdRef.current = data[otherUserIndex]['socketId'];
                    setOtherUser(otherUserSocketIdRef.current);
                    setCallStatus('');
                    callStatusRef.current = '';
                    console.log('Ice State when other user reconnected', connectionRef.current._pc.iceConnectionState);
                    if (connectionRef.current._pc.iceConnectionState != 'connected') {
                        leaveCall();
                    }
                }
            }
            setRefreshing(false);
        });

        socketRef.current.on('updateUserMedia', (data) => {
            console.log('updateUserMedia', data);
            if (data.currentMediaStatus !== null || data.currentMediaStatus !== []) {
                switch (data.type) {
                    case 'video':
                        setUserVdoStatus(data.currentMediaStatus);
                        break;
                    case 'mic':
                        setUserMicStatus(data.currentMediaStatus);
                        break;
                    case 'screenShare':
                        setOtherUserScreenShareStatus(data.currentMediaStatus);
                        break;
                    default:
                        setUserMicStatus(data.currentMediaStatus[0]);
                        setUserVdoStatus(data.currentMediaStatus[1]);
                        break;
                }
            }
        });

        // For Receiver
        socketRef.current.on('callUser', ({ fromUuid, from, name: callerName, maxDuration, maxCallTime, callId }) => {
            socketRef.current.emit('busy', {
                id: mySocketIdRef.current
            });
            setShowSummary(false);
            Audio.current.src = Teams;
            Audio.current.play();
            setCallStatus('');
            setCalling(false);
            let call = { isReceivingCall: true, fromUuid, from, name: callerName, maxDuration, maxCallTime };
            otherUserSocketIdRef.current = from;
            setCall(call);
            callIdRef.current = callId;
            callRef.current = call;
            setCallDecline(false);
            callDeclineTimeoutRef.current = setTimeout(() => {
                declineCall();
            }, callDeclineAfterSeconds * 1000);
            document.title = 'Incoming call';
            if (document.hidden || !document.hasFocus()) {
                notifyMe('Incoming call', 'You have an incoming video call');
            }
            setCd('');
        });

        // socketRef.current.on('notifyReceiverAboutCall', ({ name }) => {
        //     notifyMe('Missed Call', `${name} was trying to call you`);
        // });

        socketRef.current.on('otherUserLostConnection', () => {
            setCallStatus('Other user has lost their connection');
            callStatusRef.current = 'Other user has lost their connection';
        });

        socketRef.current.on('disconnectTheCall', () => {
            console.log('disconnecting the call');
            leaveCall();
        });

        return () => {
            console.log('testing disconnecting socket');
            callIdRef.current = null;
            myStatusRef.current = 'online';
            setStream(null);
            if(activeStream.current) {
                activeStream.current.getTracks().forEach((track) => track.stop());
            }
            socketRef.current.off();
            socketRef.current.io.off();
            socketRef.current.disconnect();
        };
    }, []);

    useEffect(() => {
        if (call.isReceivingCall && !callAccepted) {
            setOtherUser(call.from);
        }
    }, [call]);

    useEffect(() => {
        if (user) {
            setName( (user.displayName) ? user.displayName : `${user.firstName}  ${user.lastName}`);
        }
    }, [user]);

    useEffect(() => {
        otherUserSocketIdRef.current = otherUser;
    }, [otherUser]);

    useEffect(() => {
        otherUserUuidRef.current = otherUserUuid;
    }, [otherUserUuid]);

    useEffect(() => {
        if (me) {
            mySocketIdRef.current = me;
            socketRef.current.off('userStatus');
            socketRef.current.on('userStatus', ({ id, status, callId }) => {
                console.log('1: on userStatus socket me: ', status);
                otherUserStatusRef.current = status;
                if (status === 'online') {
                    document.title = 'Ringing';
                    callIdRef.current = callId;
                    callUser(id);
                } else {
                    setCallAccepted(false);
                    setCallEnded(false);
                    setCallDecline(false);
                    setCallStatus('Busy on other call');
                    setOtherUser('');
                    let call = { isReceivingCall: false, fromUuid: '', from: '', name: '', signal: '', maxDuration: '', maxCallTime: '' };
                    setCall(call);
                    callRef.current = call;
                    setTimeout(() => {
                        if (otherUserSocketIdRef.current) declineCall();
                    }, 3000);
                }
            });

            socketRef.current.off('callEvent');
            socketRef.current.on('callEvent', ({ data }) => {
                console.log('5: call Event socket', data.type);
                switch (data.type) {
                    case 'accepted':
                        setCallStatus('');
                        setOtherUser(data.from);
                        setOtherUserUuid(data.fromUuid);
                        otherUserUuidRef.current = data.fromUuid;
                        callHasBeenAcceptedFromReceiver();
                        break;
                    default:
                        setCallStatus('');
                        break;
                }
            });

            socketRef.current.off('endCall');
            socketRef.current.on('endCall', ({ data }) => {
                console.log('endCall data', data);
                document.title = defaultTitle;
                if (data.cancel !== 1) {
                    endingCall();
                    stopCountDown();
                } else {
                    clearTimeout(callDeclineTimeoutRef.current);
                    socketRef.current.emit('online', { id: mySocketIdRef.current });

                    if (data.canceledByReceiver) {
                        setCallStatus('Call cannot be established');
                        setCallingTimeoutRef.current = setTimeout(() => {
                            setCallStatus('');
                            setCalling(false);
                        }, 3000);
                    } else {
                        setCalling(false);
                    }
                    setCallDecline(true);
                    Audio.current.pause();
                }
            });

            socketRef.current.off('summary');
            socketRef.current.on('summary', (data) => {
                console.log('summary', data);
                setSummary(data.summary);
                setOtherUserSummary(data.otherUserSummary);
            });
        }
    }, [me]);

    async function getMediaDevices() {
        await navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);
    }

    function handleError(error) {
        console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
    }

    function gotDevices(deviceInfos) {
        const speakers = document.createElement('select');
        const microphones = document.createElement('select');
        const cameras = document.createElement('select');

        let selectedSpeakerIndex = 0;
        let selectedMicrophoneIndex = 0;
        let selectedCameraIndex = 0;

        let currentSpeakerIndex = -1;
        let currentMicrophoneIndex = -1;
        let currentCameraIndex = -1;

        for (let i = 0; i !== deviceInfos.length; ++i) {
            const deviceInfo = deviceInfos[i];
            const option = document.createElement('option');
            option.value = deviceInfo.deviceId;
            if (deviceInfo.kind === 'audiooutput') {
                currentSpeakerIndex += 1;
                option.text = deviceInfo.label || `speaker ${speakers.length + 1}`;
                speakers.appendChild(option);
                if (speakerDeviceId === deviceInfo.deviceId) {
                    selectedSpeakerIndex = currentSpeakerIndex;
                }
            } else if (deviceInfo.kind === 'audioinput') {
                currentMicrophoneIndex += 1;
                option.text = deviceInfo.label || `speaker ${microphones.length + 1}`;
                microphones.appendChild(option);
                if (microphoneDeviceId === deviceInfo.deviceId) {
                    selectedMicrophoneIndex = currentMicrophoneIndex;
                }
            } else if (deviceInfo.kind === 'videoinput') {
                currentCameraIndex += 1;
                option.text = deviceInfo.label || `speaker ${cameras.length + 1}`;
                cameras.appendChild(option);
                if (cameraDeviceId === deviceInfo.deviceId) {
                    selectedCameraIndex = currentCameraIndex;
                }
            }
        }

        // Before call options
        const oldSpeakerSelector = document.getElementById('speakers');
        const oldMicrophoneSelector = document.getElementById('microphones');
        const oldCameraSelector = document.getElementById('cameras');

        const newSpeakerSelector = speakers.cloneNode(true);
        if(oldSpeakerSelector) {
            newSpeakerSelector.addEventListener('change', changeAudioDestination);
            oldSpeakerSelector.parentNode.replaceChild(newSpeakerSelector, oldSpeakerSelector);
        }

        const newMicrophoneSelector = microphones.cloneNode(true);
        if(oldMicrophoneSelector) {
            newMicrophoneSelector.addEventListener('change', changeAudioDevice);
            oldMicrophoneSelector.parentNode.replaceChild(newMicrophoneSelector, oldMicrophoneSelector);
        }

        const newCameraSelector = cameras.cloneNode(true);
        if(oldCameraSelector) {
            newCameraSelector.addEventListener('change', changeVideoDevice);
            oldCameraSelector.parentNode.replaceChild(newCameraSelector, oldCameraSelector);
        }

        // Selecting previously selected options
        if (newSpeakerSelector.options[selectedSpeakerIndex]) {
            newSpeakerSelector.options[selectedSpeakerIndex].selected = true;
        }
        if (newMicrophoneSelector.options[selectedMicrophoneIndex]) {
            newMicrophoneSelector.options[selectedMicrophoneIndex].selected = true;
        }
        if (newCameraSelector.options[selectedCameraIndex]) {
            newCameraSelector.options[selectedCameraIndex].selected = true;
        }

        newSpeakerSelector.id = 'speakers';
        newMicrophoneSelector.id = 'microphones';
        newCameraSelector.id = 'cameras';
       
        // During call options
        const duringCallOldSpeakerSelector = document.getElementById('during-call-speakers');
        const duringCallOldMicrophoneSelector = document.getElementById('during-call-microphones');
        const duringCallOldCameraSelector = document.getElementById('during-call-cameras');

        const duringCallNewSpeakerSelector = speakers.cloneNode(true);
        duringCallNewSpeakerSelector.addEventListener('change', changeAudioDestination);
        duringCallOldSpeakerSelector.parentNode.replaceChild(duringCallNewSpeakerSelector, duringCallOldSpeakerSelector);

        const duringCallNewMicrophoneSelector = microphones.cloneNode(true);
        duringCallNewMicrophoneSelector.addEventListener('change', changeAudioDevice);
        duringCallOldMicrophoneSelector.parentNode.replaceChild(duringCallNewMicrophoneSelector, duringCallOldMicrophoneSelector);

        const duringCallNewCameraSelector = cameras.cloneNode(true);
        duringCallNewCameraSelector.addEventListener('change', changeVideoDevice);
        duringCallOldCameraSelector.parentNode.replaceChild(duringCallNewCameraSelector, duringCallOldCameraSelector);

        // Selecting previously selected options
        if (duringCallNewSpeakerSelector.options[selectedSpeakerIndex]) {
            duringCallNewSpeakerSelector.options[selectedSpeakerIndex].selected = true;
        }
        if (duringCallNewMicrophoneSelector.options[selectedMicrophoneIndex]) {
            duringCallNewMicrophoneSelector.options[selectedMicrophoneIndex].selected = true;
        }
        if (duringCallNewCameraSelector.options[selectedCameraIndex]) {
            duringCallNewCameraSelector.options[selectedCameraIndex].selected = true;
        }

        duringCallNewSpeakerSelector.id = 'during-call-speakers';
        duringCallNewMicrophoneSelector.id = 'during-call-microphones';
        duringCallNewCameraSelector.id = 'during-call-cameras';
    }

    function changeAudioDestination(event) {
        const deviceId = event.target.value;
        const outputSelector = event.target;
        speakersDeviceIdRef.current = deviceId;
        attachSinkId(Audio.current, deviceId, outputSelector);
        attachSinkId(audioTesting.current, deviceId, outputSelector);
        if (userVideo.current) {
            setSinkIdofUserVideo(deviceId);
        }
        localStorage.setItem('speaker_device_id', event.target.value);
        const element = document.getElementById(event.target.id === 'speakers' ? 'during-call-speakers' : 'speakers');
        if(element) {
            element.options.selectedIndex = document.getElementById(event.target.id).options.selectedIndex;        
        }
    }

    function changeAudioDevice(event) {
        audioDeviceIdRef.current = event.target.value;
        checkAudioVideoPermissions(event.target.value, videoDeviceIdRef.current);
        localStorage.setItem('microphone_device_id', event.target.value);
        const element = document.getElementById(event.target.id === 'microphones' ? 'during-call-microphones' : 'microphones');
        if(element) {
            element.options.selectedIndex = document.getElementById(event.target.id).options.selectedIndex;        
        }
    }

    function changeVideoDevice(event) {
        videoDeviceIdRef.current = event.target.value;
        checkAudioVideoPermissions(audioDeviceIdRef.current, event.target.value);
        localStorage.setItem('camera_device_id', event.target.value);
        console.log('testing event.target.id', event.target.id);
        if (document.getElementById('cameras')) {
            document.getElementById('cameras').options.selectedIndex = document.getElementById(event.target.id).options.selectedIndex;
        }
        const element = document.getElementById(event.target.id === 'cameras' ? 'during-call-cameras' : 'cameras');
        if(element) {
            element.options.selectedIndex = document.getElementById(event.target.id).options.selectedIndex;        }
    }

    // Attach audio output device to the provided media element using the deviceId.
    function attachSinkId(element, sinkId, outputSelector = null) {
        if (typeof element.sinkId !== 'undefined') {
            let restartElement = false;
            if (!element.paused) {
                restartElement = true;
                element.pause();
            }

            element
                .setSinkId(sinkId)
                .then(() => {
                    if (restartElement) {
                        element.play();
                    }
                    console.log(`Success, audio output device attached: ${sinkId} to element with ${element.title} as source.`);
                })
                .catch((error) => {
                    let errorMessage = error;
                    if (error.name === 'SecurityError') {
                        errorMessage = `You need to use HTTPS for selecting audio output device: ${error}`;
                    }
                    console.error(errorMessage);
                    // Jump back to first output device in the list as it's the default.
                    if (outputSelector) outputSelector.selectedIndex = 0;
                });
        } else {
            console.warn('Browser does not support setSinkId function.');
        }
    }

    const startTimer = (startValue = 0) => {
        countUpTimer.current = new Timer({ startValue: '0:0' + startValue });
        console.log('starttimer', countUpTimer.current);
        stopTimer();
        stopCountDown();
        setCallTime('');
        setAmount(0);
        let sec = startValue;
        countUpTimer.current.on('change', (val) => {
            setCallTime(val);
            sec++;
            let p = pricePerMinute / 60;
            setAmount(sec * p);
            // console.log('countuptimer maxDurationRef.current',maxDurationRef.current,val)
            if (val === maxDurationRef.current || val === `0${maxDurationRef.current}`) {
                countDown.start();
            }
        });
        countUpTimer.current.start();
    };

    const stopTimer = () => {
        console.log('stopping timer', countUpTimer.current);
        countUpTimer.current && countUpTimer.current.stop();
    };

    const stopCountDown = () => {
        countDown && countDown.stop();
    };

    const newUser = async () => {
        const id = user.id;
        setMyUuid(id);
        myUuidRef.current = id;
        let data = { name: (user.displayName) ? user.displayName : `${user.firstName} ${user.lastName}`, id: id, cameraAvailable: stream?.video ? true : false };
        console.log(user.onlineAvailability)
        if (myStatusRef.current) {
            if(user.onlineAvailability === 1){
                data.status = myStatusRef.current;
            }else{
                data.status = 'offline';
            }
        }

        if (callIdRef.current) {
            data.callId = callIdRef.current;
        }

        socketRef.current.emit('new_user', data, (error) => {});
    };

    async function notifyMe(title, body, icon = null) {
        if (!('Notification' in window)) {
            notification.open({
                message: title,
                description: body,
                icon
            });
        } else if (Notification.permission === 'granted') {
            // Check whether notification permissions have already been granted;
            // if so, create a notification
            let notification = new Notification(title, {
                body,
                icon: icon ? icon : Favicon
            });
            notification.onclick = function () {
                window.focus();
            };
        } else if (Notification.permission !== 'denied') {
            // We need to ask the user for permission
            await Notification.requestPermission().then((permission) => {
                // If the user accepts, let's create a notification
                if (permission === 'granted') {
                    let notification = new Notification(title, {
                        body,
                        icon: icon ? icon : Favicon
                    });
                    notification.onclick = function () {
                        window.focus();
                    };
                }
            });
        }
    }

    const testMicrophone = async () => {
        const audioCtx = new AudioContext();
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 2048;
        const audioSrc = audioCtx.createMediaStreamSource(stream);
        audioSrc.connect(analyser);
        const data = new Uint8Array(analyser.frequencyBinCount);
        const ctx = analyserCanvas.current.getContext('2d');
        const draw = (dataParm) => {
            ctx.clearRect(0, 0, analyserCanvas.current.width, analyserCanvas.current.height);
            dataParm = [...dataParm];
            ctx.fillStyle = 'white'; //white background
            ctx.lineWidth = 50; //width of candle/bar
            ctx.strokeStyle = '#000000'; //color of candle/bar
            const space = analyserCanvas.current.width / dataParm.length;
            dataParm.forEach((value, i) => {
                ctx.beginPath();
                ctx.moveTo(space * i, analyserCanvas.current.height); //x,y
                ctx.lineTo(space * i, analyserCanvas.current.height - value); //x,y
                ctx.stroke();
            });
        };

        let animationLoop;

        const loopingFunction = () => {
            console.log('Animation loop');
            animationLoop = requestAnimationFrame(loopingFunction);
            analyser.getByteFrequencyData(data);
            if (inCallRef.current || !analyserCanvas.current) cancelAnimationFrame(animationLoop);
            draw(data);
        };
        /* "requestAnimationFrame" requests the browser to execute the code during the next repaint cycle. This allows the system to optimize resources and frame-rate to reduce unnecessary reflow/repaint calls. */
        animationLoop = requestAnimationFrame(loopingFunction);
    };

    const setSinkIdofUserVideo = (sinkId) => {
        let restartElement = false;
        if (!userVideo.current.paused) {
            restartElement = true;
            userVideo.current.pause();
        }
        if (typeof userVideo.current.sinkId !== 'undefined') {
            userVideo.current
                .setSinkId(sinkId)
                .then(() => {
                    if (restartElement) {
                        userVideo.current.play();
                    }
                })
                .catch((error) => {
                    console.error('error on update sinkId:', error);
                });
        } else {
            console.warn('Browser does not support setSinkId function.');
        }
    };

    const checkAudioVideoPermissions = async (audioDeviceId = null, videoDeviceId = null) => {
        let hasAudioPermission = null;
        let hasVideoPermission = null;

        try {
            hasAudioPermission = (await navigator.mediaDevices.getUserMedia({ audio: true })) ? true : false;
        } catch (error) {
            hasAudioPermission = false;
        }

        try {
            hasVideoPermission = (await navigator.mediaDevices.getUserMedia({ video: true })) ? true : false;
        } catch (error) {
            hasVideoPermission = false;
        }

        navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        });
        navigator.mediaDevices
            .getUserMedia({
                audio: hasAudioPermission ? { deviceId: audioDeviceId ?? localStorage.getItem('microphone_device_id') } : false,
                video: hasVideoPermission ? { deviceId: videoDeviceId ?? localStorage.getItem('camera_device_id') } : false
            })
            .then((currentStream) => {
                if (connectionRef.current) {
                    console.log("666666666666666666666666666666666666666666666666666666666666")
                    connectionRef.current.removeStream(activeStream.current);
                    console.log("1233333333333333333333333333333333333333333333333333333333")
                    if (activeStream.current.getAudioTracks().length > 0) {
                        currentStream.getAudioTracks()[0].enabled = activeStream.current.getAudioTracks()[0].enabled;
                    }
                    connectionRef.current.addStream(currentStream);
                }

                setStream(currentStream);
                activeStream.current = currentStream;

                if (currentStream.getVideoTracks().length > 0) {
                    socketRef.current.emit('cameraAvailable', { cameraAvailable: true }, (error) => {
                        console.log(error);
                    });
                }
            })
            .catch((err) => {
                setStream();
                console.log(err.name + ': ' + err.message);
            });
    };

    const checkIfTabIsActive = () => {
        console.log('checkIfTabIsActive');
        const tabCheckingCallback = (e) => {
            console.log('tabCheckingCallback', document.visibilityState === 'visible' && document.hasFocus());
            if (document.visibilityState === 'visible' && document.hasFocus()) {
                clearTimeout(tabActivationIntervalRef.current);
            } else {
                if (tabActivationIntervalRef.current) {
                    clearTimeout(tabActivationIntervalRef.current);
                }
                tabActivationIntervalRef.current = setInterval(() => {
                    if (inCallRef.current) {
                        notifyMe('Video call is active', 'You have an active video call. Click on me to go to call.');
                    }
                }, notifyAfterSecondsOfTabInactivity * 1000);
            }
        };

        // document.addEventListener("visibilitychange",tabCheckingCallback);
        window.addEventListener('blur', tabCheckingCallback);
        window.addEventListener('focus', tabCheckingCallback);
    };

    function toggleTestAudio() {
        if (testAudioPlaying) {
            if(audioTesting.current) {
                audioTesting.current.pause();
            }
            setTestAudioPlaying(false);
        } else {
            if(audioTesting.current) {
                audioTesting.current.play();
            }
            setTestAudioPlaying(true);
        }
    }

    const initiatePeer1 = () => {
        var vpnBlockageCheckTimeout;
        var automaticallyDisconnectCallTimeout;

        const peer1 = new Peer({
            config: servers,
            initiator: true,
            trickle: true,
            stream: activeStream.current
        });

        // peer1._debug = console.log

        peer1.on('error', (err) => {
            notifyMe('Connection lost', 'Peer 2 Peer connection was lost');
            leaveCall();
            console.log('peer 1 error:', err);
        });

        peer1.on('connect', () => {
            socketRef.current.emit('buyerConnected', {
                callId: callIdRef.current
            });

            // For Native app
            setTimeout(() => peer1.send('Peer 1 is connected'), 500);
        });

        socketRef.current.off('bothUsersConnected');
        socketRef.current.on('bothUsersConnected', (signal) => {
            userConnected(2, vpnBlockageCheckTimeout, automaticallyDisconnectCallTimeout);
        });

        peer1.on('signal', (signal) => {
            console.log('caller signal peer1', signal);
            socketRef.current.emit('signal', { to: otherUserSocketIdRef.current, from: 'peer1', signal });
            inCallRef.current = true;
            if (!vpnBlockageCheckTimeout) {
                vpnBlockageCheckTimeout = setTimeout(() => {
                    notifyMe('VPN blockage', 'Please make sure you are not blocked by the VPN');
                }, 7000);
            }
            if (!automaticallyDisconnectCallTimeout) {
                automaticallyDisconnectCallTimeout = setTimeout(() => {
                    leaveCall();
                }, 30000);
            }
        });

        socketRef.current.off('signal');
        socketRef.current.on('signal', (signal) => {
            // console.log('signal from peer2',signal)
            peer1.signal(signal);
        });

        peer1.on('stream', (currentStream) => {
            console.log('caller stream peer1', currentStream.getTracks());
            userVideo.current.srcObject = currentStream;
            setSinkIdofUserVideo(speakersDeviceIdRef.current);
        });

        peer1.on('close', () => {
            console.log('ICE state peer1 closed');
            socketRef.current.off('signal');
        });

        connectionRef.current = peer1;
    };

    const callHasBeenAcceptedFromReceiver = () => {
        document.title = 'In call';
        Audio.current.pause();
        checkIfTabIsActive();
        setCallStatus('Connecting...');

        initiatePeer1();
    };

    const callTo = (id) => {
        console.log('callTo function');
        socketRef.current.emit('checkUserStatus', { id: id, me: mySocketIdRef.current, name: name });
    };

    const callUser = (id) => {
        socketRef.current.emit('busy', {
            id: mySocketIdRef.current
        });

        socketRef.current.emit('callUser', {
            userToCall: id,
            fromUuid: myUuidRef.current,
            from: mySocketIdRef.current,
            name: name,
            maxDuration: maxDurationRef.current,
            maxCallTime: maxCallTimeRef.current,
            callId: callIdRef.current
        });

        setOtherUser(id);

        callDeclineTimeoutRef.current = setTimeout(() => {
            declineCall('Call cannot be established');
        }, callDeclineAfterSeconds * 1000);

        Audio.current.src = CallingTune;
        Audio.current.play();
        myStatusRef.current = 'busy';

        socketRef.current.on('callAccepted', ({ userName, from }) => {
            console.log('callAccepted from other user');
            clearTimeout(callDeclineTimeoutRef.current);

            setCallAccepted(true);
            setUserName(userName);
            setCalling(false);
            socketRef.current.emit('updateMyMedia', {
                callId: callIdRef.current,
                to: from,
                type: 'both',
                currentMediaStatus: [myMicStatusRef.current, myVideoStatusRef.current],
                triggeredBySocketId: mySocketIdRef.current,
                triggeredByUuid: myUuidRef.current
            });
        });
    };

    const userConnected = (timerStartValue, vpnBlockageCheckTimeout, automaticallyDisconnectCallTimeout) => {
        setCallStatus('');
        setCallConnected(true);
        stopTimer();
        startTimer(timerStartValue);

        clearTimeout(vpnBlockageCheckTimeout);
        clearTimeout(automaticallyDisconnectCallTimeout);
    };

    const initiatePeer2 = () => {
        var vpnBlockageCheckTimeout;
        var automaticallyDisconnectCallTimeout;

        const peer2 = new Peer({
            config: servers,
            initiator: false,
            trickle: true,
            stream: activeStream.current
        });

        // peer2._debug = console.log

        peer2.on('error', (err) => {
            notifyMe('Connection lost', 'Peer 2 Peer connection was lost');
            leaveCall();
            console.log('peer 2 error:', err);
        });

        peer2.on('connect', () => {
            socketRef.current.emit('helperConnected', {
                callId: callIdRef.current
            });
        });

        socketRef.current.off('bothUsersConnected');
        socketRef.current.on('bothUsersConnected', (signal) => {
            userConnected(0, vpnBlockageCheckTimeout, automaticallyDisconnectCallTimeout);
        });

        peer2.on('signal', (data) => {
            console.log('receiver signal peer2', data);
            socketRef.current.emit('signal', { to: call.from, from: 'peer2', signal: data });
            inCallRef.current = true;
            if (!vpnBlockageCheckTimeout) {
                vpnBlockageCheckTimeout = setTimeout(() => {
                    notifyMe('VPN blockage', 'Please make sure you are not blocked by the VPN');
                }, 7000);
            }
            if (!automaticallyDisconnectCallTimeout) {
                automaticallyDisconnectCallTimeout = setTimeout(() => {
                    leaveCall();
                }, 30000);
            }
        });

        socketRef.current.off('signal');
        socketRef.current.on('signal', (signal) => {
            // console.log('signal from peer1',signal)
            // console.log('peer2 on signaling from peer1',peer2)
            peer2.signal(signal);
        });

        peer2.on('stream', (currentStream) => {
            console.log('2: receiver stream peer2', currentStream.getTracks());
            userVideo.current.srcObject = currentStream;
            setSinkIdofUserVideo(speakersDeviceIdRef.current);
        });

        peer2.on('close', () => {
            console.log('ICE state peer2 closed');
            socketRef.current.off('signal');
        });

        connectionRef.current = peer2;
    };

    const answerCall = () => {
        setCallTime('00:00');
        setAmount(0);
        checkIfTabIsActive();
        document.title = 'In call';
        setShowSummary(false);
        setCallAccepted(true);
        setCallEnded(false);
        setOtherUser(call.from);
        setOtherUserUuid(call.fromUuid);
        otherUserUuidRef.current = call.fromUuid;
        setCallStatus('Connecting...');

        let data = {
            to: call.from,
            fromUuid: myUuidRef.current,
            from: mySocketIdRef.current,
            userName: name,
            md: call.maxDuration,
            type: 'both',
            myMediaStatus: [myMicStatusRef.current, myVideoStatusRef.current],
            callId: callIdRef.current
        };

        socketRef.current.emit('answerCall', data);

        initiatePeer2();

        socketRef.current.emit('callEvent', { to: call.from, fromUuid: myUuidRef.current, from: mySocketIdRef.current, type: 'accepted' });
    };

    const updateVideo = () => {
        if (myVideoInitialStatusRef.current) {
            setMyVdoStatus((currentStatus) => {
                if (otherUserSocketIdRef.current) {
                    socketRef.current.emit('updateMyMedia', {
                        callId: callIdRef.current,
                        to: otherUserSocketIdRef.current,
                        type: 'video',
                        currentMediaStatus: !currentStatus,
                        triggeredBySocketId: mySocketIdRef.current,
                        triggeredByUuid: myUuidRef.current
                    });
                }
                if (stream?.getVideoTracks().length > 0) {
                    stream.getVideoTracks()[0].enabled = !currentStatus;
                }
                myVideoStatusRef.current = !currentStatus;
                return !currentStatus;
            });
        } else {
            notifyMe('Camera not available', 'Please, connect camera first or allow permission');
        }
    };

    const updateMic = () => {
        if (myMicInitialStatusRef.current) {
            setMyMicStatus((currentStatus) => {
                socketRef.current.emit('updateMyMedia', {
                    callId: callIdRef.current,
                    to: otherUserSocketIdRef.current,
                    type: 'mic',
                    currentMediaStatus: !currentStatus,
                    triggeredBySocketId: mySocketIdRef.current,
                    triggeredByUuid: myUuidRef.current
                });
                if (stream?.getAudioTracks().length > 0) {
                    stream.getAudioTracks()[0].enabled = !currentStatus;
                }
                myMicStatusRef.current = !currentStatus;
                return !currentStatus;
            });
        } else {
            notifyMe('Microphone not available', 'Please, connect microphone first or allow permission');
        }
    };

    //SCREEN SHARING
    const handleScreenSharing = () => {
        if (!screenShare) {
            if (navigator.getDisplayMedia || navigator.mediaDevices.getDisplayMedia) {
                navigator.mediaDevices
                    .getDisplayMedia({ cursor: true, video: { displaySurface: 'monitor' } })
                    .then((currentStream) => {
                        try {
                            const screenTrack = currentStream.getTracks()[0];

                            let videoTrack = connectionRef.current.streams[0].getTracks().find((track) => track.kind === 'video');

                            if (videoTrack) {
                                connectionRef.current.replaceTrack(videoTrack, screenTrack, stream);
                            } else {
                                connectionRef.current.addTrack(screenTrack, stream);
                            }

                            socketRef.current.emit('updateMyMedia', {
                                callId: callIdRef.current,
                                to: otherUserSocketIdRef.current,
                                type: 'screenShare',
                                currentMediaStatus: true
                            });

                            // Listen click end
                            screenTrack.onended = () => {
                                if (videoTrack) {
                                    connectionRef.current.replaceTrack(screenTrack, videoTrack, stream);
                                } else {
                                    connectionRef.current.removeTrack(screenTrack, stream);
                                }

                                myVideo.current.srcObject = stream;
                                setScreenShare(false);

                                socketRef.current.emit('updateMyMedia', {
                                    callId: callIdRef.current,
                                    to: otherUserSocketIdRef.current,
                                    type: 'screenShare',
                                    currentMediaStatus: false
                                });
                            };

                            myVideo.current.srcObject = currentStream;
                            screenTrackRef.current = screenTrack;
                            setScreenShare(true);
                        } catch (error) {
                            console.log(error);
                            // alert("Screen sharing is not supported by your browser");
                        }
                    })
                    .catch((error) => {
                        console.log('No stream for sharing');
                    });
            } else {
                console.log('Screen sharing is not supported by your browser 2');
                // alert("Screen sharing is not supported by your browser");
            }
        } else {
            screenTrackRef.current.onended();
        }
    };

    //full screen
    const fullScreen = (e) => {
        const elem = e.target;

        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            /* Firefox */
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            /* Chrome, Safari & Opera */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            /* IE/Edge */
            elem.msRequestFullscreen();
        }
    };

    const leaveCall = (sendSocketSignals = true) => {
        setShowSummary(true);
        document.title = defaultTitle;
        connectionRef.current._pc.close();
        connectionRef.current.destroy();
        connectionRef.current = null;
        console.log('on leaveCall otherUserSocketIdRef.current', otherUserSocketIdRef.current);

        // Emiting socket signals if internet is available and vice versa
        if (sendSocketSignals) {
            socketRef.current.emit('endCall', {
                callId: callIdRef.current,
                otherUserSocketId: otherUserSocketIdRef.current,
                myUuid: myUuidRef.current,
                otherUserUuid: otherUserUuidRef.current
            });
            socketRef.current.emit('online', { id: mySocketIdRef.current });
        }
        otherUserSocketIdRef.current = null;
        otherUserUuidRef.current = null;
        setCallEnded(true);
        setCallDecline(true);
        setCallAccepted(false);
        setCallConnected(false);
        setCd('');
        stopTimer();
        setIsShown(false);
        chatRef.current = [];
        setChat([]);
        clearInterval(currentInterval.current);
        notifyMe('Call ended', 'Video call has been ended');
        inCallRef.current = false;
        callIdRef.current = null;
        myStatusRef.current = 'online';
        if (showSettingsModelRef.current) {
            showSettingsModelRef.current = false;
            setShowSettingsModel(false);
        }
    };

    const endingCall = () => {
        setShowSummary(true);
        document.title = defaultTitle;
        connectionRef.current._pc.close();
        connectionRef.current.destroy();
        connectionRef.current = null;
        socketRef.current.emit('online', { id: mySocketIdRef.current });
        otherUserSocketIdRef.current = null;
        otherUserUuidRef.current = null;
        setCallEnded(true);
        setCallDecline(true);
        setCallAccepted(false);
        setCallConnected(false);
        setIsShown(false);
        chatRef.current = [];
        setChat([]);
        clearInterval(currentInterval.current);
        notifyMe('Call ended', 'Video call has been ended');
        inCallRef.current = false;
        callIdRef.current = null;
        myStatusRef.current = 'online';
        setCd('');
        stopTimer();
        if (showSettingsModelRef.current) {
            showSettingsModelRef.current = false;
            setShowSettingsModel(false);
        }
    };

    const declineCall = (callStatus = null) => {
        document.title = defaultTitle;
        console.log('decline call otherUserSocketIdRef.current', otherUserSocketIdRef.current);
        if (otherUserStatusRef.current === 'online' || callRef.current?.isReceivingCall) {
            socketRef.current.emit('endCall', {
                callId: callIdRef.current,
                otherUserSocketId: otherUserSocketIdRef.current,
                cancel: 1,
                canceledByReceiver: callRef.current?.isReceivingCall
            });
        }
        socketRef.current.emit('online', { id: mySocketIdRef.current });
        otherUserSocketIdRef.current = null;
        otherUserUuidRef.current = null;
        if (callStatus) {
            setCallStatus(callStatus);
            setCallingTimeoutRef.current = setTimeout(() => {
                setCallStatus('');
                setCalling(false);
            }, 3000);
        } else {
            setCallStatus('');
            clearTimeout(setCallingTimeoutRef.current);
            setCalling(false);
        }
        clearTimeout(callDeclineTimeoutRef.current);
        setCallDecline(true);
        Audio.current.pause();
        if (inCallRef.current) {
            let call = { isReceivingCall: false, fromUuid: '', from: '', name: '', signal: '', maxDuration: '', maxCallTime: '' };
            setCall(call);
            callRef.current = call;
        }
        inCallRef.current = false;
        callIdRef.current = null;
        myStatusRef.current = 'online';
        stopTimer();
        if (showSettingsModelRef.current) {
            showSettingsModelRef.current = false;
            setShowSettingsModel(false);
        }
    };

    const sendMsg = (value, showFileSendingPreview = false, replaceIndex = -1, file = false, fileName = null, fileType = null) => {
        socketRef.current.emit('msgUser', {
            name,
            to: otherUserSocketIdRef.current,
            msg: file ? fileName : value,
            file,
            fileUrl: file ? value : '',
            fileType,
            sender: name,
            replaceIndex
        });
        let msg = {};
        msg.msg = file ? fileName : value;
        msg.file = file;
        msg.fileUrl = value;
        msg.fileType = fileType;
        msg.type = 'sent';
        msg.timestamp = Date.now();
        msg.sender = name;
        console.log('chat', chatRef.current);
        if (replaceIndex >= 0) {
            chatRef.current[replaceIndex] = msg;
        } else {
            chatRef.current = [...chatRef.current, msg];
        }
        setChat(chatRef.current);
        if (showFileSendingPreview) {
            replaceIndex = chatRef.current.length - 1;
            setIsShown(true);
        }
        return replaceIndex;
    };

    const scrollToBottomOfChat = () => {
        let element = document.getElementById('chat-messages');
        if (element) {
            element.scrollTop = element.scrollHeight;
        }
    };

    const downloadImage = (imageUrl, saveFileName) => {
        fetch(imageUrl)
            .then((response) => response.blob())
            .then((blob) => {
                // Create a blob URL for the image blob
                const blobUrl = window.URL.createObjectURL(blob);

                // Create an anchor element to trigger the download
                const link = document.createElement('a');
                link.href = blobUrl;
                link.download = saveFileName;

                // Trigger a click event on the anchor to start the download
                link.click();

                // Clean up the blob URL and the anchor element
                window.URL.revokeObjectURL(blobUrl);
            })
            .catch((error) => {
                console.error('Error downloading image:', error);
            });
    };

    useEffect(() => {
        if(calling || callAccepted || (call.isReceivingCall && !callAccepted && !callDecline)) {
            window.scrollTo(0, 0);
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.documentElement.style.overflow = 'visible';
        }
    }, [calling, call, callAccepted, callDecline]);

    return (
        <>
            {/* <audio src={CallingTune} loop ref={Audio} /> */}
            <audio loop ref={Audio} />
            <audio src={testAudio} ref={audioTesting} loop />
            <VideoCallContext.Provider
                value={{
                    socketRef,
                    call,
                    callAccepted,
                    callDecline,
                    setCallDecline,
                    myVideo,
                    userVideo,
                    stream,
                    name,
                    setName,
                    callEnded,
                    setCallEnded,
                    me,
                    mySocketIdRef,
                    callUser,
                    leaveCall,
                    answerCall,
                    sendMsg,
                    msgRcv,
                    chat,
                    setChat,
                    setMsgRcv,
                    setOtherUser,
                    endingCall,
                    userName,
                    myVdoStatus,
                    setMyVdoStatus,
                    userVdoStatus,
                    setUserVdoStatus,
                    otherUserScreenShareStatus,
                    updateVideo,
                    myMicStatus,
                    userMicStatus,
                    updateMic,
                    screenShare,
                    handleScreenSharing,
                    fullScreen,
                    Audio,
                    onlineUsers,
                    calling,
                    setCalling,
                    declineCall,
                    setCallStatus,
                    callStatus,
                    maxDuration,
                    setMaxDuration,
                    maxCallTime,
                    setMaxCallTime,
                    callTo,
                    myBluetoothStatus,
                    setMyBluetoothStatus,
                    maxDurationRef,
                    maxCallTimeRef,
                    callRef,
                    summary,
                    showSummary,
                    setShowSummary,
                    setCall,
                    pricePerMinute,
                    checkAudioVideoPermissions,
                    speakersDeviceIdRef,
                    callDeclineTimeoutRef,
                    otherUser,
                    activeStream,
                    otherUserName,
                    setOtherUserName,
                    scrollToBottomOfChat,
                    notifyMe,
                    isShown,
                    setIsShown,
                    setSinkIdofUserVideo,
                    testMicrophone,
                    analyserCanvas,
                    testAudioPlaying,
                    setTestAudioPlaying,
                    toggleTestAudio,
                    audioTesting,
                    otherUserSocketIdRef,
                    callConnected,
                    callTime,
                    amount,
                    startTimer,
                    stopCountDown,
                    countDown,
                    setCallTime,
                    setAmount,
                    otherUserSummary,
                    myVideoStatusRef,
                    myVideoInitialStatusRef,
                    myMicStatusRef,
                    myMicInitialStatusRef,
                    openPaymentAuthorizationModal,
                    setOpenPaymentAuthorizationModal,
                    paymentAuthorizationStatus,
                    setPaymentAuthorizationStatus,
                    paymentAuthorizationMessage,
                    setPaymentAuthorizationMessage,
                    callPrice,
                    setCallPrice,
                    cd,
                    setCd,
                    setMyMicStatus,
                    downloadImage,
                    refreshing,
                    setRefreshing,
                    chatRef,
                    showSettingsModel,
                    setShowSettingsModel,
                    showSettingsModelRef,
                    myStatusRef,
                    handleError,
                    cameraTesting,
                    audioDeviceIdRef,
                    videoDeviceIdRef,
                    speakerDeviceId,
                    microphoneDeviceId,
                    cameraDeviceId,
                    attachSinkId,
                    changeAudioDestination,
                    changeAudioDevice,
                    changeVideoDevice,
                    getMediaDevices
                }}
            >
                {children}
            </VideoCallContext.Provider>
        </>
    );
};

export default VideoCallContextProvider;
