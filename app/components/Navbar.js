"use client"
import {useEffect,useState,useRef } from 'react'
import { usePathname } from 'next/navigation'
export default function Navbar() {
    const pathName = usePathname()
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleRef = useRef(null);
 
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
      };
    useEffect(() => {
        const el = document.querySelectorAll('[data-page]');
        el.forEach(dom => {
            if(`/${dom.getAttribute('data-page')}` === pathName) {
                dom.classList.add('--active')
            }else{
                dom.classList.remove('--active')
            }
        });
       
    },[])

  return (
    <header id="header" >
    <div id="header-container" >
        <div id="header-background"  className={isMenuOpen ? "--opened" : ""}></div>
        <a id="header-logo" aria-label="Go to home page" href="/">
            <svg xmlns="http://www.w3.org/2000/svg" width="121" height="24" fill="none" viewBox="0 0 121 24">
                <g fill="currentColor" style={{ mixBlendMode: 'exclusion' }}>
                    <path d="M0 23.781V.22h3.871v20.129h10.132v3.433H0ZM22.76.118v13.666c0 2.222.438 3.893 1.313 5.015.875 1.1 2.233 1.65 4.073 1.65 1.862 0 3.231-.55 4.106-1.65.898-1.122 1.347-2.793 1.347-5.015V.118h3.87v13.464c0 3.366-.796 5.924-2.39 7.675-1.57 1.75-3.881 2.625-6.933 2.625-3.03 0-5.33-.875-6.9-2.625-1.572-1.75-2.357-4.309-2.357-7.675V.118h3.871ZM46.16 16.123c.112 1.392.673 2.514 1.683 3.366 1.032.83 2.367 1.246 4.005 1.246 1.436 0 2.592-.303 3.467-.909.898-.628 1.347-1.492 1.347-2.592 0-.785-.247-1.402-.74-1.851-.472-.471-1.123-.83-1.953-1.077-.83-.247-1.997-.505-3.5-.774-1.527-.27-2.84-.618-3.94-1.044a6.43 6.43 0 0 1-2.658-2.02c-.674-.897-1.01-2.075-1.01-3.534 0-1.346.348-2.547 1.043-3.602.718-1.054 1.706-1.873 2.962-2.457C48.146.292 49.604 0 51.242 0c1.683 0 3.187.314 4.51.942 1.325.629 2.368 1.493 3.131 2.592.763 1.1 1.178 2.357 1.246 3.77h-3.804c-.135-1.211-.662-2.188-1.582-2.928-.92-.74-2.087-1.11-3.5-1.11-1.37 0-2.47.302-3.3.908-.807.583-1.211 1.414-1.211 2.49 0 .764.235 1.37.707 1.818.493.45 1.144.786 1.952 1.01.808.225 1.964.472 3.467.74 1.526.27 2.839.63 3.938 1.078 1.1.449 1.998 1.11 2.693 1.986.696.875 1.044 2.03 1.044 3.467 0 1.391-.37 2.637-1.111 3.736-.74 1.1-1.773 1.964-3.097 2.592-1.324.606-2.828.909-4.51.909-1.863 0-3.501-.337-4.915-1.01-1.414-.673-2.524-1.604-3.332-2.794-.786-1.211-1.19-2.591-1.212-4.14l3.803.067ZM65.419.219h3.87V23.78h-3.87V.22ZM97.065 12c0 2.289-.482 4.342-1.447 6.16-.965 1.818-2.323 3.242-4.073 4.275-1.728 1.032-3.703 1.548-5.924 1.548-2.222 0-4.208-.516-5.958-1.548-1.728-1.032-3.075-2.457-4.04-4.275-.965-1.818-1.447-3.871-1.447-6.16s.483-4.342 1.447-6.16c.965-1.818 2.312-3.243 4.04-4.275C81.413.533 83.399.017 85.62.017c2.221 0 4.196.516 5.924 1.548 1.75 1.032 3.108 2.457 4.073 4.275.965 1.818 1.447 3.871 1.447 6.16Zm-18.917 0c0 1.638.314 3.12.943 4.443.628 1.302 1.503 2.323 2.625 3.063 1.144.718 2.446 1.078 3.905 1.078 1.458 0 2.749-.36 3.87-1.078 1.145-.74 2.031-1.761 2.66-3.063.628-1.324.942-2.805.942-4.443 0-1.638-.314-3.108-.942-4.41-.629-1.324-1.515-2.345-2.66-3.063-1.121-.74-2.412-1.11-3.87-1.11-1.459 0-2.76.37-3.905 1.11-1.122.718-1.997 1.74-2.625 3.063-.629 1.302-.943 2.772-.943 4.41ZM101.951 23.781V.22h3.535l11.478 16.695V.22h3.804V23.78h-3.535L105.755 7.086V23.78h-3.804Z"></path>
                </g>
            </svg>
        </a>
        <div id="header-center">
            <button id="header-center-project-back-btn" aria-label="Back">
                <svg id="header-center-project-back-btn-svg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M8 12.243 3.757 8m0 0L8 3.757M3.757 8h8.486"></path>
                </svg>
                <p id="header-center-project-back-btn-text">back</p>
                <svg id="header-center-project-back-btn-svg2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M8 12.243 3.757 8m0 0L8 3.757M3.757 8h8.486"></path>
                </svg>
                <div id="project-details-header-back-background"></div>
            </button>
        </div>
        <div id="header-right">
            <button id="header-right-sound-btn" style={{ transform: 'translate3d(0px, 0em, 0px)' }}></button>
            <button id="header-right-talk-btn-placeholder"></button>
            <button id="header-right-talk-btn" style={{ display: 'block', pointerEvents: 'auto', opacity: 1, transform: 'translate3d(0px, 0em, 0px)' }}>
                <a href="mailto:vphcm@20stu.co"></a>
                <div id="header-right-talk-container" style={{ opacity: 1 }}>
                    <span id="header-right-talk-btn-arrow">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.343 8h11.314m0 0-4.984 4.984M13.657 8 8.673 3.016"></path>
                        </svg>
                    </span>
                    <span id="header-right-talk-btn-text">Let's talk</span><span id="header-right-talk-btn-dots"><span className="header-right-talk-btn-dot"></span></span>
                </div>
            </button>
            <button id="header-right-menu-btn" aria-label="Menu button" style={{ transform: 'translate3d(0px, 0em, 0px)' }} className={isMenuOpen ? "--opened" : ""} onClick={toggleMenu}>
                <div id="header-right-menu-btn-inner">
                    <span id="header-right-menu-btn-text">Menu</span><span id="header-right-menu-btn-text-close">Close</span>
                    <div id="header-right-menu-btn-dots"><span className="header-right-menu-btn-dot"></span><span className="header-right-menu-btn-dot"></span></div>
                </div>
            </button>
        </div>
        <div id="header-menu" ref={toggleRef} className={isMenuOpen ? "--opened" : ""} >
            <div id="header-menu-links" style={{'--open-delay': '0s', '--close-delay': '0.08s'}}>
                <a className="header-menu-link" data-page="" href="/">
                    <div className="header-menu-link-background"></div>
                    <div className="header-menu-link-inner">
                        <span className="header-menu-link-text">Home</span><span className="header-menu-link-text-clone">Home</span>
                        <svg className="header-menu-link-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.515 12h16.97m0 0L13.01 4.525M20.485 12l-7.475 7.476"></path>
                        </svg>
                    </div>
                </a>
                <a className="header-menu-link" data-page="aboutus" href="/aboutus" >
                    <div className="header-menu-link-background"></div>
                    <div className="header-menu-link-inner">
                        <span className="header-menu-link-text">About us</span><span className="header-menu-link-text-clone">About us</span>
                        <svg className="header-menu-link-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.515 12h16.97m0 0L13.01 4.525M20.485 12l-7.475 7.476"></path>
                        </svg>
                    </div>
                </a>
              {/*   <a className="header-menu-link" data-page="projects" href="/projects" >
                    <div className="header-menu-link-background"></div>
                    <div className="header-menu-link-inner">
                        <span className="header-menu-link-text">Projects</span><span className="header-menu-link-text-clone">Projects</span>
                        <svg className="header-menu-link-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.515 12h16.97m0 0L13.01 4.525M20.485 12l-7.475 7.476"></path>
                        </svg>
                    </div>
                </a> */}
                <button className="header-menu-link" data-scroll-to="contact">
                    <div className="header-menu-link-background"></div>
                    <div className="header-menu-link-inner">
                        <span className="header-menu-link-text">Contact</span><span className="header-menu-link-text-clone">Contact</span>
                        <svg className="header-menu-link-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.515 12h16.97m0 0L13.01 4.525M20.485 12l-7.475 7.476"></path>
                        </svg>
                    </div>
                </button>
            </div>
            <div id="header-menu-newsletter" style={{'--open-delay': '0.02s', '--close-delay': '0.06s'}}>
                <h3 id="header-menu-newsletter-title">
                    <div className="header-menu-newsletter-title-line">Subscribe to</div>
                    <div className="header-menu-newsletter-title-line">our newsletter</div>
                </h3>
                <div id="header-menu-newsletter-input">
                    <div id="header-menu-newsletter-input-bg"></div>
                    <form id="header-menu-newsletter-form">
                        <input id="header-menu-newsletter-input-field" type="email" name="EMAIL" autoComplete="email" placeholder="Your email" />
                        <button type="submit" id="header-menu-newsletter-input-arrow">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path fill="#000" fillRule="evenodd" d="M4.11 12.75a.75.75 0 0 1 0-1.5h13.978l-5.036-5.036a.75.75 0 1 1 1.06-1.06l6.316 6.315.53.53-.53.53-6.316 6.317a.75.75 0 0 1-1.06-1.061l5.035-5.035H4.109Z" clipRule="evenodd"></path>
                            </svg>
                        </button>
                    </form>
                    <div id="header-menu-newsletter-feedback-message"></div>
                </div>
            </div>
            <button id="header-menu-talk" style={{'--open-delay': '0.04s', '--close-delay': '0.04s'}}>
                <a href="mailto:vphcm@20stu.co"></a>
                <div id="header-menu-text">Let's talk</div>
                <svg id="header-menu-talk-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path fill="#fff" d="M0 0h24v24H0z"></path>
                    <rect width="18" height="18" x="3" y="3" stroke="#000" strokeWidth="1.5" rx="2"></rect>
                    <rect width="12" height="4" x="6" y="14" fill="#000" rx="2"></rect>
                    <path stroke="#000" strokeLinecap="round" strokeWidth="1.5" d="M7 7h10M7 10h10"></path>
                </svg>
            </button>
            <a id="header-menu-labs" target="_blank" href="https://labs.lusion.co/"  style={{'--open-delay': '0.06s', '--close-delay': '0.02s'}}>
                <div id="header-menu-labs-inner">
                    <div id="header-menu-labs-lucy">
                        <svg id="header-menu-labs-lucy-svg" xmlns="http://www.w3.org/2000/svg" width="28" height="38" fill="none" viewBox="0 0 28 38">
                            <path stroke="#fff" strokeWidth="5" d="M20.128 29.65C18.584 31.217 16.532 32 13.972 32c-2.56 0-4.612-.783-6.156-2.35C6.272 28.05 5.5 26 5.5 23.5c0-2.5.772-4.533 2.316-6.1 1.544-1.6 3.596-2.4 6.156-2.4 2.56 0 4.612.8 6.156 2.4C21.71 18.967 22.5 21 22.5 23.5c0 2.5-.79 4.55-2.372 6.15Z"></path>
                            <path fill="#fff" d="M23.5 4.25a3.25 3.25 0 1 0-6.5 0 3.25 3.25 0 0 0 6.5 0ZM11 4.25a3.25 3.25 0 1 0-6.5 0 3.25 3.25 0 0 0 6.5 0Z"></path>
                        </svg>
                    </div>
                    <div id="header-menu-labs-texts">
                        <div id="header-menu-labs-text">Gallery</div>
                        <div id="header-menu-labs-text-clone">Gallery</div>
                    </div>
                    <svg id="header-menu-labs-arrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 20 20 4m0 0v14.096M20 4H5.904"></path>
                    </svg>
                    <svg id="header-menu-labs-arrow2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 20 20 4m0 0v14.096M20 4H5.904"></path>
                    </svg>
                </div>
            </a>
        </div>
    </div>
</header>
  )
}
