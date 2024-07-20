import React from 'react';
import './footer.css';
import facebookIcon from '../assets/facebook.png';
import instagramIcon from '../assets/instagram.png';
import twitterIcon from '../assets/twitter.png';
import twitchIcon from '../assets/twitch.png';
import youtubeIcon from '../assets/youtube.png';

const socialMediaLinks = [
    { src: facebookIcon, url: 'https://www.facebook.com' },
    { src: instagramIcon, url: 'https://www.instagram.com' },
    { src: twitterIcon, url: 'https://www.twitter.com' },
    { src: twitchIcon, url: 'https://www.twitch.tv' },
    { src: youtubeIcon, url: 'https://www.youtube.com' }
];

const footerFields = ["Privacy Policy", "Contact Us", "Cookies Preference", "Corporate Information"];

const FooterFields = ({ fields }) => (
    <div style={{ display: 'flex', gap: 34,marginBottom: '12px' }}>
        {fields.map((field, index) => (
            <div key={index}>{field}</div>
        ))}
    </div>
);

const Footer = () => {
    return (
        <div className="footer">
            <div className="warper">
                <div className="footer-icons">
                    {socialMediaLinks.map((link, index) => (
                        <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
                            <img src={link.src} alt="Social Icon" />
                        </a>
                    ))}
                </div>
                <FooterFields fields={footerFields} />
                <FooterFields fields={footerFields} />
                <div className="footer-copyright">
                    <p>© Alkyz Test</p>
                </div>
            </div>
        </div>
    );
}

export default Footer;
