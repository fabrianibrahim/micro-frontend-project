import React from 'react';
import { signOutAndGoToWelcome } from '../../bootstrap';
import './Footer.css';

function Footer() {
    return (
        <div className="footer polka-dot-bg">
            <span className="link" onClick={signOutAndGoToWelcome} >Sign Out</span>
        </div>
    )
}

export default Footer;
