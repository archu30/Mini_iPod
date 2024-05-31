import React from 'react';


class Song extends React.Component {
    render() {
        const { songItems, active } = this.props;
        return (
            <div className="song">
                <h3>Songs</h3>
                <ul>
                    {songItems.map((element, index) => {
                        return active === index ? <li key={index} className="active">&nbsp;{element}</li> : <li id="song1" key={index}>&nbsp;{element}</li>
                    })}
                </ul>
            </div>

        )
    }
}

export default Song