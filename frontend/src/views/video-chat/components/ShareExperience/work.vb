' import React, { useContext, useEffect, useState, useRef } from "react";
' import VideoContext from "../../context/VideoContext";
' import "./Video.css";
' import { Card, Modal, Button, Input, notification, Avatar } from "antd";
' import Man from "../../assests/man.svg";
' import VideoIcon from "../../assests/icons/video.svg";
' import Mic from "../../assests/icons/mic.svg";
' import MicOff from "../../assests/icons/mic-off.svg";
' import Speaker from "../../assests/icons/speaker.svg";
' import SpeakerOff from "../../assests/icons/speaker-off.svg";
' import { io } from "socket.io-client";
' import VideoOff from "../../assests/icons/video-off.svg";
' // import Profile from "../../assests/profile.svg";
' import Msg_Illus from "../../assests/msg_illus.svg";
' import Msg from "../../assests/icons/chat.svg";
' import PaperClip from "../../assests/icons/attachment.svg";
' import ScreenShare from "../../assests/icons/screen.svg";
' import { UserOutlined, MessageOutlined } from "@ant-design/icons";
' import Timer from "time-counter";
' import * as classes from "../options/Options.module.css";
' import Hang from "../../assests/icons/call.svg";
' import { socket } from "../../context/VideoState";
' import parse from "html-react-parser";
' import Wave from "../../assests/wave3.svg";

' import * as filestack from "filestack-js";
' const client = filestack.init("ALQeyzXAxTv6MbAdyFxNfz");

' const countUpTimer = new Timer();
' var countDown = new Timer({
'   direction: "down",
'   startValue: "0:30", // one minute
' });
' // const socket = io()
' const { Search } = Input;
' const Video = () => {
'   const {
'     call,
'     callAccepted,
'     myVideo,
'     userVideo,
'     stream,
'     name,
'     setName,
'     callEnded,
'     me,
'     callUser,
'     leaveCall,
'     otherUser,
'     answerCall,
'     sendMsg: sendMsgFunc,
'     msgRcv,
'     chat,
'     setChat,
'     userName,
'     myVdoStatus,
'     screenShare,
'     fullScreen,
'     handleScreenSharing,
'     userVdoStatus,
'     updateVideo,
'     myMicStatus,
'     userMicStatus,
'     updateMic,
'     leaveCall1,
'     calling,
'     setCalling,
'     Audio,
'     setCallDecline,
'     leaveCall2,
'     showTime,
'     setShowTime,
'     setCallStatus,
'     callStatus,
'     maxDuration,
'     setMaxDuration,
'     callDecline,
'     maxCallTime,
'     setMaxCallTime,
'     available,
'     setAvailable,
'     setCall,
'   } = useContext(VideoContext);

'   const [sendMsg, setSendMsg] = useState("");
'   const [isModalVisible, setIsModalVisible] = useState(false);
'   const [callTime, setCallTime] = useState("");
'   const [amount, setAmount] = useState(0);
'   const [price, setPrice] = useState(2);
'   const [myCall, setMyCall] = useState(false);
'   const [mute, setMute] = useState(false);
'   const [cd, setCd] = useState("");
'   const [videoMe, setVideoMe] = useState('video-me');
'   const [videoYou, setVideoYou] = useState('video-you');
'   const Attachment = useRef(null);



'   const startTimer = (md) => {
'     stopTimer();
'     setCallTime("");
'     setAmount(0);
'     let sec = 0;
'     countUpTimer.on("change", (val) => {
'       // setTimer(val);
'       setCallTime(val);
'       if (val === "1:00" || val === "01:00") {
'         // alert("You have 1 minute completed in the call");
'       }
'       var time = val.split(":");
'       var minutes = time[0];
'       // console.log(minutes);
'       // if(minutes>=1) {
'       sec++;
'       let p = price / 60;
'       setAmount(sec * p);
'       if (val === md || val === `0${md}`) {
'         countDown.start();
'       }
'       // }
'     });
'     countUpTimer.start();
'   };

'   const stopTimer = () => {
'     countUpTimer.stop();
'   };


