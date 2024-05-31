import React from "react";
import Case from "./Case";

import song1 from '../Assets/songs/John Denver - Country Roads.mp3'
import song2 from '../Assets/songs/Khalid - Young Dumb Broke.mp3'
import song3 from '../Assets/songs/Post Malone - White Iverson.mp3'
import song4 from '../Assets/songs/Rick Astley - Never Gonna Give You Up.mp3'
import song5 from '../Assets/songs/Sigrid - High Five.mp3'

import songImg1 from '../Assets/John Denver - Country Roads.jpg'
import songImg2 from '../Assets/Khalid - Young Dumb Broke.jpg'
import songImg3 from '../Assets/Post Malone - White Iverson.png'
import songImg4 from '../Assets/Never Gonna Give You Up.png'
import songImg5 from '../Assets/Sigrid - High Five.png'

import wallpaper1 from '../Assets/wallpaper1.jpg'
import wallpaper2 from '../Assets/wallpaper2.jpg'
import wallpaper3 from '../Assets/wallpaper3 - Copy.jpg'

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            active: 0, //show how many list of item will be active
            menuItems: ["Now Playing", "Music", "Games", "Settings"], //menu Items
            musicItems: ["All Songs", "Artist", "Albums"], //Items in music
            songItemsUrl: [song1, song2, song3, song4, song5,],  //songs list
            songImgItemsUrl: [songImg1, songImg2, songImg3, songImg4, songImg5], //song images list
            wallpaperItems: [wallpaper1, wallpaper2, wallpaper3], //wallpapers
            songItems: ["John Denver - Country Roads", "Khalid - Young Dumb Broke", "Post Malone - White Iverson", "Rick Astley - Never Gonna Give You Up", "Sigrid - High Five"], //song names
            songIndex: 0, // current song
            lengthMenuKey: { "-1": 3, 1: 2, 4: 4, 8: 4, 3: 2, 9: 3, 10: 2 }, // length of a particular menu
            menuMapping: { "-1": [0, 1, 2, 3], 1: [4, 5, 6], 3: [8, 9, 10] }, // which menu can be render by key menu
            currentMenu: -2,  //current menu which is lockscreen initially
            navigationStack: [], // used for navigation forward and backward
            songUrl: song1, // current song url
            playing: false, //playing or not
            theme: "rgb(210,210,210)", //current body theme
            audio: new Audio(song1), //current audio file
            songImgUrl: songImg1, //current song img for now playing
            wheelColor: "white", //current wheel color
            wallpaper: 0, //current wallpaper
            noty: false, // has to show notification or not
            notifyText: "wallpaper changed", //notification text

        }
    }

    // zingtouch Library

    //  function for : on long pressof forward button tracks are seeked forward

    seekSongForward = (e) => {
        if (this.state.currentMenu === -2) {
            return;
        }
        if (this.state.playing === false) {
            return;
        }
        if (e.detail.interval < 250) {
            this.state.audio.pause();
            let songIndex = this.state.songIndex;
            if (songIndex === this.state.songImgUrl.length - 1) {
                songIndex = 0;
            } else {
                songIndex++;
            }
            const songUrl = this.state.songItemsUrl[songIndex];
            const songImgUrl = this.state.songImgItemsUrl[songIndex];

            this.setState({ songIndex: songIndex, songImgUrl: songImgUrl, songUrl: songUrl, audio: new Audio(songUrl) },
                () => {
                    this.state.audio.play();
                });
        } else if (e.detail.interval > 250 && e.detail.interval < 1000) {
            const interval = e.detail.interval / 100;
            this.setState((prevState) => {
                prevState.audio.currentTime += interval;
                return prevState;
            })
        }

    }

    //  function for : on long press of forward button tracks are seeked backward

    seekSongReverse = (e) => {
        if (this.state.currentMenu === -2) {
            return;
        }
        if (this.state.playing === false) {
            return;
        }
        if (e.detail.interval < 250) {
            this.state.audio.pause();
            let songIndex = this.state.songIndex;
            if (songIndex === 0) {
                songIndex = this.state.songItemsUrl.length - 1;
            } else {
                songIndex--;
            }
            const songUrl = this.state.songItemsUrl[songIndex];
            const songImgUrl = this.state.songImgItemsUrl[songIndex];

            this.setState({ songIndex: songIndex, songImgUrl: songImgUrl, songUrl: songUrl, audio: new Audio(songUrl) },
                () => {
                    this.state.audio.play();
                });
        } else if (e.detail.interval > 250 && e.detail.interval < 1000) {
            const interval = e.detail.interval / 100;
            this.setState((prevState) => {
                prevState.audio.currentTime -= interval;
                return prevState;
            })
        }

    }


    // FUNCTION FOR : TOGGLE SONG PLAY AND PAUSE

    togglePlayPause = () => {
        if (this.state.currentMenu === -2) {
            return;
        }
        if (this.state.playing === true) {
            this.setState({ playing: false });
            this.state.audio.pause();
        }
        else {
            this.setState({ playing: true });
            this.state.audio.play();
        }
    }

    // FUNCTION FOR : UPDATE ACTIVE MENU WHILE ROTATING ON THE TRACK-WHEEL

    updateActiveMenu = (direction, menu) => {
        if (menu !== -1 && menu !== 1 && menu !== 4 && menu !== 8 && menu !== 9 && menu !== 10) {
            return;
        }
        let min = 0;
        let max = 0;

        max = this.state.lengthMenuKey[menu];
        if (direction === 1) {
            if (this.state.active >= max) {
                this.setState({ active: min });
            } else {
                this.setState({ active: this.state.active + 1 })
            }
        } else {
            if (this.state.active <= min) {
                this.setState({ active: max })
            } else {
                this.setState({ active: this.state.active - 1 })
            }
        }
    }


    // FUNCTION FOR : CHANGE THE THEME OF iPod BODY

    setTheme = (id) => {
        let theme = "";
        if (id === 0) {
            theme = "#f0f0f0";
        }
        else if (id === 1) {
            theme = "#555d50";
        }
        else if (id === 2) {
            theme = "#ffcc00";
        }
        else if (id === 3) {
            theme = "#D1CDDA";
        }
        else if (id === 4) {
            theme = "#c4aeead";
        }
        this.setState({ theme: theme, noty: true, notifyText: "Theme changed" }) //Notification
        return;
    }

    // FUNCTION FOR : CHANGE COLOR OF WHEEL

    setWheelColor = (id) => {
        let wheelColor = "";
        if (id === 0) {
            wheelColor = "#212121";
        }
        else if (id === 1) {
            wheelColor = "white";
        }
        else if (id === 2) {
            wheelColor = "#3E2723";
        }
        else if (id === 3) {
            wheelColor = "#3D5AFE";
        }
        this.setState({ wheelColor: wheelColor, noty: true, notifyText: "Wheel Color Changed" })
        return;
    }

    // FUNCTION FOR : SET WALLPAPER OF iPod Body
    setWallpaper = (id) => {
        this.setState({ wallpaper: id, noty: true, notifyText: "Wallpaper Changed" });
        return;
    }




    // FUNCTION FOR : CHANGE PLAYING MUSIC

    chagePlayingSongFromMusicMenu = (id, navigationStack) => {
        const songUrl = this.state.songItemsUrl[id];
        const songImgUrl = this.state.songImgItemsUrl[id];

        this.state.audio.pause();
        this.setState({ currentMenu: 7, songUrl: songUrl, navigationStack: navigationStack, active: 0, playing: true, songIndex: id, audio: new Audio(songUrl), songImgUrl: songImgUrl }, () => {
            this.state.audio.play();
        });
        return;
    }

    // FUNCTION FOR : CHANGE MENU FORWARD on PRESS OF CENTER BUTTON using NAVIGATION STACK

    changeMenuForward = (id, fromMenu) => {
        const navigationStack = this.state.navigationStack.slice();

        if (fromMenu !== -2 && fromMenu !== -1 && fromMenu !== 1 && fromMenu !== 4 && fromMenu !== 3 && fromMenu !== 8 && fromMenu !== 9 && fromMenu !== 0 && fromMenu !== 7 && fromMenu !== 10) {
            return;
        }

        if (fromMenu === -2) {
            navigationStack.push(this.state.currentMenu);
            this.setState({ currentMenu: -1, navigationStack: navigationStack, active: 0 });
            return;
        }

        if (fromMenu === -1) {
            navigationStack.push(this.state.currentMenu);
            this.setState({ currentMenu: id, navigationStack: navigationStack, active: 0 });
            return;
        }

        if (fromMenu === 7 || fromMenu === 0) {
            this.togglePlayPause();
            return;
        }

        if (fromMenu === 8) {
            this.setTheme(id);
            return;
        }


        if (fromMenu === 9) {
            this.setWheelColor(id)
            return;
        }

        if (fromMenu === 10) {
            this.setWallpaper(id)
            return;
        }

        navigationStack.push(this.state.currentMenu);

        if (fromMenu === 4) {
            this.chagePlayingSongFromMusicMenu(id, navigationStack, fromMenu);
            return;
        }

        const currentMenuID = this.state.menuMapping[fromMenu][id];
        this.setState({ currentMenu: currentMenuID, navigationStack: navigationStack, active: 0 });

    }

    // FUNCTION FOR : CHANGE MENU BACKWARDS on PRESS OF CENTER BUTTON

    changeMenuBackward = () => {
        const navigationStack = this.state.navigationStack.slice();

        if (this.state.currentMenu === -2) {
            return;
        }
        else {
            const prevId = navigationStack.pop();
            this.setState({ currentMenu: prevId, navigationStack: navigationStack, active: 0 });
            return;
        }
    }

    // FUNCTION FOR : SET NOTIFICATION AS FALSE AFTER SENDING NOTIFICATION
    setNoty = () => {
        this.setState({ noty: false });
        return;
    }

    // FUNCTION FOR : RENDERING APP
    render() {
        const { audio, active, currentMenu, menuItems, musicItems, songItems, playing, songIndex, theme, songUrl, songImgUrl, wheelColor,
            wallpaper, wallpaperItems, noty, notifyText } = this.state;
        return (
            <div className="App">

                <Case songIndex={songIndex} active={active} menuItems={menuItems} currentMenu={currentMenu} audio={audio} musicItems={musicItems} songItems={songItems}
                    playing={playing} theme={theme} songUrl={songUrl} songImgUrl={songImgUrl} wheelColor={wheelColor} wallpaper={wallpaper} wallpaperItems={wallpaperItems}
                    noty={noty} notifyText={notifyText} changeMenuForward={this.changeMenuForward} changeMenuBackward={this.changeMenuBackward} updateActiveMenu={this.updateActiveMenu}
                    togglePlayPause={this.togglePlayPause} seekSongForward={this.seekSongForward} seekSongReverse={this.seekSongReverse} setNoty={this.setNoty}
                />
            </div>

        )
    }
}

export default App