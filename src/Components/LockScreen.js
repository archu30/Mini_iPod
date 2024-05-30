import React from 'react';
import '../CSS/Lockscreen.css'

class LockScreen extends React.Component {
    render() {
        return (
            <>
                <div>
                    <h3 className='bottom-lock'>
                        Press Center Button To Unlock!
                    </h3>
                </div>
            </>
        )
    }
}

export default LockScreen