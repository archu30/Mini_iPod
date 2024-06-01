import React from 'react';
import Game from '../Assets/game.jpg';
import Music from '../Assets/music.jpg';
import Setting from '../Assets/settings.png';
import '../CSS/menu.css'

class Menu extends React.Component {
    render() {
        const { songImgUrl, menuItems, active } = this.props
        return (
            <div className='menu-container'>
                <div className='menu'>
                    <ul>
                        {
                            menuItems.map((element, index) => {
                                return active === index ? <li key={index} className="active">&nbsp; {element}</li> : <li key={index}>&nbsp; {element}</li>
                            })
                        }
                    </ul>
                </div>
                <div className='leaf'>
                    {active === 0 && <img src={songImgUrl} alt="" className='leaf-img' />}
                    {active === 1 && <img src={Music} alt="" className='leaf-img' />}
                    {active === 2 && <img src={Game} alt="" className='leaf-img' />}
                    {active === 3 && <img src={Setting} alt="" className='leaf-img' />}
                </div>
            </div>

        )
    }
}

export default Menu