'   socket.on("callEvent", ({ data }) => {
'     switch (data.type) {
'       case "endCall":
'         stopTimer();
'         setCallStatus("Call Ended");
'         break;
'       case "declined":
'         setCallStatus("");
'         break;

'       default:
'         setCallStatus("");
'         break;
'     }
'   });

'   socket.on("msgRcv", ({ name, msg: value, sender }) => {
'     let msg = {};
'     msg.msg = value;
'     msg.type = "rcv";
'     msg.sender = sender;
'     msg.timestamp = Date.now();
'     setChat([...chat, msg]);
'   });

'   socket.on("callAccepted", ({ signal, userName, md }) => {
'     // alert('ok');
'     setAvailable(false);
'     setCalling(false);
'     stopTimer();
'     startTimer(md);
'     setShowTime(true);
'     // alert('ok');
'   });

'   socket.on("callEvent", ({ data }) => {
'     switch (data.type) {
'       case "endCall":
'         setAvailable(true);
'         stopTimer();
'         break;

'       default:
'         break;
'     }
'   });

'   socket.on("callAcceptedFromMe", ({ signal, userName, md }) => {
'     setAvailable(false);
'     startTimer(md);
'     setShowTime(true);
'     // alert('ok');
'   });

'   const dummy = useRef();

'   useEffect(() => {
'     countDown.on("change", (val) => {
'       console.log("cd", val);
'       setCd(val);
'       if (val === "0:00") {
'         setCallStatus("Call Ended");
'         leaveCall1();
'         leaveCall();
'         stopTimer();
'       }
'     });
'     // startTimer();




'     /* if(userVdoStatus) {
'       startTimer();
'     } */



'     socket.on("endCall", ({ data }) => {
'       // alert('ok');
'       // console.log("d", data.cancel);
'       stopTimer();
'       if (data.cancel !== 1) {
'         // alert('ok');
'         leaveCall();
'         setAvailable(true);
'         // window.location.reload();
'       } else {
'         setAvailable(true);
'         setCalling(false);
'         setCallDecline(true);
'         Audio.current.pause();
'       }
'     });

'     // if(callAccepted) { startTimer(); }
'     if (dummy?.current) { dummy.current.scrollIntoView({ behavior: "smooth" }) };
'   }, [chat]);

'   const showModal = (showVal) => {
'     setIsModalVisible(showVal);
'   };

'   const onSearch = (value) => {
'     if (value && value.length) sendMsgFunc(value);
'     setSendMsg("");
'   };

'   useEffect(() => {
'     if (msgRcv.value && !isModalVisible) {
'       notification.open({
'         message: "",
'         description: `${msgRcv.sender}: ${msgRcv.value}`,
'         icon: <MessageOutlined style={{ color: "#108ee9" }} />,
'       });
'     }
'   }, [msgRcv]);

'   let cdisplay = (calling || callAccepted || (call.isReceivingCall && !callAccepted && !callDecline)) ? { textAlign: "center" } : { display: 'none', textAlign: "center" };

'   let d1 = (calling || (call.isReceivingCall && !callAccepted && !callDecline)) ? 'flex' : 'none';

'   return (
'     <>




'       <div style={{ position: 'absolute', top: '0px', width: '100%', height: '100%', background: '#1A7E19', left: '0px', justifyContent: 'space-between', flexDirection: 'column', zIndex: '1', display: d1 }}>
'         <div style={{ minHeight: '100px', background: '#8BF88A', borderBottom: '2px solid #0FE90D', textAlign: 'center', padding: '0.4rem' }}>
'           <div><a>{(calling) ? `Call to: ${name}` : `Caller: ${call.name}`}</a></div>
'           <div>Requesting Service:</div>
'           <div><a>New York Travel is required this</a></div>
'           <div>USD <a>{price.toFixed(2)}/min</a></div>
'           <div>Call can last up to {(calling) ? maxCallTime : call.maxCallTime}</div>
'           <div>Payment receive method: PayPal ab@abc.com</div>
'         </div>




'         <div className="video-avatar-container">
'           <video
'             playsInline
'             ref={userVideo}
'             onClick={() => {/* fullScreen(); */ }}
'             autoPlay
'             muted={mute}
'             className="video-active"
'             style={{
'               opacity: `${userVdoStatus ? "1" : "0"}`,
'             }}
'           />

