import React, { useContext, useState, useRef } from "react";
import VideoContext from "../../context/VideoContext";
import "./ShareExperience.css";
import ReactStars from "react-rating-stars-component";

const ShareExperience = () => {

  const { showSummary, setShowSummary } = useContext(VideoContext);
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  return (
    <>
      {showSummary &&
        <div className="maincontent">
          <div className="contentborder">
            <div className="column_border">
              <div className="contentstyle">
                <div className="txt_center">
                  <div style={{ color: '#000000', fontSize: '24px' }}>Helper: abc12345678912345678</div>
                  <div style={{ color: '#000000', fontSize: '26px', fontWeight: 'bold', marginTop: '2px' }}>Alex Hales Alex Hales Alex Hal</div>
                  <div className="border_style" style={{ color: '#000000', fontSize: '24px', marginTop: '20px' }}>New York Travel aaaaaaaaaaaaaa</div>
                  <div style={{ marginLeft: '22px', color: '#000000', fontSize: '18px', marginTop: '45px' }}>Share your experience</div>
                </div>
                <div className="txt_column">
                  <div className="text_font_size1" style={{ color: '#000000', fontSize: '17px', marginTop: "5px" }}>Rate the service*</div>
                  <div> <ReactStars count={5} onChange={ratingChanged} size={24} classNames='star' activeColor="#FFB33E" /></div>
                </div>
                <div>
                  <div style={{ color: '#000000', fontSize: '20px', marginTop: '20px' }}>Comment</div>
                  <div><textarea rows="6" cols="71" name="comment" className="placeholderstyle" placeholder="What did you like or didn't like this service? Share as many details as you can." required></textarea></div>
                </div>
                <div className="txt_end">0/1000 Characters</div>
                <div className="button_center_start">
                  <div className="button_center_space">
                    <div style={{ textDecorationLine: "underline", fontSize: '16px', color: '#000', marginTop: '15px' }}>Skip</div>
                    <button onClick={() => setShowSummary(false)} style={{ color: '#FFFFFF', fontSize: '20px', }} class="button button1">Submit</button>
                  </div>
                </div>
              </div>

              {/* <div class="rating">
                <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
              </div> */}
              {/* <div className="contentstyle">
                <div className="column">
                  <div className="font_size_text" style={{ color: '#000000', fontSize: '20px', }}>Service</div>
                  <div className="font_size_text" style={{ color: '#02B100', fontSize: '20px', }}>Plumber Plumber Plumber Plumber</div>
                </div>
                <hr className="hr_bottom"></hr>
                <div className="column">
                  <div className="font_size_text" style={{ color: '#000000', fontSize: '20px', }}>Rate</div>
                  <div className="font_size_text" style={{ color: '#02B100', fontSize: '20px', }}>USD 2.00/min</div>
                </div>
                <hr className="hr_bottom"></hr>
                <div className="column">
                  <div className="font_size_text" style={{ color: '#000000', fontSize: '20px', }}>Start</div>
                  <div className="font_size_text" style={{ color: '#02B100', fontSize: '20px', }}>2022-08-30 07:16:24</div>
                </div>
                <hr className="hr_bottom"></hr>
                <div className="column">
                  <div className="font_size_text" style={{ color: '#000000', fontSize: '20px', }}>Duration</div>
                  <div className="font_size_text" style={{ color: '#02B100', fontSize: '20px', }}>4:20 min</div>
                </div>
                <hr className="hr_bottom"></hr>
                <div className="column">
                  <div className="font_size_text" style={{ color: '#000000', fontSize: '20px', }}>Recieve Method</div>
                  <div className="font_size_text" style={{ color: '#02B100', fontSize: '20px', }}>Bank account</div>
                </div>
                <hr className="hr_bottom"></hr>
                <div className="column">
                  <div className="font_size_text" style={{ color: '#000000', fontSize: '20px', }}>Total with any tax included in the rate:</div>
                  <div className="font_size_text" style={{ color: '#02B100', fontSize: '20px', }}>USD 2.10</div>
                </div>
                <hr className="hr_bottom" ></hr>
                <div className="txt_bottom" style={{ color: '#02B100', fontSize: '20px' }}>A sales record will be emailed to you.</div>
                <div className="button_center">
                  <button onClick={() => setShowSummary(false)} style={{ color: '#FFFFFF', fontSize: '20px', }} class="button button1">Share the service</button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default ShareExperience;
