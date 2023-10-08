"use client"
import { useEffect,useRef} from 'react'
import Navbar from '../components/Navbar'
import Lenis from '@studio-freight/lenis'
export default function Aboutus() {
  const lenis = useRef(null)
  useEffect(() => {
  
    console.log('frist load -- lenis')
    lenis.current = new Lenis()
    lenis.current.on('scroll', (e) => {
      // console.log(e.scroll)
      //localStorage.setItem('posCurrent', e.scroll)
    })

    function raf(time) {
      lenis.current.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

  }, [])

  const handleButtonClick = () => {
    lenis.current.scrollTo('.main')
  };
  return (
    <>    
      <Navbar/>
      <div id="page-extra-sections" >
                    <div id="footer-section" className="section">
                        <div id="footer-bg"></div>
                        <div id="footer-top"></div>
                        <div id="footer-middle">
                            <div id="footer-middle-contact">
                                <a id="footer-contact-address" href="https://goo.gl/maps/x9evc1NxZocjrM947" target="_blank">
                                  <div className="footer-address-line-wrapper" style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                        <div className="footer-address-line">
                                            <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0em, 0px)' }}>62/193</div>
                                        </div>
                                    </div>
                                    <div className="footer-address-line-wrapper" style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                        <div className="footer-address-line">
                                            <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0em, 0px)' }}>Ly Chinh Thang</div>
                                        </div>
                                    </div>
                                    <div className="footer-address-line-wrapper" style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                        <div className="footer-address-line">
                                            <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0em, 0px)' }}>Quan 3</div>
                                        </div>
                                    </div>
                                    <div className="footer-address-line-wrapper" style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                        <div className="footer-address-line">
                                            <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0em, 0px)' }}>HCMC.</div>
                                        </div>
                                    </div>
                                </a>
                                <div id="footer-contact-socials">
                                    <div className="footer-socials-line-wrapper" style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                        <a className="footer-socials-line" href="https://twitter.com/lusionltd/" target="_blank">
                                            <svg className="footer-socials-line-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" style={{ display: 'inline-block', position: 'relative' }}>
                                                <path fill="#000" fillRule="evenodd" d="M6.948 18.113a.75.75 0 0 1-1.06-1.06l9.885-9.886H8.65a.75.75 0 1 1 0-1.5h9.682v9.682a.75.75 0 0 1-1.5 0v-7.12l-9.884 9.884Z" clipRule="evenodd"></path>
                                            </svg>
                                            <span className="footer-socials-text" style={{ display: 'inline-block', position: 'relative' }}>
                                                <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0em, 0px)' }}>Twitter/X</div>
                                          
                                            </span>
                                        </a>
                                    </div>
                                    <div className="footer-socials-line-wrapper" style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                        <a className="footer-socials-line" href="https://www.instagram.com/lusionltd/" target="_blank">
                                            <svg className="footer-socials-line-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" style={{ display: 'inline-block', position: 'relative' }}>
                                                <path fill="#000" fillRule="evenodd" d="M6.948 18.113a.75.75 0 0 1-1.06-1.06l9.885-9.886H8.65a.75.75 0 1 1 0-1.5h9.682v9.682a.75.75 0 0 1-1.5 0v-7.12l-9.884 9.884Z" clipRule="evenodd"></path>
                                            </svg>
                                            <span className="footer-socials-text" style={{ display: 'inline-block', position: 'relative' }}>
                                                <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0em, 0px)' }}>Instagram</div>
                                            </span>
                                        </a>
                                    </div>
                                    <div className="footer-socials-line-wrapper" style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                        <a className="footer-socials-line" href="https://www.linkedin.com/company/lusionltd/" target="_blank">
                                            <svg className="footer-socials-line-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" style={{ display: 'inline-block', position: 'relative' }}>
                                                <path fill="#000" fillRule="evenodd" d="M6.948 18.113a.75.75 0 0 1-1.06-1.06l9.885-9.886H8.65a.75.75 0 1 1 0-1.5h9.682v9.682a.75.75 0 0 1-1.5 0v-7.12l-9.884 9.884Z" clipRule="evenodd"></path>
                                            </svg>
                                            <span className="footer-socials-text" style={{ display: 'inline-block', position: 'relative' }}>
                                                <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0em, 0px)' }}>Linkedin</div>
                                            </span>
                                        </a>
                                    </div>
                                </div>
                                <div id="footer-contact-enquires">
                                    <div className="footer-enquires-header-wrapper" style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                        <div id="footer-enquires-header">
                                            <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0em, 0px)' }}>Email</div>
                                  
                                        </div>
                                    </div>
                                    <div className="footer-enquires-link-wrapper" style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                        <a id="footer-enquires-link" href="mailto:vphcm@20stu.co">
                                            <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0em, 0px)' }}>hello@lusion.co</div>
                                        </a>
                                    </div>
                                </div>
                                <div id="footer-contact-business">
                                    <div className="footer-business-header-wrapper" style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                        <div id="footer-business-header">
                                            <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0em, 0px)' }}>New</div>
                                            <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0em, 0px)' }}>business</div>
                                        </div>
                                    </div>
                                    <div className="footer-business-link-wrapper" style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                        <a id="footer-business-link" href="mailto:vphcm@20stu.co">
                                            <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0em, 0px)' }}>business@lusion.co</div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div id="footer-middle-newsletter">
                                <div id="footer-newsletter-header">
                                    <div className="footer-newsletter-line-wrapper" style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                        <span className="footer-newsletter-line">
                                            <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0em, 0px)' }}>Subscribe to</div>
                                        </span>
                                    </div>
                                    <div className="footer-newsletter-line-wrapper" style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                        <span className="footer-newsletter-line">
                                            <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0em, 0px)' }}>our newsletter</div>
                                        </span>
                                    </div>
                                </div>
                                <div id="footer-newsletter-input" className="--active">
                                    <div id="footer-newsletter-bg" style={{ transform: 'scale3d(1, 1, 1)' }}></div>
                                    <form id="footer-newsletter-form">
                                        <input id="footer-newsletter-input-field" type="email" name="EMAIL" autoComplete="email" placeholder="Your email" />
                                        <button type="submit" id="footer-newsletter-input-arrow" aria-label="Send newsletter form button" style={{ transform: 'scale(1)' }}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M1.9999 11.9998C1.9999 12.552 2.44762 12.9997 2.9999 12.9997H18.9757C18.8901 13.148 18.7838 13.2876 18.657 13.4144L12.2931 19.7784C11.9025 20.1689 11.9025 20.8021 12.2931 21.1926C12.6836 21.5831 13.3168 21.5831 13.7073 21.1926L22.1926 12.7073C22.5831 12.3168 22.5831 11.6836 22.1926 11.2931L22.1924 11.293L13.7071 2.80767C13.3166 2.41715 12.6834 2.41715 12.2929 2.80767C11.9024 3.1982 11.9024 3.83136 12.2929 4.22189L18.657 10.586C18.7836 10.7126 18.8896 10.8518 18.9752 10.9998H2.9999C2.44762 10.9997 1.9999 11.4475 1.9999 11.9998Z" fill="black"></path>
                                            </svg>
                                        </button>
                                    </form>
                                    <div id="footer-newsletter-feedback-message"></div>
                                </div>
                            </div>
                        </div>
                        <div id="footer-bottom">
                            <div id="footer-bottom-copyright">
                                <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0%, 0px)' }}>20 Creative Studio ©2023</div>
                            </div>
                            <a id="footer-bottom-labs" href="https://labs.lusion.co" target="_blank">
                                <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0%, 0px)' }}>R&amp;D: labs.tadstu.co</div>
                            </a>
                            <div id="footer-bottom-tagline">
                                <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0%, 0px)' }}>Built by TAD with ❤️</div>
                            </div>
                            <div id="footer-bottom-up" style={{ transform: 'scale(1)' }} onClick={handleButtonClick}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" style={{ display: 'inline-block', position: 'relative' }}>
                                    <path fill="#fff" fillRule="evenodd" d="M12 22a1 1 0 0 1-1-1V5.857l-6.223 6.224a1 1 0 0 1-1.415-1.415l7.9-7.9a1 1 0 0 1 1.414 0v.001l7.9 7.9a1 1 0 0 1-1.414 1.414L13 5.919V21a1 1 0 0 1-1 1Z" clipRule="evenodd"></path>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" style={{ display: 'inline-block', position: 'relative' }}>
                                    <path fill="#fff" fillRule="evenodd" d="M12 22a1 1 0 0 1-1-1V5.857l-6.223 6.224a1 1 0 0 1-1.415-1.415l7.9-7.9a1 1 0 0 1 1.414 0v.001l7.9 7.9a1 1 0 0 1-1.414 1.414L13 5.919V21a1 1 0 0 1-1 1Z" clipRule="evenodd"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
    </>
  )
}
