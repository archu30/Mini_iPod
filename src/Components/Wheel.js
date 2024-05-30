import React from "react";
import  "../CSS/wheel.css";
import { AiOutlineForward , AiOutlineBackward } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";
import { BiPause } from "react-icons/bi";


class Wheel extends React.Component{

     render(){
        return(
            <div className="wheel-container" id="wheel-container">
                <div className="wheel" id="wheel">
                    <div className="control" id="menu">
                        <div>MENU</div>
                    </div>
                    <div  className="control" id="forward">
                    <AiOutlineForward />
                    </div>
                    <div  className="control" id="play-pause">
                        <div>
                        <BsFillPlayFill />
                        <BiPause />
                        </div>
                    </div>
                    <div  className="control" id="reverse">
                    <AiOutlineBackward />
                    </div>
                </div>
                <div className="blank" id="blank"></div>
            </div>
        )
     }
}
export default Wheel