'           <Avatar
'             style={{
'               backgroundColor: "#116",
'               position: "absolute",
'               opacity: `${userVdoStatus ? "-1" : "2"}`,
'             }}
'             size={98}
'             icon={!(userName || call.name) && <UserOutlined />}
'           >
'             {userName || call.name}
'           </Avatar>
'         </div>






'         <div style={{ width: '100%', height: '100px', background: '#A2EE50', borderTop: '4px solid #CFF8CF', display: 'flex', alignItems: 'center' }}>
'           <div className="iconsDiv" style={{ background: '#00000000', justifyContent: 'space-between' }}>
'             <div
'               className="icons"
'               style={{ backgroundColor: "#ff0000" }}
'               onClick={() => {
'                 // stopTimer();
'                 leaveCall2();
'               }}
'             >
'               <img src={Hang} alt="Decline Call" style={{ width: '26px', height: '26px' }} />
'             </div>

'             <div className="icons" onClick={() => updateVideo()} tabIndex="0">
'               {myVdoStatus ? (
'                 <img src={VideoIcon} alt="video on icon" style={{ width: '26px', height: '26px' }} />
'               ) : (
'                 <img src={VideoOff} alt="video off icon" style={{ width: '26px', height: '26px' }} />
'               )}
'             </div>

'             <div
'               className="icons"
'               onClick={() => {
'                 updateMic();
'               }}
'               tabIndex="0"
'             >
'               {myMicStatus ? (
'                 <img src={Mic} alt="mic on icon" style={{ width: '28px', height: '28px' }} />
'               ) : (
'                 <img src={MicOff} alt="mic off icon" style={{ width: '28px', height: '28px' }} />
'               )}
'               {/* <i
'                   className={`fa fa-microphone${myMicStatus ? "" : "-slash"}`}
'                   style={{ transform: "scale(1.5)", paddingLeft: '2px', }}
'                   aria-label={`${myMicStatus ? "mic on" : "mic off"}`}
'                   aria-hidden="true"
'                 ></i> */}
'             </div>

'             {(calling) ? <></> : <div
'               className="icons"
'               style={{ backgroundColor: "#0FE90D" }}
'               onClick={() => {
'                 // status to busy
'                 socket.emit("busy", {
'                   id: me
'                 });

'                 answerCall();
'                 setCallDecline(true);
'                 setMaxCallTime(call.maxCallTime);
'                 setMaxDuration(call.maxDuration);
'                 Audio.current.pause();
'               }}
'             >
'               <img src={Hang} alt="Accept Call" style={{ width: '26px', height: '26px' }} />
'             </div>}

'           </div>

'         </div>
'       </div>






'       <div className="text-center">
'         {stream ? (
'           <div
'             style={cdisplay}
'             className={`me ${videoMe}`}
'             id={callAccepted && !callEnded ? "video1" : "video3"}
'             onClick={() => {
'               if (videoMe === "video-me") {
'                 setVideoMe('video-you');
'                 setVideoYou('video-me');
'               }
'             }}
'           >
'             {/* <div style={{ height: "2rem" }}>
'             <h3>{myVdoStatus &&  "You"} {callTime} {amount>0?`$${amount.toFixed(2)}`:''} {cd} </h3>
'           </div> */}
'             <div className="video-avatar-container">
'               <video
'                 playsInline
'                 muted
'                 onClick={() => {/* fullScreen(); */ }}
'                 ref={myVideo}
'                 autoPlay
'                 className="video-active"
'                 style={{
'                   opacity: `${myVdoStatus ? "1" : "0"}`,
'                 }}
'               />

'               <Avatar
'                 style={{
'                   backgroundColor: "#116",
'                   position: "absolute",
'                   opacity: `${myVdoStatus ? "-1" : "2"}`,
'                 }}
'                 size={98}
'                 icon={!name && <UserOutlined />}
'               >
'                 {name}
'               </Avatar>
'             </div>
'           </div>
'         ) : (
'           <>
'             <div className="bouncing-loader">
'               <div></div>
'               <div></div>
'               <div></div>
'             </div>
'             <div>Searching for camera...</div>
'           </>
'         )}


