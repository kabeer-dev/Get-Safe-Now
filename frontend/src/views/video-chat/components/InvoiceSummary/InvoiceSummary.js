import React, { useContext, useEffect, useState, useRef } from "react";
import VideoContext from "../../context/VideoContext";
import "./InvoiceSummary.css";
import men from "../../assests/icons/men.png";
import women from "../../assests/icons/profilewomen.png";

const InvoiceSummary = () => {
  
  const { 
    pricePerMinute,
    summary, 
    showSummary, 
    call,
    otherUserName,
    otherUserSummary,
    name
  } = useContext(VideoContext);

  const getStartTime = (summary) => {
    var date = new Date(parseInt(summary.callStartingTime));
    if(date == "Invalid Date"){
      return 'N/A'
    } else {
      return date.toLocaleDateString()+' '+date.toLocaleTimeString();
    }
  }

  const getDuration = (timeStampDifference) => {
    if(timeStampDifference > 0){
      var difference = timeStampDifference;
      var hoursDifference = Math.floor(difference/1000/60/60);
      difference -= hoursDifference*1000*60*60
      var minutesDifference = Math.floor(difference/1000/60);
      difference -= minutesDifference*1000*60
      var secondsDifference = Math.floor(difference/1000);
      return String(hoursDifference).padStart(2, '0')+":"+String(minutesDifference).padStart(2, '0')+":"+String(secondsDifference).padStart(2, '0')
    }else{
      return '00:00:00'
    }
    
  }

  const getTotalPrice = (summary) => {
    var difference = summary.callEndingTime - summary.callStartingTime;
    var totalSeconds = Math.floor(difference/1000);
    var totalPrice = totalSeconds * pricePerMinute/60
    return totalPrice.toFixed(2)
  }

  const continueToHomeScreen = () => {
    window.location.reload();
  }

  const getCallDuration = (summary) => {
    return getDuration(summary.callEndingTime - summary.callStartingTime);
  }

  const convertTimeStamp = (timeStamp) => {
    var date = new Date(timeStamp);
    return date.toLocaleTimeString();
  }

  const getActiveTimesDifference = (stats) => {
    let totalDifference = 0
    let startingTimeStamp = 0
    stats.forEach((stat,index)=>{
      if(stat.title === 'On'){
        startingTimeStamp = stat.time
        if(index === stats.length - 1){
          totalDifference += summary.callEndingTime - startingTimeStamp
        }
      }
      if(stat.title === 'Off'){
        if(startingTimeStamp){
          totalDifference += stat.time - startingTimeStamp
          startingTimeStamp = 0
        }
      }
    }) 
    return totalDifference
  }

  const getActiveInactiveTimes = (summary, state, device) => {
    if(device === 'mic') {
      let micActiveTimeDifference = getActiveTimesDifference(summary.micStats?.toggles);
      if(state === 'active') {
        return getDuration(micActiveTimeDifference);
      } else {
        return getDuration((summary.callEndingTime - summary.callStartingTime) - micActiveTimeDifference);
      }
    }
    if(device === 'video') {
      let videoActiveTimeDifference = getActiveTimesDifference(summary.videoStats?.toggles);
      if(state === 'active') {
        return getDuration(videoActiveTimeDifference);
      } else {
        return getDuration((summary.callEndingTime - summary.callStartingTime) - videoActiveTimeDifference);
      }
    }
  }

  return (
    <>
      {showSummary &&
        <div className="maincontent">
          <div className="contentborder">
            <div className="column_border">
              <div className="contentstyle1">
                <div>
                  <div className="text_font_size" style={{ marginLeft: '15px', color: '#000000', fontSize: '22px' }} >Call Ended</div>
                  <div className="text_font_size" style={{ marginLeft: '22px', color: '#000000', fontSize: '22px', marginTop: '20px' }}>{call.name ? `Buyer: ${call.name}` : `Helper: ${otherUserName}`}</div>
                  <div className="text_font_size1" style={{ marginLeft: '22px', color: '#000000', fontSize: '28px', fontWeight: 'bold', marginTop: '5px' }}>{call.name ? call.name : otherUserName}</div>
                </div>
                <div ><img className="Image_size" src={call.name ? women : men} alt="profile-pic" style={{ width: '500px', height: '500px', marginLeft: '18px', marginTop: '30px' }} /></div>
              </div>
              <div className="contentstyle">
                <div className="column">
                  <div className="font_size_text" style={{ color: '#000000', fontSize: '20px', }}>{call.name ?  `Helper` : `Buyer`}</div>
                  <div className="font_size_text" style={{ color: '#02B100', fontSize: '20px', }}>{name}</div>
                </div>
                <hr className="hr_bottom"></hr>
                <div className="column">
                  <div className="font_size_text" style={{ color: '#000000', fontSize: '20px', }}>Service</div>
                  <div className="font_size_text" style={{ color: '#02B100', fontSize: '20px', }}>New York travel service</div>
                </div>
                <hr className="hr_bottom"></hr>
                <div className="column">
                  <div className="font_size_text" style={{ color: '#000000', fontSize: '20px', }}>Rate</div>
                  <div className="font_size_text" style={{ color: '#02B100', fontSize: '20px', }}>USD {pricePerMinute.toFixed(2)}/min</div>
                </div>
                <hr className="hr_bottom"></hr>
                <div className="column">
                  <div className="font_size_text" style={{ color: '#000000', fontSize: '20px', }}>Start</div>
                  <div className="font_size_text" style={{ color: '#02B100', fontSize: '20px', }}>{summary ? getStartTime(summary) : '...'}</div>
                </div>
                <hr className="hr_bottom"></hr>
                <div className="column">
                  <div className="font_size_text" style={{ color: '#000000', fontSize: '20px', }}>Duration</div>
                  <div className="font_size_text" style={{ color: '#02B100', fontSize: '20px', }}>{summary ? getCallDuration(summary) : '...'}</div>
                </div>
                <hr className="hr_bottom"></hr>
                <div className="column">
                  <div className="font_size_text" style={{ color: '#000000', fontSize: '20px', }}>Recieve Method</div>
                  <div className="font_size_text" style={{ color: '#02B100', fontSize: '20px', }}>Bank account</div>
                </div>
                <hr className="hr_bottom"></hr>
                <div className="column">
                  <div className="font_size_text" style={{ color: '#000000', fontSize: '20px', }}>Total with any tax included in the rate:</div>
                  <div className="font_size_text" style={{ color: '#02B100', fontSize: '20px', }}>USD {summary ? getTotalPrice(summary) : '...'}</div>
                </div>
                <hr className="hr_bottom"></hr>
                <div className="column">
                  <div className="font_size_text" style={{ color: '#000000', fontSize: '20px', }}>Microphone:</div>
                  <div className="font_size_text text-right" style={{ color: '#02B100', fontSize: '20px', }}>{summary ? <>
                      <ul className="list-style-none">
                        {summary.micStats?.toggles.map((data,index)=>{
                          return <li key={index}><span className={data.title === 'Off' ? 'text-red' : 'text-blue'}>{data.title}:</span> {convertTimeStamp(data.time)}</li>
                        })}
                      </ul>
                      <hr />
                      <ul className="list-style-none">
                        <li>Switched <span className='text-blue'>On</span>: {summary.micStats?.totalToggles.On} times</li>
                        <li>Switched <span className='text-red'>Off</span>: {summary.micStats?.totalToggles.Off} times</li>
                      </ul>
                      <hr />
                      <ul className="list-style-none">
                        <li>Remained <span className='text-blue'>On</span> for: {getActiveInactiveTimes(summary,'active','mic')}</li>
                        <li>Remained <span className='text-red'>Off</span> for: {getActiveInactiveTimes(summary,'inactive','mic')}</li>
                      </ul>
                    </>
                    : '...'
                  }</div>
                </div>
                <hr className="hr_bottom"></hr>
                <div className="column">
                  <div className="font_size_text" style={{ color: '#000000', fontSize: '20px', }}>Camera:</div>
                  <div className="font_size_text text-right" style={{ color: '#02B100', fontSize: '20px', }}>{summary ? <>
                      <ul className="list-style-none">
                        {summary.videoStats?.toggles.map((data,index)=>{
                          return <li key={index}><span className={data.title === 'Off' ? 'text-red' : 'text-blue'}>{data.title}:</span> {convertTimeStamp(data.time)}</li>
                        })}
                      </ul>
                      <hr />
                      <ul className="list-style-none">
                        <li>Switched <span className='text-blue'>On</span>: {summary.videoStats?.totalToggles.On} times</li>
                        <li>Switched <span className='text-red'>Off</span>: {summary.videoStats?.totalToggles.Off} times</li>
                      </ul>
                      <hr />
                      <ul className="list-style-none">
                        <li>Remained <span className='text-blue'>On</span> for: {getActiveInactiveTimes(summary,'active','video')}</li>
                        <li>Remained <span className='text-red'>Off</span> for: {getActiveInactiveTimes(summary,'inactive','video')}</li>
                      </ul>
                    </>
                    : '...'
                  }</div>
                </div>
                <hr className="hr_bottom" ></hr>
                <div className="txt_bottom" style={{ color: '#02B100', fontSize: '20px' }}>A sales record will be emailed to you.</div>
                <div className="button_center">
                  <button onClick={() => continueToHomeScreen()} style={{ color: '#FFFFFF', fontSize: '20px', }} className="button button1">Ok</button>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="contentborder">
              <div className="column_border">
                <div className="contentstyle1">
                  <div>
                    <div className="text_font_size" style={{ marginLeft: '15px', color: '#000000', fontSize: '22px' }} >Call Ended</div>
                    <div className="text_font_size" style={{ marginLeft: '22px', color: '#000000', fontSize: '22px', marginTop: '20px' }}>{call.name ? `Helper: ${name}` : `Buyer: ${name}`}</div>
                    <div className="text_font_size1" style={{ marginLeft: '22px', color: '#000000', fontSize: '28px', fontWeight: 'bold', marginTop: '5px' }}>{name}</div>
                  </div>
                  <div ><img className="Image_size" src={call.name ? men : women} alt="profile-pic" style={{ width: '500px', height: '500px', marginLeft: '18px', marginTop: '30px' }} /></div>
                </div>
                <div className="contentstyle">
                  <div className="column">
                    <div className="font_size_text" style={{ color: '#000000', fontSize: '20px', }}>{call.name ?  `Buyer`: `Helper` }</div>
                    <div className="font_size_text" style={{ color: '#02B100', fontSize: '20px', }}>{call.name ? call.name : otherUserName}</div>
                  </div>
                  <hr className="hr_bottom"></hr>
                  <div className="column">
                    <div className="font_size_text" style={{ color: '#000000', fontSize: '20px', }}>Service</div>
                    <div className="font_size_text" style={{ color: '#02B100', fontSize: '20px', }}>New York travel service</div>
                  </div>
                  <hr className="hr_bottom"></hr>
                  <div className="column">
                    <div className="font_size_text" style={{ color: '#000000', fontSize: '20px', }}>Rate</div>
                    <div className="font_size_text" style={{ color: '#02B100', fontSize: '20px', }}>USD {pricePerMinute.toFixed(2)}/min</div>
                  </div>
                  <hr className="hr_bottom"></hr>
                  <div className="column">
                    <div className="font_size_text" style={{ color: '#000000', fontSize: '20px', }}>Start</div>
                    <div className="font_size_text" style={{ color: '#02B100', fontSize: '20px', }}>{otherUserSummary ? getStartTime(otherUserSummary) : '...'}</div>
                  </div>
                  <hr className="hr_bottom"></hr>
                  <div className="column">
                    <div className="font_size_text" style={{ color: '#000000', fontSize: '20px', }}>Duration</div>
                    <div className="font_size_text" style={{ color: '#02B100', fontSize: '20px', }}>{otherUserSummary ? getCallDuration(otherUserSummary) : '...'}</div>
                  </div>
                  <hr className="hr_bottom"></hr>
                  <div className="column">
                    <div className="font_size_text" style={{ color: '#000000', fontSize: '20px', }}>Recieve Method</div>
                    <div className="font_size_text" style={{ color: '#02B100', fontSize: '20px', }}>Bank account</div>
                  </div>
                  <hr className="hr_bottom"></hr>
                  <div className="column">
                    <div className="font_size_text" style={{ color: '#000000', fontSize: '20px', }}>Total with any tax included in the rate:</div>
                    <div className="font_size_text" style={{ color: '#02B100', fontSize: '20px', }}>USD {otherUserSummary ? getTotalPrice(otherUserSummary) : '...'}</div>
                  </div>
                  <hr className="hr_bottom"></hr>
                  <div className="column">
                    <div className="font_size_text" style={{ color: '#000000', fontSize: '20px', }}>Microphone:</div>
                    <div className="font_size_text text-right" style={{ color: '#02B100', fontSize: '20px', }}>{otherUserSummary ? <>
                        <ul className="list-style-none">
                          {otherUserSummary.micStats?.toggles.map((data,index)=>{
                            return <li key={index}><span className={data.title === 'Off' ? 'text-red' : 'text-blue'}>{data.title}:</span> {convertTimeStamp(data.time)}</li>
                          })}
                        </ul>
                        <hr />
                        <ul className="list-style-none">
                          <li>Switched <span className='text-blue'>On</span>: {otherUserSummary.micStats?.totalToggles.On} times</li>
                          <li>Switched <span className='text-red'>Off</span>: {otherUserSummary.micStats?.totalToggles.Off} times</li>
                        </ul>
                        <hr />
                        <ul className="list-style-none">
                          <li>Remained <span className='text-blue'>On</span> for: {getActiveInactiveTimes(otherUserSummary,'active','mic')}</li>
                          <li>Remained <span className='text-red'>Off</span> for: {getActiveInactiveTimes(otherUserSummary,'inactive','mic')}</li>
                        </ul>
                      </>
                      : '...'
                    }</div>
                  </div>
                  <hr className="hr_bottom"></hr>
                  <div className="column">
                    <div className="font_size_text" style={{ color: '#000000', fontSize: '20px', }}>Camera:</div>
                    <div className="font_size_text text-right" style={{ color: '#02B100', fontSize: '20px', }}>{otherUserSummary ? <>
                        <ul className="list-style-none">
                          {otherUserSummary.videoStats?.toggles.map((data,index)=>{
                            return <li key={index}><span className={data.title === 'Off' ? 'text-red' : 'text-blue'}>{data.title}:</span> {convertTimeStamp(data.time)}</li>
                          })}
                        </ul>
                        <hr />
                        <ul className="list-style-none">
                          <li>Switched <span className='text-blue'>On</span>: {otherUserSummary.videoStats?.totalToggles.On} times</li>
                          <li>Switched <span className='text-red'>Off</span>: {otherUserSummary.videoStats?.totalToggles.Off} times</li>
                        </ul>
                        <hr />
                        <ul className="list-style-none">
                          <li>Remained <span className='text-blue'>On</span> for: {getActiveInactiveTimes(otherUserSummary,'active','video')}</li>
                          <li>Remained <span className='text-red'>Off</span> for: {getActiveInactiveTimes(otherUserSummary,'inactive','video')}</li>
                        </ul>
                      </>
                      : '...'
                    }</div>
                  </div>
                  <hr className="hr_bottom" ></hr>
                  <div className="txt_bottom" style={{ color: '#02B100', fontSize: '20px' }}>A sales record will be emailed to you.</div>
                  <div className="button_center">
                    <button onClick={() => continueToHomeScreen()} style={{ color: '#FFFFFF', fontSize: '20px', }} className="button button1">Ok</button>
                  </div>
                </div>
              </div>
          </div>
        </div>
      }
    </>
  );
};

export default InvoiceSummary;
