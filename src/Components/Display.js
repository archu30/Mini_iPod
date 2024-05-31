import React from 'react';
import Navbar from './Navbar';
import Menu from './Menu';
import LockScreen from './LockScreen';
import '../CSS/display.css'
import Music from './Music';
import Setting from './Setting';
import Song from './Song';
import Theme from './Theme';
import WheelColor from './WheelColor';
import Wallpaper from './Wallpaper';
import Playing from './Playing'

class Display extends React.Component {
    render() {
        const { active, currentMenu, menuItems, musicItems, songItems,
            playing, songIndex, audio, songUrl, songImgUrl, wallpaper,
            wallpaperItems, noty, setNoty, notifyText } = this.props;

        return (
            <div className='display' style={{ backgroundImage: `url(${wallpaperItems[wallpaper]})` }}>
                <Navbar noty={noty} setNoty={setNoty} playing={playing} notifyText={notifyText} />

                {currentMenu === -2 && <LockScreen />}
                {currentMenu === -1 && <Menu songImgUrl={songImgUrl} menuItems={menuItems} active={active} />}
                {currentMenu === 1 && <Music musicItems={musicItems} active={active} />}
                {currentMenu === 2 && <div className='blank-div'><h1 className='empty-text'>Games</h1></div>}
                {currentMenu === 3 && <Setting active={active} />}
                {currentMenu === 4 && <Song songItems={songItems} active={active} />}
                {currentMenu === 5 && <div className='blank-div'><h1 className='empty-text'>Artists</h1></div>}
                {currentMenu === 6 && <div className='blank-div'><h1 className='empty-text'>Albums</h1></div>}
                {(currentMenu === 0 || currentMenu === 7) && <Playing songImgUrl={songImgUrl} audio={audio} songUrl={songUrl}
                    playing={playing} songIndex={songIndex} songItems={songItems} />}

                {currentMenu === 8 && <Theme active={active} />}
                {currentMenu === 9 && <WheelColor active={active} />}
                {currentMenu === 8 && <Wallpaper active={active} />}


            </div>

        )
    }
}

export default Display