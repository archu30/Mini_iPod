import React from 'react';
import Navbar from './Navbar';
import LockScreen from './LockScreen';
import '../CSS/display.css'

class Display extends React.Component{
    render(){
        return(
            <div className='display'>
            <Navbar />
            <LockScreen />
            </div>
            
        )
    }
}

export default Display