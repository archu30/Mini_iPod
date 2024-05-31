import React from 'react';
import '../CSS/music.css';


class Music extends React.Component {
    render() {
        const { musicItems, active } = this.props
        return (
            <div className='music'>
                 <h3>Music</h3>
                <ul>
                {musicItems.map((element, index)=>{
                            return active===index?<li key={index} className="active">&nbsp;{element}</li>:<li key={index}>&nbsp;{element}</li>
                        })}
                </ul>
            </div>

        )
    }
}

export default Music