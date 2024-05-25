import React, { useState, useContext, useEffect, useRef } from 'react';
import { Button, message } from 'antd';
import './OnlineUsers.css';
import VideoCallContext from '../../context/VideoCallContext';
import refresh from '../../assests/refresh.png';
import VideoIcon from '../../assests/icons/video.svg';
import VideoOff from '../../assests/icons/video-off.svg';

import { PhoneOutlined } from '@ant-design/icons';
import AuthorizePayment from 'ui-component/Modals/AuthorizePayment';

const OnlineUsers = () => {

    const {
        name,
        callAccepted,
        stream,
        callEnded,
        mySocketIdRef,
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
        setOtherUserName,
        setCall,
        callRef,
        analyserCanvas,
        testAudioPlaying,
        toggleTestAudio,
        setCallTime,
        setAmount,
        openPaymentAuthorizationModal,
        setOpenPaymentAuthorizationModal,
        paymentAuthorizationStatus,
        paymentAuthorizationMessage,
        callPrice,
        setCallPrice,
        pricePerMinute,
        testMicrophone,
        otherUserSocketIdRef,
        notifyMe,
        socketRef,
        setCd,
        refreshing,
        setRefreshing,
        cameraTesting,
        getMediaDevices
    } = useContext(VideoCallContext);

    const getUsers = onlineUsers.filter(user => user.status === 'online');


    function handleClose() {
        setOpenPaymentAuthorizationModal(false);
    }

    function refreshOnlineUsers() {
        if(!refreshing) {
            setRefreshing(true)
            socketRef.current.emit("refreshOnlineUsers")
        }
    }

    useEffect(() => {
        getMediaDevices();
    }, []);

    useEffect(() => {
        if (stream && stream.getAudioTracks().length !== 0) {
            testMicrophone();
        }
        cameraTesting.current.srcObject = stream;
    }, [stream]);

    let display = (callAccepted && !callEnded) || calling ? { display: 'none' } : { display: 'flex', justifyContent: 'space-between' };

    return (
        <div className="onlineUsersContainer">
            <div className="header">{name}</div>
            <div className="selectMediaDevices">
                <div style={{"flex": 1}}>
                    <div>Speaker</div>
                    <select name="" id="speakers" />
                    <div className="testBtns">
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
        </div>
    );
};

export default OnlineUsers;