'         {(showTime || calling || (callAccepted && !callEnded && userVideo)) && (
'           <>
'             <div style={{ position: 'absolute', width: '100%', zIndex: '99', top: '10px', textAlign: 'center' }}>
'               <div style={{ flexDirection: 'row' }}>
'                 <div>
'                   <img src={Mic} alt="mic on icon" style={{ width: '28px', height: '28px' }} />
'                 </div>
'                 <div style={{ display: 'flex', justifyContent: 'center', width: '100%', }}>
'                   {callAccepted && <div style={{ color: '#FFF', textAlign: 'center', fontSize: '16px', backgroundColor: '#00000077', padding: '2px 18px', border: '1px solid #FFF', borderRadius: '5px', }}>{call.name ? 'Caller: ' + call.name : 'Helper: ' + userName}</div>}
'                 </div>
'               </div>
'               <div style={{ color: '#FFF', fontSize: '12px', fontWeight: '300', marginTop: '8px', }}>
'                 <span style={{ backgroundColor: '#00000077', padding: '5px 20px', border: '1px solid #FFF', borderRadius: '5px', }}>Alex Hales Alex Hales Alex Hal</span>
'               </div>
'               <div style={{ color: '#FFF', fontSize: '12px', fontWeight: '300', marginTop: '10px', }}>
'                 {callAccepted && <span style={{ backgroundColor: '#00000077', padding: '5px 20px', border: '1px solid #FFF', borderRadius: '5px', }}>{callTime !== '' ? `New York Travel aaaaaaaaaaaa` : ' '} </span>}
'                 {/* ${price.toFixed(2)}/ */}
'               </div>
'               {callAccepted && <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '10px', }}>
'                 <div>
'                   <span style={{ color: '#FFF', backgroundColor: '#00000077', padding: '5px 20px', border: '1px solid #FFF', borderRadius: '5px', }}> {amount > 0 ? 'Talk time' : ''} {callTime} {amount > 0 ? `Total amount: USD ${amount.toFixed(2)}` : ''} {cd} </span>
'                 </div>
'               </div>}
'               <div style={{ color: '#FFF', fontSize: '12px', fontWeight: '300', marginTop: '10px', }}>
'                 <span style={{ backgroundColor: '#00000077', padding: '5px 20px', border: '1px solid #FFF', borderRadius: '5px', }}>USD 2.00/min</span>
'               </div>
'             </div>

'             {(cd !== "" && cd !== "0:00") ? <div style={{ position: 'absolute', top: '50%', left: '40%', color: '#FFF', zIndex: 999, fontSize: '34px', color: '#00b500', padding: '5px', borderRadius: '10px', backgroundColor: 'rgba(0,0,0,0.5)', margin: 'auto', display: 'flex', justifyContent: 'center', }}>{cd}</div> : ''}

'             {(callStatus !== "") && <div style={{ position: 'absolute', top: '50%', left: '0', right: '0', color: '#FFF', zIndex: 999, fontSize: '34px', color: '#00b500', padding: '5px', borderRadius: '10px', backgroundColor: 'rgba(0,0,0,0.5)', margin: 'auto', display: 'flex', justifyContent: 'center', }}>{callStatus}</div>}

'             <div className={`you ${videoYou}`} style={{ textAlign: "center" }} id="video2" onClick={() => {
'               if (videoYou === "video-me") {
'                 setVideoYou('video-you');
'                 setVideoMe('video-me');
'               }
'             }}>

'               <div className="video-avatar-container">
'                 <video
'                   playsInline
'                   ref={userVideo}
'                   onClick={() => {/* fullScreen(); */ }}
'                   autoPlay
'                   muted={mute}
'                   className="video-active"
'                   style={{
'                     opacity: `${userVdoStatus ? "1" : "0"}`,
'                   }}
'                 />

