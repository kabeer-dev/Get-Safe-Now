import React, { useState, useContext, useEffect, useRef } from 'react';
import { Button, message } from 'antd';
import './Options.css';
import VideoContext from '../../context/VideoContext';
import refresh from '../../assests/refresh.png';
import VideoIcon from '../../assests/icons/video.svg';
import VideoOff from '../../assests/icons/video-off.svg';
import testAudio from '../../assests/test-audio.wav';

import { PhoneOutlined } from '@ant-design/icons';
import AuthorizePayment from 'ui-component/Modals/AuthorizePayment';

const Options = () => {

    const cameraTesting = useRef();
    const audioDeviceIdRef = useRef();
    const videoDeviceIdRef = useRef();

    const speakerDeviceId = localStorage.getItem('speaker_device_id');
    const microphoneDeviceId = localStorage.getItem('microphone_device_id');
    const cameraDeviceId = localStorage.getItem('camera_device_id');

    const {
        name,
        call,
        callAccepted,
        stream,
        callEnded,
        mySocketIdRef,
        setOtherUser,
        onlineUsers,
        calling,
        setCalling,
        setCallEnded,
        maxDuration,
        setMaxDuration,
        setMaxCallTime,
        callTo,
        maxCallTimeRef,
        maxDurationRef,
        Audio,
        checkAudioVideoPermissions,
        getNotificationPermission,
        speakersDeviceIdRef,
        setOtherUserName,
        setCall,
        callRef,
        permissionsAsked,
        setSinkIdofUserVideo,
        userVideo,
        analyserCanvas,
        testAudioPlaying,
        toggleTestAudio,
        audioTesting,
        setCallTime,
        setAmount,
        openPaymentAuthorizationModal,
        setOpenPaymentAuthorizationModal,
        paymentAuthorizationStatus,
        setPaymentAuthorizationStatus,
        paymentAuthorizationMessage,
        setPaymentAuthorizationMessage,
        callPrice,
        setCallPrice,
        pricePerMinute,
        testMicrophone,
        otherUserSocketIdRef,
        notifyMe,
        socketRef,
        setCd,
        refreshing,
        setRefreshing
    } = useContext(VideoContext);
    
    const getUsers = onlineUsers.filter(user => user.status === 'online');

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

        const oldSpeakerSelector = document.getElementById('speakers');
        const oldMicrophoneSelector = document.getElementById('microphones');
        const oldCameraSelector = document.getElementById('cameras');

        const duringCallOldSpeakerSelector = document.getElementById('during-call-speakers');
        const duringCallOldMicrophoneSelector = document.getElementById('during-call-microphones');
        const duringCallOldCameraSelector = document.getElementById('during-call-cameras');

        const newSpeakerSelector = speakers.cloneNode(true);
        const duringCallNewSpeakerSelector = speakers.cloneNode(true);
        newSpeakerSelector.addEventListener('change', changeAudioDestination);
        duringCallNewSpeakerSelector.addEventListener('change', changeAudioDestination);
        oldSpeakerSelector.parentNode.replaceChild(newSpeakerSelector, oldSpeakerSelector);
        duringCallOldSpeakerSelector.parentNode.replaceChild(duringCallNewSpeakerSelector, duringCallOldSpeakerSelector);

        const newMicrophoneSelector = microphones.cloneNode(true);
        const duringCallNewMicrophoneSelector = microphones.cloneNode(true);
        newMicrophoneSelector.addEventListener('change', changeAudioDevice);
        duringCallNewMicrophoneSelector.addEventListener('change', changeAudioDevice);
        oldMicrophoneSelector.parentNode.replaceChild(newMicrophoneSelector, oldMicrophoneSelector);
        duringCallOldMicrophoneSelector.parentNode.replaceChild(duringCallNewMicrophoneSelector, duringCallOldMicrophoneSelector);

        const newCameraSelector = cameras.cloneNode(true);
        const duringCallNewCameraSelector = cameras.cloneNode(true);
        newCameraSelector.addEventListener('change', changeVideoDevice);
        duringCallNewCameraSelector.addEventListener('change', changeVideoDevice);
        oldCameraSelector.parentNode.replaceChild(newCameraSelector, oldCameraSelector);
        duringCallOldCameraSelector.parentNode.replaceChild(duringCallNewCameraSelector, duringCallOldCameraSelector);

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

        if (duringCallNewSpeakerSelector.options[selectedSpeakerIndex]) {
            duringCallNewSpeakerSelector.options[selectedSpeakerIndex].selected = true;
        }
        if (duringCallNewMicrophoneSelector.options[selectedMicrophoneIndex]) {
            duringCallNewMicrophoneSelector.options[selectedMicrophoneIndex].selected = true;
        }
        if (duringCallNewCameraSelector.options[selectedCameraIndex]) {
            duringCallNewCameraSelector.options[selectedCameraIndex].selected = true;
        }

        newSpeakerSelector.id = 'speakers';
        newMicrophoneSelector.id = 'microphones';
        newCameraSelector.id = 'cameras';

        duringCallNewSpeakerSelector.id = 'during-call-speakers';
        duringCallNewMicrophoneSelector.id = 'during-call-microphones';
        duringCallNewCameraSelector.id = 'during-call-cameras';
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
        document.getElementById(event.target.id === 'speakers' ? 'during-call-speakers' : 'speakers').options.selectedIndex =
            document.getElementById(event.target.id).options.selectedIndex;
    }

    function changeAudioDevice(event) {
        audioDeviceIdRef.current = event.target.value;
        checkAudioVideoPermissions(event.target.value, videoDeviceIdRef.current);
        localStorage.setItem('microphone_device_id', event.target.value);
        document.getElementById(event.target.id === 'microphones' ? 'during-call-microphones' : 'microphones').options.selectedIndex =
            document.getElementById(event.target.id).options.selectedIndex;
    }

    function changeVideoDevice(event) {
        videoDeviceIdRef.current = event.target.value;
        checkAudioVideoPermissions(audioDeviceIdRef.current, event.target.value);
        localStorage.setItem('camera_device_id', event.target.value);
        document.getElementById(event.target.id === 'cameras' ? 'during-call-cameras' : 'cameras').options.selectedIndex =
            document.getElementById(event.target.id).options.selectedIndex;
    }

    function handleError(error) {
        console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
    }

    function handleClose() {
        setOpenPaymentAuthorizationModal(false);
    }

    async function getMediaDevices() {
        await navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);
    }

    function refreshOnlineUsers() {
        if(!refreshing) {
            setRefreshing(true)
            socketRef.current.emit("refreshOnlineUsers")
        }
    }

    useEffect(() => {
        getNotificationPermission();
        checkAudioVideoPermissions();
        if (speakerDeviceId) {
            attachSinkId(Audio.current, speakerDeviceId);
            attachSinkId(audioTesting.current, speakerDeviceId);
            speakersDeviceIdRef.current = speakerDeviceId;
        }
    }, []);

    useEffect(() => {
        if (permissionsAsked) {
            getMediaDevices();
        }
    }, [permissionsAsked]);

    useEffect(() => {
        if (stream && stream.getAudioTracks().length !== 0) {
            testMicrophone();
        }
        cameraTesting.current.srcObject = stream;
    }, [stream]);

    useEffect(() => {
        if (call.isReceivingCall && !callAccepted) {
            setOtherUser(call.from);
        }
    }, [call]);

    let display = (callAccepted && !callEnded) || calling ? { display: 'none' } : { display: 'flex', justifyContent: 'space-between' };

    return (
        <>
            <div className="header">{name}</div>
            <div className="selectMediaDevices">
                <div style={{"flex": 1}}>
                    <div>Speaker</div>
                    <select name="" id="speakers" />
                    <div className="testBtns">
                        <audio src={testAudio} ref={audioTesting} loop />
                        <button onClick={toggleTestAudio} className={testAudioPlaying ? 'bgDanger' : 'bgSuccess'}>
                            {testAudioPlaying ? 'Stop speaker testing' : 'Test speaker'}
                        </button>
                    </div>
                </div>
                <div style={{"flex": 1}}>
                    <div>Microphone</div>
                    <select name="" id="microphones" />
                    <div className="testBtns">
                        <canvas ref={analyserCanvas} className="microphoneCanvas" />
                    </div>
                </div>
                <div style={{"flex": 1}}>
                    <div>Camera</div>
                    <select name="" id="cameras" />
                    <div className="testBtns">
                        <video muted autoPlay ref={cameraTesting} width="150" />
                    </div>
                    <div>
                        When you attach a new camera, you have to refresh the web page, in order to use newly attached camera
                    </div>
                </div>
            </div>
            <div className="options" style={display}>
                <div style={{ marginBottom: '0.5rem' }}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            borderBottom: '1px solid #e0e0e0',
                            padding: '10px',
                            marginBottom: '10px'
                        }}
                    >
                        <div style={{ paddingRight: '20px' }}>
                            <label>
                                <input
                                    type="radio"
                                    name="duration"
                                    value="1 min"
                                    checked={maxDuration === '0:30'}
                                    onClick={() => {
                                        setCallPrice((pricePerMinute * 1).toFixed(2));
                                        setMaxDuration('0:30');
                                        setMaxCallTime('1 minute');
                                        maxDurationRef.current = '0:30';
                                        maxCallTimeRef.current = '1 minute';
                                    }}
                                    onChange={() => {}}
                                />{' '}
                                1 Min
                            </label>
                        </div>
                        <div style={{ paddingRight: '20px' }}>
                            <label>
                                <input
                                    type="radio"
                                    name="duration"
                                    value="5 min"
                                    checked={maxDuration === '4:30'}
                                    onClick={() => {
                                        setCallPrice((pricePerMinute * 5).toFixed(2));
                                        setMaxDuration('4:30');
                                        setMaxCallTime('5 minutes');
                                        maxDurationRef.current = '4:30';
                                        maxCallTimeRef.current = '5 minutes';
                                    }}
                                    onChange={() => {}}
                                />{' '}
                                5 Min
                            </label>
                        </div>
                        <div style={{ paddingRight: '20px' }}>
                            <label>
                                <input
                                    type="radio"
                                    name="duration"
                                    value="1 hour"
                                    checked={maxDuration === '59:30'}
                                    onClick={() => {
                                        setCallPrice((pricePerMinute * 60).toFixed(2));
                                        setMaxDuration('59:30');
                                        setMaxCallTime('1 hour');
                                        maxDurationRef.current = '59:30';
                                        maxCallTimeRef.current = '1 hour';
                                    }}
                                    onChange={() => {}}
                                />{' '}
                                1 Hour
                            </label>
                        </div>
                        <div onClick={refreshOnlineUsers}>
                            {refreshing ? 
                                <div class="lds-hourglass"></div>
                            :
                                <img src={refresh} width={30} alt="Refresh" /> 
                            }
                        </div>
                        {/* <div>
                            <label>
                                <input
                                    type="radio"
                                    name="duration"
                                    value="Unlimited time"
                                    checked={maxDuration === '99999:59:30'}
                                    onClick={() => {
                                        setMaxDuration('99999:59:30');
                                        setMaxCallTime('Unlimited time');
                                        maxDurationRef.current = '99999:59:30';
                                        maxCallTimeRef.current = 'Unlimited time';
                                    }}
                                    onChange={() => {}}
                                />{' '}
                                Unlimited
                            </label>
                        </div> */}
                    </div>
                    {getUsers &&
                        getUsers.map((user, index) => {
                            if (user.socketId !== mySocketIdRef.current) {
                                return (
                                    <div key={index}>
                                        <div style={display}>
                                            <h3>{user.name}</h3>
                                            {user.cameraAvailable ? (
                                                <img src={VideoIcon} alt="video on icon" width={'15px'} />
                                            ) : (
                                                <img src={VideoOff} alt="video off icon" width={'15px'} />
                                            )}
                                            <div>
                                                <Button
                                                    type="primary"
                                                    icon={<PhoneOutlined />}
                                                    onClick={() => {
                                                        if (!stream) {
                                                            return notifyMe('Permissions required', 'Both camera and microphone are not available. Kindly enable them.');
                                                        }
                                                        
                                                        // setOpenPaymentAuthorizationModal(true);
                                                        // setPaymentAuthorizationStatus('processing');

                                                        // myAxios
                                                        //     .post('payment/authorize', {
                                                        //         price: callPrice
                                                        //     })
                                                        //     .then((res) => {
                                                        //         setOpenPaymentAuthorizationModal(false);
                                                                setOtherUserName(user.name);
                                                                callTo(user.socketId);
                                                                setCallEnded(false);
                                                                setCalling(true);
                                                                otherUserSocketIdRef.current = user.socketId;
                                                                setCallTime('00:00');
                                                                setAmount(0);
                                                                let call = {
                                                                    isReceivingCall: false,
                                                                    fromUuid: '',
                                                                    from: '',
                                                                    name: '',
                                                                    signal: '',
                                                                    maxDuration: '',
                                                                    maxCallTime: ''
                                                                };
                                                                setCall(call);
                                                                callRef.current = call;
                                                                setCd("");
                                                    //         })
                                                    //         .catch((error) => {
                                                    //             setPaymentAuthorizationStatus('error');
                                                    //             setPaymentAuthorizationMessage(error.response.data.message || error.message);
                                                    //         });
                                                    }}
                                                    className="btn"
                                                    tabIndex="0"
                                                >
                                                    Call
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                        })}

                    <AuthorizePayment
                        open={openPaymentAuthorizationModal}
                        onClose={handleClose}
                        callPrice={callPrice}
                        paymentAuthorizationStatus={paymentAuthorizationStatus}
                        paymentAuthorizationMessage={paymentAuthorizationMessage}
                    />
                </div>
            </div>
        </>
    );
};

export default Options;
