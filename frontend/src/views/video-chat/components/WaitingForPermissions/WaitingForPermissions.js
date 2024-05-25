import { useContext } from "react";
import VideoContext from "../../context/VideoContext";
import "./WaitingForPermissions.css";

const WaitingForPermissions = () => {

    const { permissionsAsked } = useContext(VideoContext);
    
  return (
        <>  
            <div className={permissionsAsked ? 'd-none' : ''}>
                <div className="bg-blur"></div>
                <div className="center-model">
                    <h1>Waiting for Microphone and Camera permissions</h1> 
                    <div className="text-center">
                        <span>(If this model does not hide automatically due to microphone or camera conflict, try restarting your system)</span>
                    </div>
                </div>
            </div>
        </>
  );
};

export default WaitingForPermissions;