'                 <Avatar
'                   style={{
'                     backgroundColor: "#116",
'                     position: "absolute",
'                     opacity: `${userVdoStatus ? "-1" : "2"}`,
'                   }}
'                   size={98}
'                   icon={!(userName || call.name) && <UserOutlined />}
'                 >
'                   {userName || call.name}
'                 </Avatar>
'                 {!userMicStatus && (
'                   <i
'                     style={{
'                       position: "absolute",
'                       top: "0",
'                       left: "0",
'                       padding: "0.3rem",
'                       backgroundColor: "#fefefebf",
'                     }}
'                     className="fad fa-volume-mute fa-2x"
'                     aria-hidden="true"
'                     aria-label="microphone muted"
'                   ></i>
'                 )}
'               </div>
'               <div>
'                 {/* <Button
'               variant="contained"
'               onClick={leaveCall}
'               className={classes.hang}
'               tabIndex="0"
'             >
'               <img
'                 src={Hang}
'                 alt="hang up"
'                 style={{ height: "15px" }}
'               />
'               &nbsp; Hang up
'             </Button> */}
'               </div>
'             </div>
'           </>
'         )}

'         {(showTime || calling || (callAccepted && !callEnded && userVideo)) && (
'           <div className="bottom-icons">
'             {/* <div className="top-wave">
'             <img src={Wave} style={{ width: "100%" }} />
'           </div> */}
'             <div>
'               <div className="iconsDiv2" style={{ backgroundColor: '#00000077' }}>

'                 <div
'                   className="icons2"
'                   onClick={() => {
'                     updateMic();
'                   }}
'                   tabIndex="0"
'                 >
'                   {myMicStatus ? (
'                     <img src={Mic} alt="mic on icon" />
'                   ) : (
'                     <img src={MicOff} alt="mic off icon" />
'                   )}
'                   {/* <i
'                   className={`fa fa-microphone${myMicStatus ? "" : "-slash"}`}
'                   style={{ transform: "scaleX(-1)" }}
'                   aria-label={`${myMicStatus ? "mic on" : "mic off"}`}
'                   aria-hidden="true"
'                 ></i> */}
'                 </div>

'                 <div className="icons2" onClick={() => updateVideo()} tabIndex="0">
'                   {myVdoStatus ? (
'                     <img src={VideoIcon} alt="video on icon" />
'                   ) : (
'                     <img src={VideoOff} alt="video off icon" />
'                   )}
'                 </div>



'                 <div
'                   className="icons2"
'                   onClick={() => {
'                     setMute(!mute);
'                   }}
'                   tabIndex="0"
'                 >
'                   {!mute ? (
'                     <img src={Speaker} alt="Mute" />
'                   ) : (
'                     <img src={SpeakerOff} alt="Unmute" />
'                   )}
'                 </div>




'                 <div
'                   className="icons2"
'                   style={{ backgroundColor: "#ff0000", color: '#FFF', }}
'                   onClick={() => {
'                     stopTimer();
'                     if (calling && !callAccepted) {
'                       leaveCall2();
'                       setShowTime(false);
'                     } else {
'                       setShowTime(false);
'                       leaveCall();
'                       // window.location.reload();
'                     }
'                   }}
'                 >
'                   <img src={Hang} style={{ filter: 'invert(1)' }} alt="End Call" />
'                 </div>






'                 <div
'                   className="icons2"
'                   onClick={() => {
'                     if (callAccepted && !callEnded) {
'                       setIsModalVisible(!isModalVisible);
'                     }
'                   }}
'                   tabIndex="0"
'                 >
'                   <img src={Msg} alt="chat icon" />
'                 </div>
'                 <Modal
'                   title="Chat"
'                   footer={null}
'                   visible={isModalVisible}
'                   onOk={() => showModal(false)}
'                   onCancel={() => showModal(false)}
'                   style={{ maxHeight: "100px" }}
'                 >
'                   {chat.length ? (
'                     <div className="msg_flex">
'                       {chat.map((msg) => (
'                         <div
'                           className={msg.type === "sent" ? "msg_sent" : "msg_rcv"}
'                         >
'                           {parse(msg.msg)}
'                         </div>
'                       ))}
'                       <div ref={dummy} id="no_border"></div>
'                     </div>
'                   ) : (
'                     <div className="chat_img_div">
'                       <img
'                         src={Msg_Illus}
'                         alt="msg_illus"
'                         className="img_illus"
'                       />
'                     </div>
'                   )}
'                   <Search
'                     placeholder="your message"
'                     allowClear
'                     className="input_msg"
'                     enterButton="Send"
'                     onChange={(e) => setSendMsg(e.target.value)}
'                     value={sendMsg}
'                     size="large"
'                     onSearch={onSearch}
'                   />
'                   {/* <a
'                   style={{
'                     position: "absolute",
'                     bottom: "30px",
'                     right: "110px",
'                     cursor: "pointer",
'                   }}
'                 >
'                   <i
'                     style={{ fontSize: "24px", color: "#999" }}
'                     onClick={() => {
'                       Attachment.current.click();
'                     }}
'                     className="fa fa-files-o"
'                     aria-hidden="true"
'                   ></i>
                  
