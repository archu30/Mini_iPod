import React from 'react';
import battery from '../Assets/battery.png'
import '../CSS/Navbar.css'

class Navbar extends React.Component {
    constructor() {
        super();
        this.state = {
            time: this.getCurrentTime(),
        }
    }

    getCurrentTime() {
        const Today = new Date();
        var Time = Today.getHours() + ":" + Today.getMinutes();
        if (Today.getMinutes() < 10) {
            Time = Today.getHours() + ":0" + Today.getMinutes();
        }
        return Time;
    }
    render() {
        const {time} = this.state;

        return (
            <>
                <div className="bar">
                    <h5 className='heading'>iPod</h5>
                    <h3 className='time'>{time}</h3>
                    <div className='right-container-nav'>
                        <img src={battery}  className='battery' alt='battery'/>
                    </div>
                </div>

            </>
        )
    }
}

export default Navbar