'                 </a> */}
'                 </Modal>



'                 <div
'                   className="icons2"
'                   onClick={() => {
'                     if (callAccepted && !callEnded) {
'                       handleScreenSharing();
'                     }
'                   }}
'                   tabIndex="0"
'                 >
'                   <img src={ScreenShare} alt="share screen" />
'                 </div>





'                 <div className="icons2" onClick={() => Attachment.current.click()} tabIndex="0">
'                   <img src={PaperClip} alt="Send File" />
'                   <input
'                     style={{ display: "none" }}
'                     type={"file"}
'                     ref={Attachment}
'                     onChange={async (e) => {
'                       if (e.target.files[0]) {
'                         // sendFile(e.target.files[0]);
'                         // let file = e.target.files[0];
'                         // console.log("file",file.name);
'                         client.upload(e.target.files[0]).then((data) => {
'                           let url = data.url;
'                           let fileName = data.filename;
'                           sendMsgFunc(
'                             `<a href="${data.url}" target="_blank">${data.filename}</a>`
'                           );
'                           console.log(data.url);
'                           // alert(data.url);
'                         });
'                       }
'                     }}
'                   />
'                 </div>


'               </div>
'               {/* <div className="iconsDiv">
              
'               <div
'                 style={{
'                   whiteSpace: "nowrap",
'                   color: "#FFF",
'                   fontSize: "16px",
'                   width: "160px",
'                 }}
'               >
'                 <div
'                   style={{
'                     whiteSpace: "nowrap",
'                     color: "#FFF",
'                     fontSize: "16px",
'                     borderBottom: "4px solid #FFF",
'                     textAlign: "center",
'                     paddingBottom: "8px",
'                   }}
'                 >
'                   New York Travel
'                 </div>
'               </div>
                
'             </div> */}
'             </div>
'           </div>
'         )}
'       </div>
'     </>
'   );
' };

' export default Video;


















            '   {/* caht section start */}
            '   {isShown && (
            '     <div className="chatSection" >
            '       <div style={{display:'flex', color: 'red' }}>HelpSoEasy Inbox</div>
            '       <div>
            '         {chat.length ? (
            '           <div className="msg_flex">
            '             {chat.map((msg) => (
            '               <div
            '                 className={msg.type === "sent" ? "msg_sent" : "msg_rcv"}
            '               >
            '                 {parse(msg.msg)}
            '               </div>
            '             ))}
            '             {/* <div ref={dummy} id="no_border">Ali Hussain</div> */}
            '           </div>
            '         ) : (
            '           <div >
            '             {/* <img
            '             src={Msg_Illus}
            '             alt="msg_illus"
            '             className="img_illus"   className="chat_img_div"
            '           /> */}
            '           </div>

            '         )}

            '         <Search
            '           placeholder="your message"
            '           allowClear
            '           className="input_msg"
            '           enterButton={<img src={Sendicon} alt="icon" style={{ width: '20px', height: '20px' }} />}
            '           onChange={(e) => setSendMsg(e.target.value)}
            '           value={sendMsg}
            '           size="large"
            '           onSearch={onSearch}
            '         />
            '       </div>
            '     </div>
            '   )}
            ' </div>}
            ' {/* caht section end */}