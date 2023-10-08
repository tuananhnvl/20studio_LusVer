"use client"

import { useEffect, useReducer } from 'react'
import Lenis from '@studio-freight/lenis'
import { Canvas, useThree } from '@react-three/fiber'
import { Stats, MeshWobbleMaterial } from '@react-three/drei'
import BallPhysic from "./components/BallPhysic"
import { EffectComposer, N8AO } from "@react-three/postprocessing"
import {
  View,
  Preload,
  OrbitControls,
  PerspectiveCamera,
  Lightformer,
  Environment
} from '@react-three/drei'
import useRefs from 'react-use-refs'
import ListImgMesh from './components/ListImgMesh'
import FooterSpace from './components/FooterSpace'
import { BallLusion } from './components/BallLusion'
export default function Home() {
  const [ref, boxPhysic, trackViewFooter, listItem, view4, view5, view6] = useRefs()
  const listColorBall = ['#4060ff', '#20ffa0', '#ff4060', '#ffcc00']
  const [colorNew, changePropsForCanvas] = useReducer((state) => ++state % listColorBall.length, 0)

  useEffect(() => {
    const lenis = new Lenis()
    lenis.on('scroll', (e) => {
      // console.log(e.scroll)
      localStorage.setItem('posCurrent', e.scroll)
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

  }, [])


  return (

    <>
      <main ref={ref} className="main">
            <header id="header" >
                <div id="header-container" >
                    <div id="header-background" className="" style={{ opacity: 0 }}></div>
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
                        <button id="header-right-sound-btn" style={{ transform: 'translate3d(0px, 0em, 0px)' }}>
                           
                        </button>
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
                        <button id="header-right-menu-btn" aria-label="Menu button" style={{ transform: 'translate3d(0px, 0em, 0px)' }} className="">
                            <div id="header-right-menu-btn-inner">
                                <span id="header-right-menu-btn-text">Menu</span><span id="header-right-menu-btn-text-close">Close</span>
                                <div id="header-right-menu-btn-dots"><span className="header-right-menu-btn-dot"></span><span className="header-right-menu-btn-dot"></span></div>
                            </div>
                        </button>
                    </div>
                    <div id="header-menu" className="" >
                        <div id="header-menu-links" >
                            <a className="header-menu-link --active" data-page="home" href="/">
                                <div className="header-menu-link-background"></div>
                                <div className="header-menu-link-inner">
                                    <span className="header-menu-link-text">Home</span><span className="header-menu-link-text-clone">Home</span>
                                    <svg className="header-menu-link-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.515 12h16.97m0 0L13.01 4.525M20.485 12l-7.475 7.476"></path>
                                    </svg>
                                </div>
                            </a>
                            <a className="header-menu-link" data-page="about" href="/about">
                                <div className="header-menu-link-background"></div>
                                <div className="header-menu-link-inner">
                                    <span className="header-menu-link-text">About us</span><span className="header-menu-link-text-clone">About us</span>
                                    <svg className="header-menu-link-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.515 12h16.97m0 0L13.01 4.525M20.485 12l-7.475 7.476"></path>
                                    </svg>
                                </div>
                            </a>
                            <a className="header-menu-link" data-page="projects" href="/projects">
                                <div className="header-menu-link-background"></div>
                                <div className="header-menu-link-inner">
                                    <span className="header-menu-link-text">Projects</span><span className="header-menu-link-text-clone">Projects</span>
                                    <svg className="header-menu-link-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.515 12h16.97m0 0L13.01 4.525M20.485 12l-7.475 7.476"></path>
                                    </svg>
                                </div>
                            </a>
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
                        <div id="header-menu-newsletter" >
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
                        <button id="header-menu-talk" >
                            <a href="mailto:vphcm@20stu.co"></a>
                            <div id="header-menu-text">Let's talk</div>
                            <svg id="header-menu-talk-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path fill="#fff" d="M0 0h24v24H0z"></path>
                                <rect width="18" height="18" x="3" y="3" stroke="#000" strokeWidth="1.5" rx="2"></rect>
                                <rect width="12" height="4" x="6" y="14" fill="#000" rx="2"></rect>
                                <path stroke="#000" strokeLinecap="round" strokeWidth="1.5" d="M7 7h10M7 10h10"></path>
                            </svg>
                        </button>
                        <a id="header-menu-labs" target="_blank" href="https://labs.lusion.co/" >
                            <div id="header-menu-labs-inner">
                                <div id="header-menu-labs-lucy">
                                    <svg id="header-menu-labs-lucy-svg" xmlns="http://www.w3.org/2000/svg" width="28" height="38" fill="none" viewBox="0 0 28 38">
                                        <path stroke="#fff" strokeWidth="5" d="M20.128 29.65C18.584 31.217 16.532 32 13.972 32c-2.56 0-4.612-.783-6.156-2.35C6.272 28.05 5.5 26 5.5 23.5c0-2.5.772-4.533 2.316-6.1 1.544-1.6 3.596-2.4 6.156-2.4 2.56 0 4.612.8 6.156 2.4C21.71 18.967 22.5 21 22.5 23.5c0 2.5-.79 4.55-2.372 6.15Z"></path>
                                        <path fill="#fff" d="M23.5 4.25a3.25 3.25 0 1 0-6.5 0 3.25 3.25 0 0 0 6.5 0ZM11 4.25a3.25 3.25 0 1 0-6.5 0 3.25 3.25 0 0 0 6.5 0Z"></path>
                                    </svg>
                                </div>
                                <div id="header-menu-labs-texts">
                                    <div id="header-menu-labs-text">Labs</div>
                                    <div id="header-menu-labs-text-clone">Labs</div>
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
            <div id="page-container" >
                <div id="page-container-inner">
                    <div id="home" className="page">
                        <div id="home-hero" className="section">
                            <div id="home-hero-title">
                                Lý thuyết dây là một thuyết hấp dẫn lượng tử, được xây dựng với mục đích thống nhất tất cả các hạt cơ bản cùng các lực cơ bản của tự nhiên, ngay cả lực hấp dẫn.
                            </div>
                            <div id="home-hero-visual-container" ref={boxPhysic} onClick={changePropsForCanvas}></div>
                            <div id="home-hero-scroll-container">
                                <div id="home-hero-scroll-container-crosses">
                                    <div className="home-hero-scroll-container-cross" ></div>
                                    <div className="home-hero-scroll-container-cross" ></div>
                                    <div className="home-hero-scroll-container-cross" ></div>
                                    <div className="home-hero-scroll-container-cross" ></div>
                                </div>
                                <div id="home-hero-scroll">
                                    Scroll to explore
                                </div>
                            </div>
                        </div>
                        <div id="home-reel" className="section">
                            <h4 id="home-reel-title">
                                <div id="home-reel-title-inner" style={{ transform: 'translate3d(0px, -21.91px, 0px)' }}>
                                    Beyond Visions Cloth
                                </div>
                            </h4>
                            <div id="home-reel-content">
                                <div id="home-reel-desc" style={{ transform: 'translate3d(0px, -48px, 0px)' }}>
                                    Được dịch từ tiếng Anh-Trong xuất bản và thiết kế đồ họa, Lorem ipsum là một văn bản giữ chỗ thường được sử dụng để thể hiện hình thức trực quan của tài liệu hoặc kiểu chữ mà không dựa vào nội dung có ý nghĩa. Lorem ipsum có thể được sử dụng làm trình giữ chỗ trước khi có bản sao cuối cùng.
                                </div>
                                <a id="home-reel-cta" href="/about" target="_blank" style={{ transform: 'translateY(-20.9px) translate3d(0px, 0%, 0px) rotate(0deg)', opacity: 1 }}>
                                    <span id="home-reel-cta-dot"></span><span id="home-reel-cta-text">About us</span>
                                    <span id="home-reel-cta-arrow">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                                            <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.343 8h11.314m0 0L8.673 3.016M13.657 8l-4.984 4.984"></path>
                                        </svg>
                                    </span>
                                </a>
                            </div>
                            <div id="home-reel-thumb-wrapper">
                                <div id="home-reel-thumb">
                                </div>
                            </div>
                            <div id="home-reel-container">
                                <div id="home-reel-container-inner">
                                    <div id="home-reel-video-container" style={{ height: '532.2px', marginTop: '48.2px', transform: 'translate3d(0px, 0px, 0px)' }} className="--is-visible">
                                        <div id="home-reel-video-container-decoration">
                                            <div id="home-reel-video-container-top">
                                                <div id="home-reel-video-container-crosses">
                                                    <div className="home-reel-video-container-cross" style={{ transform: 'translate3d(0px, 0em, 0px) scale(1) rotate(0deg)' }}></div>
                                                    <div className="home-reel-video-container-cross" style={{ transform: 'translate3d(0px, 0em, 0px) scale(1) rotate(0deg)' }}></div>
                                                    <div className="home-reel-video-container-cross" style={{ transform: 'translate3d(0px, 0em, 0px) scale(1) rotate(0deg)' }}></div>
                                                    <div className="home-reel-video-container-cross" style={{ transform: 'translate3d(0px, 0em, 0px) scale(1) rotate(0deg)' }}></div>
                                                    <div className="home-reel-video-container-cross" style={{ transform: 'translate3d(0px, 0em, 0px) scale(1) rotate(0deg)' }}></div>
                                                </div>
                                                <div className="home-reel-video-container-svgs">
                                                    <div className="home-reel-video-container-svg-wrapper" style={{ transform: ' translate3d(0px, 0px, 0px)' }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="132" height="14" fill="none" viewBox="0 0 132 14" style={{ transform: 'translate3d(0px, 1.2em, 0px)' }}>
                                                            <path fill="#000" d="M.861 1.844a.889.889 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777V1.844H.861Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312ZM61.142 1.3c.736 0 1.387.144 1.952.432.565.277.997.677 1.296 1.2.31.512.464 1.115.464 1.808 0 .693-.155 1.301-.464 1.824a3.15 3.15 0 0 1-1.312 1.216c-.555.277-1.2.416-1.936.416H58.23V12.5h-1.392V1.3h4.304ZM58.23 6.916h2.784c.736 0 1.323-.197 1.76-.592.437-.395.656-.923.656-1.584s-.219-1.184-.656-1.568c-.427-.395-1.008-.592-1.744-.592h-2.8v4.336Zm8.108 5.584V1.3h1.392v9.92h5.104v1.28h-6.496Zm7.197 0 4.272-11.2h1.648l4.256 11.2h-1.488l-1.184-3.024h-4.88L74.975 12.5h-1.44Zm3.04-4.288h4.048L78.591 2.82l-2.016 5.392Zm5.694-6.928h1.632l3.296 5.568 3.344-5.568h1.568l-4.224 7.072V12.5h-1.392V8.356l-4.224-7.072Zm19.545.016c.736 0 1.386.144 1.952.432.547.26 1.004.679 1.312 1.2.309.512.464 1.115.464 1.808 0 .779-.219 1.456-.657 2.032-.426.565-1.002.95-1.727 1.152l2.512 4.576h-1.568l-2.32-4.304h-2.864V12.5h-1.393V1.3h4.289Zm-2.896 5.616h2.784c.736 0 1.322-.197 1.76-.592.437-.395.656-.923.656-1.584 0-.65-.219-1.173-.656-1.568-.438-.395-1.019-.592-1.744-.592h-2.8v4.336Zm8.389-5.616h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 0h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 11.2V1.3h1.392v9.92h5.104v1.28h-6.496Z"></path>
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="132" height="14" fill="none" viewBox="0 0 132 14" style={{ transform: 'translate3d(0px, 1.2em, 0px)' }}>
                                                            <path fill="#000" d="M.861 1.844a.889.889 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777V1.844H.861Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312ZM61.142 1.3c.736 0 1.387.144 1.952.432.565.277.997.677 1.296 1.2.31.512.464 1.115.464 1.808 0 .693-.155 1.301-.464 1.824a3.15 3.15 0 0 1-1.312 1.216c-.555.277-1.2.416-1.936.416H58.23V12.5h-1.392V1.3h4.304ZM58.23 6.916h2.784c.736 0 1.323-.197 1.76-.592.437-.395.656-.923.656-1.584s-.219-1.184-.656-1.568c-.427-.395-1.008-.592-1.744-.592h-2.8v4.336Zm8.108 5.584V1.3h1.392v9.92h5.104v1.28h-6.496Zm7.197 0 4.272-11.2h1.648l4.256 11.2h-1.488l-1.184-3.024h-4.88L74.975 12.5h-1.44Zm3.04-4.288h4.048L78.591 2.82l-2.016 5.392Zm5.694-6.928h1.632l3.296 5.568 3.344-5.568h1.568l-4.224 7.072V12.5h-1.392V8.356l-4.224-7.072Zm19.545.016c.736 0 1.386.144 1.952.432.547.26 1.004.679 1.312 1.2.309.512.464 1.115.464 1.808 0 .779-.219 1.456-.657 2.032-.426.565-1.002.95-1.727 1.152l2.512 4.576h-1.568l-2.32-4.304h-2.864V12.5h-1.393V1.3h4.289Zm-2.896 5.616h2.784c.736 0 1.322-.197 1.76-.592.437-.395.656-.923.656-1.584 0-.65-.219-1.173-.656-1.568-.438-.395-1.019-.592-1.744-.592h-2.8v4.336Zm8.389-5.616h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 0h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 11.2V1.3h1.392v9.92h5.104v1.28h-6.496Z"></path>
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="132" height="14" fill="none" viewBox="0 0 132 14" style={{ transform: 'translate3d(0px, 1.2em, 0px)' }}>
                                                            <path fill="#000" d="M.861 1.844a.889.889 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777V1.844H.861Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312ZM61.142 1.3c.736 0 1.387.144 1.952.432.565.277.997.677 1.296 1.2.31.512.464 1.115.464 1.808 0 .693-.155 1.301-.464 1.824a3.15 3.15 0 0 1-1.312 1.216c-.555.277-1.2.416-1.936.416H58.23V12.5h-1.392V1.3h4.304ZM58.23 6.916h2.784c.736 0 1.323-.197 1.76-.592.437-.395.656-.923.656-1.584s-.219-1.184-.656-1.568c-.427-.395-1.008-.592-1.744-.592h-2.8v4.336Zm8.108 5.584V1.3h1.392v9.92h5.104v1.28h-6.496Zm7.197 0 4.272-11.2h1.648l4.256 11.2h-1.488l-1.184-3.024h-4.88L74.975 12.5h-1.44Zm3.04-4.288h4.048L78.591 2.82l-2.016 5.392Zm5.694-6.928h1.632l3.296 5.568 3.344-5.568h1.568l-4.224 7.072V12.5h-1.392V8.356l-4.224-7.072Zm19.545.016c.736 0 1.386.144 1.952.432.547.26 1.004.679 1.312 1.2.309.512.464 1.115.464 1.808 0 .779-.219 1.456-.657 2.032-.426.565-1.002.95-1.727 1.152l2.512 4.576h-1.568l-2.32-4.304h-2.864V12.5h-1.393V1.3h4.289Zm-2.896 5.616h2.784c.736 0 1.322-.197 1.76-.592.437-.395.656-.923.656-1.584 0-.65-.219-1.173-.656-1.568-.438-.395-1.019-.592-1.744-.592h-2.8v4.336Zm8.389-5.616h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 0h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 11.2V1.3h1.392v9.92h5.104v1.28h-6.496Z"></path>
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="132" height="14" fill="none" viewBox="0 0 132 14" style={{ transform: 'translate3d(0px, 1.2em, 0px)' }}>
                                                            <path fill="#000" d="M.861 1.844a.889.889 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777V1.844H.861Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312ZM61.142 1.3c.736 0 1.387.144 1.952.432.565.277.997.677 1.296 1.2.31.512.464 1.115.464 1.808 0 .693-.155 1.301-.464 1.824a3.15 3.15 0 0 1-1.312 1.216c-.555.277-1.2.416-1.936.416H58.23V12.5h-1.392V1.3h4.304ZM58.23 6.916h2.784c.736 0 1.323-.197 1.76-.592.437-.395.656-.923.656-1.584s-.219-1.184-.656-1.568c-.427-.395-1.008-.592-1.744-.592h-2.8v4.336Zm8.108 5.584V1.3h1.392v9.92h5.104v1.28h-6.496Zm7.197 0 4.272-11.2h1.648l4.256 11.2h-1.488l-1.184-3.024h-4.88L74.975 12.5h-1.44Zm3.04-4.288h4.048L78.591 2.82l-2.016 5.392Zm5.694-6.928h1.632l3.296 5.568 3.344-5.568h1.568l-4.224 7.072V12.5h-1.392V8.356l-4.224-7.072Zm19.545.016c.736 0 1.386.144 1.952.432.547.26 1.004.679 1.312 1.2.309.512.464 1.115.464 1.808 0 .779-.219 1.456-.657 2.032-.426.565-1.002.95-1.727 1.152l2.512 4.576h-1.568l-2.32-4.304h-2.864V12.5h-1.393V1.3h4.289Zm-2.896 5.616h2.784c.736 0 1.322-.197 1.76-.592.437-.395.656-.923.656-1.584 0-.65-.219-1.173-.656-1.568-.438-.395-1.019-.592-1.744-.592h-2.8v4.336Zm8.389-5.616h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 0h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 11.2V1.3h1.392v9.92h5.104v1.28h-6.496Z"></path>
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="132" height="14" fill="none" viewBox="0 0 132 14" style={{ transform: 'translate3d(0px, 1.2em, 0px)' }}>
                                                            <path fill="#000" d="M.861 1.844a.889.889 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777V1.844H.861Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312ZM61.142 1.3c.736 0 1.387.144 1.952.432.565.277.997.677 1.296 1.2.31.512.464 1.115.464 1.808 0 .693-.155 1.301-.464 1.824a3.15 3.15 0 0 1-1.312 1.216c-.555.277-1.2.416-1.936.416H58.23V12.5h-1.392V1.3h4.304ZM58.23 6.916h2.784c.736 0 1.323-.197 1.76-.592.437-.395.656-.923.656-1.584s-.219-1.184-.656-1.568c-.427-.395-1.008-.592-1.744-.592h-2.8v4.336Zm8.108 5.584V1.3h1.392v9.92h5.104v1.28h-6.496Zm7.197 0 4.272-11.2h1.648l4.256 11.2h-1.488l-1.184-3.024h-4.88L74.975 12.5h-1.44Zm3.04-4.288h4.048L78.591 2.82l-2.016 5.392Zm5.694-6.928h1.632l3.296 5.568 3.344-5.568h1.568l-4.224 7.072V12.5h-1.392V8.356l-4.224-7.072Zm19.545.016c.736 0 1.386.144 1.952.432.547.26 1.004.679 1.312 1.2.309.512.464 1.115.464 1.808 0 .779-.219 1.456-.657 2.032-.426.565-1.002.95-1.727 1.152l2.512 4.576h-1.568l-2.32-4.304h-2.864V12.5h-1.393V1.3h4.289Zm-2.896 5.616h2.784c.736 0 1.322-.197 1.76-.592.437-.395.656-.923.656-1.584 0-.65-.219-1.173-.656-1.568-.438-.395-1.019-.592-1.744-.592h-2.8v4.336Zm8.389-5.616h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 0h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 11.2V1.3h1.392v9.92h5.104v1.28h-6.496Z"></path>
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="132" height="14" fill="none" viewBox="0 0 132 14" style={{ transform: 'translate3d(0px, 1.2em, 0px)' }}>
                                                            <path fill="#000" d="M.861 1.844a.889.889 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777V1.844H.861Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312ZM61.142 1.3c.736 0 1.387.144 1.952.432.565.277.997.677 1.296 1.2.31.512.464 1.115.464 1.808 0 .693-.155 1.301-.464 1.824a3.15 3.15 0 0 1-1.312 1.216c-.555.277-1.2.416-1.936.416H58.23V12.5h-1.392V1.3h4.304ZM58.23 6.916h2.784c.736 0 1.323-.197 1.76-.592.437-.395.656-.923.656-1.584s-.219-1.184-.656-1.568c-.427-.395-1.008-.592-1.744-.592h-2.8v4.336Zm8.108 5.584V1.3h1.392v9.92h5.104v1.28h-6.496Zm7.197 0 4.272-11.2h1.648l4.256 11.2h-1.488l-1.184-3.024h-4.88L74.975 12.5h-1.44Zm3.04-4.288h4.048L78.591 2.82l-2.016 5.392Zm5.694-6.928h1.632l3.296 5.568 3.344-5.568h1.568l-4.224 7.072V12.5h-1.392V8.356l-4.224-7.072Zm19.545.016c.736 0 1.386.144 1.952.432.547.26 1.004.679 1.312 1.2.309.512.464 1.115.464 1.808 0 .779-.219 1.456-.657 2.032-.426.565-1.002.95-1.727 1.152l2.512 4.576h-1.568l-2.32-4.304h-2.864V12.5h-1.393V1.3h4.289Zm-2.896 5.616h2.784c.736 0 1.322-.197 1.76-.592.437-.395.656-.923.656-1.584 0-.65-.219-1.173-.656-1.568-.438-.395-1.019-.592-1.744-.592h-2.8v4.336Zm8.389-5.616h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 0h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 11.2V1.3h1.392v9.92h5.104v1.28h-6.496Z"></path>
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="132" height="14" fill="none" viewBox="0 0 132 14" style={{ transform: 'translate3d(0px, 1.2em, 0px)' }}>
                                                            <path fill="#000" d="M.861 1.844a.889.889 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777V1.844H.861Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312ZM61.142 1.3c.736 0 1.387.144 1.952.432.565.277.997.677 1.296 1.2.31.512.464 1.115.464 1.808 0 .693-.155 1.301-.464 1.824a3.15 3.15 0 0 1-1.312 1.216c-.555.277-1.2.416-1.936.416H58.23V12.5h-1.392V1.3h4.304ZM58.23 6.916h2.784c.736 0 1.323-.197 1.76-.592.437-.395.656-.923.656-1.584s-.219-1.184-.656-1.568c-.427-.395-1.008-.592-1.744-.592h-2.8v4.336Zm8.108 5.584V1.3h1.392v9.92h5.104v1.28h-6.496Zm7.197 0 4.272-11.2h1.648l4.256 11.2h-1.488l-1.184-3.024h-4.88L74.975 12.5h-1.44Zm3.04-4.288h4.048L78.591 2.82l-2.016 5.392Zm5.694-6.928h1.632l3.296 5.568 3.344-5.568h1.568l-4.224 7.072V12.5h-1.392V8.356l-4.224-7.072Zm19.545.016c.736 0 1.386.144 1.952.432.547.26 1.004.679 1.312 1.2.309.512.464 1.115.464 1.808 0 .779-.219 1.456-.657 2.032-.426.565-1.002.95-1.727 1.152l2.512 4.576h-1.568l-2.32-4.304h-2.864V12.5h-1.393V1.3h4.289Zm-2.896 5.616h2.784c.736 0 1.322-.197 1.76-.592.437-.395.656-.923.656-1.584 0-.65-.219-1.173-.656-1.568-.438-.395-1.019-.592-1.744-.592h-2.8v4.336Zm8.389-5.616h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 0h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 11.2V1.3h1.392v9.92h5.104v1.28h-6.496Z"></path>
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="132" height="14" fill="none" viewBox="0 0 132 14" style={{ transform: 'translate3d(0px, 1.2em, 0px)' }}>
                                                            <path fill="#000" d="M.861 1.844a.889.889 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777V1.844H.861Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312ZM61.142 1.3c.736 0 1.387.144 1.952.432.565.277.997.677 1.296 1.2.31.512.464 1.115.464 1.808 0 .693-.155 1.301-.464 1.824a3.15 3.15 0 0 1-1.312 1.216c-.555.277-1.2.416-1.936.416H58.23V12.5h-1.392V1.3h4.304ZM58.23 6.916h2.784c.736 0 1.323-.197 1.76-.592.437-.395.656-.923.656-1.584s-.219-1.184-.656-1.568c-.427-.395-1.008-.592-1.744-.592h-2.8v4.336Zm8.108 5.584V1.3h1.392v9.92h5.104v1.28h-6.496Zm7.197 0 4.272-11.2h1.648l4.256 11.2h-1.488l-1.184-3.024h-4.88L74.975 12.5h-1.44Zm3.04-4.288h4.048L78.591 2.82l-2.016 5.392Zm5.694-6.928h1.632l3.296 5.568 3.344-5.568h1.568l-4.224 7.072V12.5h-1.392V8.356l-4.224-7.072Zm19.545.016c.736 0 1.386.144 1.952.432.547.26 1.004.679 1.312 1.2.309.512.464 1.115.464 1.808 0 .779-.219 1.456-.657 2.032-.426.565-1.002.95-1.727 1.152l2.512 4.576h-1.568l-2.32-4.304h-2.864V12.5h-1.393V1.3h4.289Zm-2.896 5.616h2.784c.736 0 1.322-.197 1.76-.592.437-.395.656-.923.656-1.584 0-.65-.219-1.173-.656-1.568-.438-.395-1.019-.592-1.744-.592h-2.8v4.336Zm8.389-5.616h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 0h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 11.2V1.3h1.392v9.92h5.104v1.28h-6.496Z"></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="home-reel-video-container-bottom">
                                                <div id="home-reel-video-container-crosses">
                                                    <div className="home-reel-video-container-cross" style={{ transform: 'translate3d(0px, 0em, 0px) scale(1) rotate(0deg)' }}></div>
                                                    <div className="home-reel-video-container-cross" style={{ transform: 'translate3d(0px, 0em, 0px) scale(1) rotate(0deg)' }}></div>
                                                    <div className="home-reel-video-container-cross" style={{ transform: 'translate3d(0px, 0em, 0px) scale(1) rotate(0deg)' }}></div>
                                                    <div className="home-reel-video-container-cross" style={{ transform: 'translate3d(0px, 0em, 0px) scale(1) rotate(0deg)' }}></div>
                                                    <div className="home-reel-video-container-cross" style={{ transform: 'translate3d(0px, 0em, 0px) scale(1) rotate(0deg)' }}></div>
                                                </div>
                                                <div className="home-reel-video-container-svgs">
                                                    <div className="home-reel-video-container-svg-wrapper" style={{ transform: 'translate3d(-1296px, 0px, 0px)' }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="132" height="14" fill="none" viewBox="0 0 132 14" style={{ transform: 'translate3d(0px, 1.2em, 0px)' }}>
                                                            <path fill="#000" d="M.861 1.844a.889.889 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777V1.844H.861Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312ZM61.142 1.3c.736 0 1.387.144 1.952.432.565.277.997.677 1.296 1.2.31.512.464 1.115.464 1.808 0 .693-.155 1.301-.464 1.824a3.15 3.15 0 0 1-1.312 1.216c-.555.277-1.2.416-1.936.416H58.23V12.5h-1.392V1.3h4.304ZM58.23 6.916h2.784c.736 0 1.323-.197 1.76-.592.437-.395.656-.923.656-1.584s-.219-1.184-.656-1.568c-.427-.395-1.008-.592-1.744-.592h-2.8v4.336Zm8.108 5.584V1.3h1.392v9.92h5.104v1.28h-6.496Zm7.197 0 4.272-11.2h1.648l4.256 11.2h-1.488l-1.184-3.024h-4.88L74.975 12.5h-1.44Zm3.04-4.288h4.048L78.591 2.82l-2.016 5.392Zm5.694-6.928h1.632l3.296 5.568 3.344-5.568h1.568l-4.224 7.072V12.5h-1.392V8.356l-4.224-7.072Zm19.545.016c.736 0 1.386.144 1.952.432.547.26 1.004.679 1.312 1.2.309.512.464 1.115.464 1.808 0 .779-.219 1.456-.657 2.032-.426.565-1.002.95-1.727 1.152l2.512 4.576h-1.568l-2.32-4.304h-2.864V12.5h-1.393V1.3h4.289Zm-2.896 5.616h2.784c.736 0 1.322-.197 1.76-.592.437-.395.656-.923.656-1.584 0-.65-.219-1.173-.656-1.568-.438-.395-1.019-.592-1.744-.592h-2.8v4.336Zm8.389-5.616h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 0h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 11.2V1.3h1.392v9.92h5.104v1.28h-6.496Z"></path>
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="132" height="14" fill="none" viewBox="0 0 132 14" style={{ transform: 'translate3d(0px, 1.2em, 0px)' }}>
                                                            <path fill="#000" d="M.861 1.844a.889.889 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777V1.844H.861Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312ZM61.142 1.3c.736 0 1.387.144 1.952.432.565.277.997.677 1.296 1.2.31.512.464 1.115.464 1.808 0 .693-.155 1.301-.464 1.824a3.15 3.15 0 0 1-1.312 1.216c-.555.277-1.2.416-1.936.416H58.23V12.5h-1.392V1.3h4.304ZM58.23 6.916h2.784c.736 0 1.323-.197 1.76-.592.437-.395.656-.923.656-1.584s-.219-1.184-.656-1.568c-.427-.395-1.008-.592-1.744-.592h-2.8v4.336Zm8.108 5.584V1.3h1.392v9.92h5.104v1.28h-6.496Zm7.197 0 4.272-11.2h1.648l4.256 11.2h-1.488l-1.184-3.024h-4.88L74.975 12.5h-1.44Zm3.04-4.288h4.048L78.591 2.82l-2.016 5.392Zm5.694-6.928h1.632l3.296 5.568 3.344-5.568h1.568l-4.224 7.072V12.5h-1.392V8.356l-4.224-7.072Zm19.545.016c.736 0 1.386.144 1.952.432.547.26 1.004.679 1.312 1.2.309.512.464 1.115.464 1.808 0 .779-.219 1.456-.657 2.032-.426.565-1.002.95-1.727 1.152l2.512 4.576h-1.568l-2.32-4.304h-2.864V12.5h-1.393V1.3h4.289Zm-2.896 5.616h2.784c.736 0 1.322-.197 1.76-.592.437-.395.656-.923.656-1.584 0-.65-.219-1.173-.656-1.568-.438-.395-1.019-.592-1.744-.592h-2.8v4.336Zm8.389-5.616h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 0h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 11.2V1.3h1.392v9.92h5.104v1.28h-6.496Z"></path>
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="132" height="14" fill="none" viewBox="0 0 132 14" style={{ transform: 'translate3d(0px, 1.2em, 0px)' }}>
                                                            <path fill="#000" d="M.861 1.844a.889.889 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777V1.844H.861Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312ZM61.142 1.3c.736 0 1.387.144 1.952.432.565.277.997.677 1.296 1.2.31.512.464 1.115.464 1.808 0 .693-.155 1.301-.464 1.824a3.15 3.15 0 0 1-1.312 1.216c-.555.277-1.2.416-1.936.416H58.23V12.5h-1.392V1.3h4.304ZM58.23 6.916h2.784c.736 0 1.323-.197 1.76-.592.437-.395.656-.923.656-1.584s-.219-1.184-.656-1.568c-.427-.395-1.008-.592-1.744-.592h-2.8v4.336Zm8.108 5.584V1.3h1.392v9.92h5.104v1.28h-6.496Zm7.197 0 4.272-11.2h1.648l4.256 11.2h-1.488l-1.184-3.024h-4.88L74.975 12.5h-1.44Zm3.04-4.288h4.048L78.591 2.82l-2.016 5.392Zm5.694-6.928h1.632l3.296 5.568 3.344-5.568h1.568l-4.224 7.072V12.5h-1.392V8.356l-4.224-7.072Zm19.545.016c.736 0 1.386.144 1.952.432.547.26 1.004.679 1.312 1.2.309.512.464 1.115.464 1.808 0 .779-.219 1.456-.657 2.032-.426.565-1.002.95-1.727 1.152l2.512 4.576h-1.568l-2.32-4.304h-2.864V12.5h-1.393V1.3h4.289Zm-2.896 5.616h2.784c.736 0 1.322-.197 1.76-.592.437-.395.656-.923.656-1.584 0-.65-.219-1.173-.656-1.568-.438-.395-1.019-.592-1.744-.592h-2.8v4.336Zm8.389-5.616h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 0h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 11.2V1.3h1.392v9.92h5.104v1.28h-6.496Z"></path>
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="132" height="14" fill="none" viewBox="0 0 132 14" style={{ transform: 'translate3d(0px, 1.2em, 0px)' }}>
                                                            <path fill="#000" d="M.861 1.844a.889.889 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777V1.844H.861Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312ZM61.142 1.3c.736 0 1.387.144 1.952.432.565.277.997.677 1.296 1.2.31.512.464 1.115.464 1.808 0 .693-.155 1.301-.464 1.824a3.15 3.15 0 0 1-1.312 1.216c-.555.277-1.2.416-1.936.416H58.23V12.5h-1.392V1.3h4.304ZM58.23 6.916h2.784c.736 0 1.323-.197 1.76-.592.437-.395.656-.923.656-1.584s-.219-1.184-.656-1.568c-.427-.395-1.008-.592-1.744-.592h-2.8v4.336Zm8.108 5.584V1.3h1.392v9.92h5.104v1.28h-6.496Zm7.197 0 4.272-11.2h1.648l4.256 11.2h-1.488l-1.184-3.024h-4.88L74.975 12.5h-1.44Zm3.04-4.288h4.048L78.591 2.82l-2.016 5.392Zm5.694-6.928h1.632l3.296 5.568 3.344-5.568h1.568l-4.224 7.072V12.5h-1.392V8.356l-4.224-7.072Zm19.545.016c.736 0 1.386.144 1.952.432.547.26 1.004.679 1.312 1.2.309.512.464 1.115.464 1.808 0 .779-.219 1.456-.657 2.032-.426.565-1.002.95-1.727 1.152l2.512 4.576h-1.568l-2.32-4.304h-2.864V12.5h-1.393V1.3h4.289Zm-2.896 5.616h2.784c.736 0 1.322-.197 1.76-.592.437-.395.656-.923.656-1.584 0-.65-.219-1.173-.656-1.568-.438-.395-1.019-.592-1.744-.592h-2.8v4.336Zm8.389-5.616h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 0h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 11.2V1.3h1.392v9.92h5.104v1.28h-6.496Z"></path>
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="132" height="14" fill="none" viewBox="0 0 132 14" style={{ transform: 'translate3d(0px, 1.2em, 0px)' }}>
                                                            <path fill="#000" d="M.861 1.844a.889.889 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777V1.844H.861Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312ZM61.142 1.3c.736 0 1.387.144 1.952.432.565.277.997.677 1.296 1.2.31.512.464 1.115.464 1.808 0 .693-.155 1.301-.464 1.824a3.15 3.15 0 0 1-1.312 1.216c-.555.277-1.2.416-1.936.416H58.23V12.5h-1.392V1.3h4.304ZM58.23 6.916h2.784c.736 0 1.323-.197 1.76-.592.437-.395.656-.923.656-1.584s-.219-1.184-.656-1.568c-.427-.395-1.008-.592-1.744-.592h-2.8v4.336Zm8.108 5.584V1.3h1.392v9.92h5.104v1.28h-6.496Zm7.197 0 4.272-11.2h1.648l4.256 11.2h-1.488l-1.184-3.024h-4.88L74.975 12.5h-1.44Zm3.04-4.288h4.048L78.591 2.82l-2.016 5.392Zm5.694-6.928h1.632l3.296 5.568 3.344-5.568h1.568l-4.224 7.072V12.5h-1.392V8.356l-4.224-7.072Zm19.545.016c.736 0 1.386.144 1.952.432.547.26 1.004.679 1.312 1.2.309.512.464 1.115.464 1.808 0 .779-.219 1.456-.657 2.032-.426.565-1.002.95-1.727 1.152l2.512 4.576h-1.568l-2.32-4.304h-2.864V12.5h-1.393V1.3h4.289Zm-2.896 5.616h2.784c.736 0 1.322-.197 1.76-.592.437-.395.656-.923.656-1.584 0-.65-.219-1.173-.656-1.568-.438-.395-1.019-.592-1.744-.592h-2.8v4.336Zm8.389-5.616h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 0h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 11.2V1.3h1.392v9.92h5.104v1.28h-6.496Z"></path>
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="132" height="14" fill="none" viewBox="0 0 132 14" style={{ transform: 'translate3d(0px, 1.2em, 0px)' }}>
                                                            <path fill="#000" d="M.861 1.844a.889.889 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777V1.844H.861Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312ZM61.142 1.3c.736 0 1.387.144 1.952.432.565.277.997.677 1.296 1.2.31.512.464 1.115.464 1.808 0 .693-.155 1.301-.464 1.824a3.15 3.15 0 0 1-1.312 1.216c-.555.277-1.2.416-1.936.416H58.23V12.5h-1.392V1.3h4.304ZM58.23 6.916h2.784c.736 0 1.323-.197 1.76-.592.437-.395.656-.923.656-1.584s-.219-1.184-.656-1.568c-.427-.395-1.008-.592-1.744-.592h-2.8v4.336Zm8.108 5.584V1.3h1.392v9.92h5.104v1.28h-6.496Zm7.197 0 4.272-11.2h1.648l4.256 11.2h-1.488l-1.184-3.024h-4.88L74.975 12.5h-1.44Zm3.04-4.288h4.048L78.591 2.82l-2.016 5.392Zm5.694-6.928h1.632l3.296 5.568 3.344-5.568h1.568l-4.224 7.072V12.5h-1.392V8.356l-4.224-7.072Zm19.545.016c.736 0 1.386.144 1.952.432.547.26 1.004.679 1.312 1.2.309.512.464 1.115.464 1.808 0 .779-.219 1.456-.657 2.032-.426.565-1.002.95-1.727 1.152l2.512 4.576h-1.568l-2.32-4.304h-2.864V12.5h-1.393V1.3h4.289Zm-2.896 5.616h2.784c.736 0 1.322-.197 1.76-.592.437-.395.656-.923.656-1.584 0-.65-.219-1.173-.656-1.568-.438-.395-1.019-.592-1.744-.592h-2.8v4.336Zm8.389-5.616h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 0h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 11.2V1.3h1.392v9.92h5.104v1.28h-6.496Z"></path>
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="132" height="14" fill="none" viewBox="0 0 132 14" style={{ transform: 'translate3d(0px, 1.2em, 0px)' }}>
                                                            <path fill="#000" d="M.861 1.844a.889.889 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777V1.844H.861Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312ZM61.142 1.3c.736 0 1.387.144 1.952.432.565.277.997.677 1.296 1.2.31.512.464 1.115.464 1.808 0 .693-.155 1.301-.464 1.824a3.15 3.15 0 0 1-1.312 1.216c-.555.277-1.2.416-1.936.416H58.23V12.5h-1.392V1.3h4.304ZM58.23 6.916h2.784c.736 0 1.323-.197 1.76-.592.437-.395.656-.923.656-1.584s-.219-1.184-.656-1.568c-.427-.395-1.008-.592-1.744-.592h-2.8v4.336Zm8.108 5.584V1.3h1.392v9.92h5.104v1.28h-6.496Zm7.197 0 4.272-11.2h1.648l4.256 11.2h-1.488l-1.184-3.024h-4.88L74.975 12.5h-1.44Zm3.04-4.288h4.048L78.591 2.82l-2.016 5.392Zm5.694-6.928h1.632l3.296 5.568 3.344-5.568h1.568l-4.224 7.072V12.5h-1.392V8.356l-4.224-7.072Zm19.545.016c.736 0 1.386.144 1.952.432.547.26 1.004.679 1.312 1.2.309.512.464 1.115.464 1.808 0 .779-.219 1.456-.657 2.032-.426.565-1.002.95-1.727 1.152l2.512 4.576h-1.568l-2.32-4.304h-2.864V12.5h-1.393V1.3h4.289Zm-2.896 5.616h2.784c.736 0 1.322-.197 1.76-.592.437-.395.656-.923.656-1.584 0-.65-.219-1.173-.656-1.568-.438-.395-1.019-.592-1.744-.592h-2.8v4.336Zm8.389-5.616h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 0h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 11.2V1.3h1.392v9.92h5.104v1.28h-6.496Z"></path>
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="132" height="14" fill="none" viewBox="0 0 132 14" style={{ transform: 'translate3d(0px, 1.2em, 0px)' }}>
                                                            <path fill="#000" d="M.861 1.844a.889.889 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777V1.844H.861Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312Zm16 0a.888.888 0 0 1 1.32-.777l9.282 5.156a.89.89 0 0 1 0 1.554l-9.281 5.156a.889.889 0 0 1-1.32-.777l-.001-10.312ZM61.142 1.3c.736 0 1.387.144 1.952.432.565.277.997.677 1.296 1.2.31.512.464 1.115.464 1.808 0 .693-.155 1.301-.464 1.824a3.15 3.15 0 0 1-1.312 1.216c-.555.277-1.2.416-1.936.416H58.23V12.5h-1.392V1.3h4.304ZM58.23 6.916h2.784c.736 0 1.323-.197 1.76-.592.437-.395.656-.923.656-1.584s-.219-1.184-.656-1.568c-.427-.395-1.008-.592-1.744-.592h-2.8v4.336Zm8.108 5.584V1.3h1.392v9.92h5.104v1.28h-6.496Zm7.197 0 4.272-11.2h1.648l4.256 11.2h-1.488l-1.184-3.024h-4.88L74.975 12.5h-1.44Zm3.04-4.288h4.048L78.591 2.82l-2.016 5.392Zm5.694-6.928h1.632l3.296 5.568 3.344-5.568h1.568l-4.224 7.072V12.5h-1.392V8.356l-4.224-7.072Zm19.545.016c.736 0 1.386.144 1.952.432.547.26 1.004.679 1.312 1.2.309.512.464 1.115.464 1.808 0 .779-.219 1.456-.657 2.032-.426.565-1.002.95-1.727 1.152l2.512 4.576h-1.568l-2.32-4.304h-2.864V12.5h-1.393V1.3h4.289Zm-2.896 5.616h2.784c.736 0 1.322-.197 1.76-.592.437-.395.656-.923.656-1.584 0-.65-.219-1.173-.656-1.568-.438-.395-1.019-.592-1.744-.592h-2.8v4.336Zm8.389-5.616h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 0h7.136v1.28h-5.744v3.584h4.784v1.28h-4.784v3.776h5.952v1.28h-7.344V1.3Zm8.906 11.2V1.3h1.392v9.92h5.104v1.28h-6.496Z"></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="home-reel-video-placeholder">
                                            <div id="home-reel-video-title">
                                                <div className="home-reel-video-title-word" style={{ display: 'inline-block' }}>
                                                    <div className="char-wrapper" style={{ display: 'inline-block', transform: 'translate3d(0px, 0%, 0px)' }}>
                                                        <div className="char" style={{ display: 'inline-block', transform: 'translate3d(0px, 0px, 0px)' }}>P</div>
                                                        <div className="char" style={{ display: 'inline-block' }}>P</div>
                                                    </div>
                                                    <div className="char-wrapper" style={{ display: 'inline-block', transform: 'translate3d(0px, 0%, 0px)' }}>
                                                        <div className="char" style={{ display: 'inline-block', transform: 'translate3d(0px, 0px, 0px)' }}>l</div>
                                                        <div className="char" style={{ display: 'inline-block' }}>l</div>
                                                    </div>
                                                    <div className="char-wrapper" style={{ display: 'inline-block', transform: 'translate3d(0px, 0%, 0px)' }}>
                                                        <div className="char" style={{ display: 'inline-block', transform: 'translate3d(0px, 0px, 0px)' }}>a</div>
                                                        <div className="char" style={{ display: 'inline-block' }}>a</div>
                                                    </div>
                                                    <div className="char-wrapper" style={{ display: 'inline-block', transform: 'translate3d(0px, 0%, 0px)' }}>
                                                        <div className="char" style={{ display: 'inline-block', transform: 'translate3d(0px, 0px, 0px)' }}>y</div>
                                                        <div className="char" style={{ display: 'inline-block' }}>y</div>
                                                    </div>
                                                </div>
                                                <div className="home-reel-video-title-word" style={{ display: 'inline-block' }}>
                                                    <div className="char-wrapper" style={{ display: 'inline-block', transform: 'translate3d(0px, 0%, 0px)' }}>
                                                        <div className="char" style={{ display: 'inline-block', transform: 'translate3d(0px, 0px, 0px)' }}>R</div>
                                                        <div className="char" style={{ display: 'inline-block' }}>R</div>
                                                    </div>
                                                    <div className="char-wrapper" style={{ display: 'inline-block', transform: 'translate3d(0px, 0%, 0px)' }}>
                                                        <div className="char" style={{ display: 'inline-block', transform: 'translate3d(0px, 0px, 0px)' }}>e</div>
                                                        <div className="char" style={{ display: 'inline-block' }}>e</div>
                                                    </div>
                                                    <div className="char-wrapper" style={{ display: 'inline-block', transform: 'translate3d(0px, 0%, 0px)' }}>
                                                        <div className="char" style={{ display: 'inline-block', transform: 'translate3d(0px, 0px, 0px)' }}>e</div>
                                                        <div className="char" style={{ display: 'inline-block' }}>e</div>
                                                    </div>
                                                    <div className="char-wrapper" style={{ display: 'inline-block', transform: 'translate3d(0px, 0%, 0px)' }}>
                                                        <div className="char" style={{ display: 'inline-block', transform: 'translate3d(0px, 0px, 0px)' }}>l</div>
                                                        <div className="char" style={{ display: 'inline-block' }}>l</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button id="home-reel-video-watch-btn" aria-label="Watch reel button" >
                                            <div id="home-reel-video-watch-btn-base"></div>
                                            <div id="home-reel-video-watch-btn-background"></div>
                                            <svg id="home-reel-video-watch-btn-svg" xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="none" viewBox="0 0 36 36">
                                                <path fill="currentColor" d="M7 7.29c0-1.5 1.59-2.466 2.92-1.776l20.656 10.71c1.439.747 1.439 2.805 0 3.552L9.92 30.486C8.589 31.176 7 30.21 7 28.71V7.29Z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="home-featured" className="section">
                            <div id="home-featured-title-top">
                                <div id="home-featured-title-wrapper">
                                    <h4 id="home-featured-title">
                                        Featured Work
                                    </h4>
                                </div>
                                <div id="home-featured-disclaimer">
                                    <div style={{ position: 'relative', overflow: 'hidden' }}>
                                        <div className="line" style={{ display: 'block', textAlign: 'start', width: '100%' }}>a Selection of our most passionately</div>
                                    </div>
                                    <div style={{ position: 'relative', overflow: 'hidden' }}>
                                        <div className="line" style={{ display: 'block', textAlign: 'start', width: '100%' }}>crafted works with forward-thinking</div>
                                    </div>
                                    <div style={{ position: 'relative', overflow: 'hidden' }}>
                                        <div className="line" style={{ display: 'block', textAlign: 'start', width: '100%' }}>clients and friends over the years.</div>
                                    </div>
                                </div>
                            </div>
                            <div className="project-list">
                                <a className="project-item project-type-website" data-id="porsche_dream_machine" data-color-bg="#EFD5D3" data-color-text="#000000" data-color-shadow="0.95">
                                    <div className="project-item-main">
                                        <div className="project-item-image"></div>
                                    </div>
                                    <div className="project-item-footer">
                                        <div className="project-item-line-1">concept • 3D illustration • mograph • video</div>
                                        <div className="project-item-line-2">
                                            <div className="project-item-line-2-icon"></div>
                                            <div className="project-item-line-2-inner">
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>P</span><span>P</span><span>P</span><span>P</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>o</span><span>o</span><span>o</span><span>o</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>r</span><span>r</span><span>r</span><span>r</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>s</span><span>s</span><span>s</span><span>s</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>c</span><span>c</span><span>c</span><span>c</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>h</span><span>h</span><span>h</span><span>h</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>e</span><span>e</span><span>e</span><span>e</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>:</span><span>:</span><span>:</span><span>:</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)', width: '0.3em' }}></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>D</span><span>D</span><span>D</span><span>D</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>r</span><span>r</span><span>r</span><span>r</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>e</span><span>e</span><span>e</span><span>e</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>a</span><span>a</span><span>a</span><span>a</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>m</span><span>m</span><span>m</span><span>m</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)', width: '0.3em' }}></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>M</span><span>M</span><span>M</span><span>M</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>a</span><span>a</span><span>a</span><span>a</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>c</span><span>c</span><span>c</span><span>c</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>h</span><span>h</span><span>h</span><span>h</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>i</span><span>i</span><span>i</span><span>i</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>n</span><span>n</span><span>n</span><span>n</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>e</span><span>e</span><span>e</span><span>e</span></div>
                                            </div>

                                        </div>
                                    </div>
                                </a>
                                <a className="project-item project-type-website" data-id="porsche_dream_machine" data-color-bg="#EFD5D3" data-color-text="#000000" data-color-shadow="0.95">
                                    <div className="project-item-main">
                                        <div className="project-item-image"></div>
                                    </div>
                                    <div className="project-item-footer">
                                        <div className="project-item-line-1">concept • 3D illustration • mograph • video</div>
                                        <div className="project-item-line-2">
                                            <div className="project-item-line-2-icon"></div>
                                            <div className="project-item-line-2-inner">
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>P</span><span>P</span><span>P</span><span>P</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>o</span><span>o</span><span>o</span><span>o</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>r</span><span>r</span><span>r</span><span>r</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>s</span><span>s</span><span>s</span><span>s</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>c</span><span>c</span><span>c</span><span>c</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>h</span><span>h</span><span>h</span><span>h</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>e</span><span>e</span><span>e</span><span>e</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>:</span><span>:</span><span>:</span><span>:</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)', width: '0.3em' }}></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>D</span><span>D</span><span>D</span><span>D</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>r</span><span>r</span><span>r</span><span>r</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>e</span><span>e</span><span>e</span><span>e</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>a</span><span>a</span><span>a</span><span>a</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>m</span><span>m</span><span>m</span><span>m</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)', width: '0.3em' }}></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>M</span><span>M</span><span>M</span><span>M</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>a</span><span>a</span><span>a</span><span>a</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>c</span><span>c</span><span>c</span><span>c</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>h</span><span>h</span><span>h</span><span>h</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>i</span><span>i</span><span>i</span><span>i</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>n</span><span>n</span><span>n</span><span>n</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>e</span><span>e</span><span>e</span><span>e</span></div>
                                            </div>

                                        </div>
                                    </div>
                                </a>
                                <a className="project-item project-type-website" data-id="porsche_dream_machine" data-color-bg="#EFD5D3" data-color-text="#000000" data-color-shadow="0.95">
                                    <div className="project-item-main">
                                        <div className="project-item-image"></div>
                                    </div>
                                    <div className="project-item-footer">
                                        <div className="project-item-line-1">concept • 3D illustration • mograph • video</div>
                                        <div className="project-item-line-2">
                                            <div className="project-item-line-2-icon"></div>
                                            <div className="project-item-line-2-inner">
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>P</span><span>P</span><span>P</span><span>P</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>o</span><span>o</span><span>o</span><span>o</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>r</span><span>r</span><span>r</span><span>r</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>s</span><span>s</span><span>s</span><span>s</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>c</span><span>c</span><span>c</span><span>c</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>h</span><span>h</span><span>h</span><span>h</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>e</span><span>e</span><span>e</span><span>e</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>:</span><span>:</span><span>:</span><span>:</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)', width: '0.3em' }}></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>D</span><span>D</span><span>D</span><span>D</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>r</span><span>r</span><span>r</span><span>r</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>e</span><span>e</span><span>e</span><span>e</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>a</span><span>a</span><span>a</span><span>a</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>m</span><span>m</span><span>m</span><span>m</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)', width: '0.3em' }}></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>M</span><span>M</span><span>M</span><span>M</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>a</span><span>a</span><span>a</span><span>a</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>c</span><span>c</span><span>c</span><span>c</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>h</span><span>h</span><span>h</span><span>h</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>i</span><span>i</span><span>i</span><span>i</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>n</span><span>n</span><span>n</span><span>n</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>e</span><span>e</span><span>e</span><span>e</span></div>
                                            </div>

                                        </div>
                                    </div>
                                </a>
                                <a className="project-item project-type-website" data-id="porsche_dream_machine" data-color-bg="#EFD5D3" data-color-text="#000000" data-color-shadow="0.95">
                                    <div className="project-item-main">
                                        <div className="project-item-image"></div>
                                    </div>
                                    <div className="project-item-footer">
                                        <div className="project-item-line-1">concept • 3D illustration • mograph • video</div>
                                        <div className="project-item-line-2">
                                            <div className="project-item-line-2-icon"></div>
                                            <div className="project-item-line-2-inner">
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>P</span><span>P</span><span>P</span><span>P</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>o</span><span>o</span><span>o</span><span>o</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>r</span><span>r</span><span>r</span><span>r</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>s</span><span>s</span><span>s</span><span>s</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>c</span><span>c</span><span>c</span><span>c</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>h</span><span>h</span><span>h</span><span>h</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>e</span><span>e</span><span>e</span><span>e</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>:</span><span>:</span><span>:</span><span>:</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)', width: '0.3em' }}></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>D</span><span>D</span><span>D</span><span>D</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>r</span><span>r</span><span>r</span><span>r</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>e</span><span>e</span><span>e</span><span>e</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>a</span><span>a</span><span>a</span><span>a</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>m</span><span>m</span><span>m</span><span>m</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)', width: '0.3em' }}></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>M</span><span>M</span><span>M</span><span>M</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>a</span><span>a</span><span>a</span><span>a</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>c</span><span>c</span><span>c</span><span>c</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>h</span><span>h</span><span>h</span><span>h</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>i</span><span>i</span><span>i</span><span>i</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>n</span><span>n</span><span>n</span><span>n</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>e</span><span>e</span><span>e</span><span>e</span></div>
                                            </div>

                                        </div>
                                    </div>
                                </a>
                                <a className="project-item project-type-website" data-id="porsche_dream_machine" data-color-bg="#EFD5D3" data-color-text="#000000" data-color-shadow="0.95">
                                    <div className="project-item-main">
                                        <div className="project-item-image"></div>
                                    </div>
                                    <div className="project-item-footer">
                                        <div className="project-item-line-1">concept • 3D illustration • mograph • video</div>
                                        <div className="project-item-line-2">
                                            <div className="project-item-line-2-icon"></div>
                                            <div className="project-item-line-2-inner">
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>P</span><span>P</span><span>P</span><span>P</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>o</span><span>o</span><span>o</span><span>o</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>r</span><span>r</span><span>r</span><span>r</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>s</span><span>s</span><span>s</span><span>s</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>c</span><span>c</span><span>c</span><span>c</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>h</span><span>h</span><span>h</span><span>h</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>e</span><span>e</span><span>e</span><span>e</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>:</span><span>:</span><span>:</span><span>:</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)', width: '0.3em' }}></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>D</span><span>D</span><span>D</span><span>D</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>r</span><span>r</span><span>r</span><span>r</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>e</span><span>e</span><span>e</span><span>e</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>a</span><span>a</span><span>a</span><span>a</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>m</span><span>m</span><span>m</span><span>m</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)', width: '0.3em' }}></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>M</span><span>M</span><span>M</span><span>M</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>a</span><span>a</span><span>a</span><span>a</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>c</span><span>c</span><span>c</span><span>c</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>h</span><span>h</span><span>h</span><span>h</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>i</span><span>i</span><span>i</span><span>i</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>n</span><span>n</span><span>n</span><span>n</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>e</span><span>e</span><span>e</span><span>e</span></div>
                                            </div>

                                        </div>
                                    </div>
                                </a>
                                <a className="project-item project-type-website" data-id="porsche_dream_machine" data-color-bg="#EFD5D3" data-color-text="#000000" data-color-shadow="0.95">
                                    <div className="project-item-main">
                                        <div className="project-item-image"></div>
                                    </div>
                                    <div className="project-item-footer">
                                        <div className="project-item-line-1">concept • 3D illustration • mograph • video</div>
                                        <div className="project-item-line-2">
                                            <div className="project-item-line-2-icon"></div>
                                            <div className="project-item-line-2-inner">
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>P</span><span>P</span><span>P</span><span>P</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>o</span><span>o</span><span>o</span><span>o</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>r</span><span>r</span><span>r</span><span>r</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>s</span><span>s</span><span>s</span><span>s</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>c</span><span>c</span><span>c</span><span>c</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>h</span><span>h</span><span>h</span><span>h</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>e</span><span>e</span><span>e</span><span>e</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>:</span><span>:</span><span>:</span><span>:</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)', width: '0.3em' }}></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>D</span><span>D</span><span>D</span><span>D</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>r</span><span>r</span><span>r</span><span>r</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>e</span><span>e</span><span>e</span><span>e</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>a</span><span>a</span><span>a</span><span>a</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>m</span><span>m</span><span>m</span><span>m</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)', width: '0.3em' }}></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>M</span><span>M</span><span>M</span><span>M</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>a</span><span>a</span><span>a</span><span>a</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>c</span><span>c</span><span>c</span><span>c</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>h</span><span>h</span><span>h</span><span>h</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>i</span><span>i</span><span>i</span><span>i</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>n</span><span>n</span><span>n</span><span>n</span></div>
                                                <div className="project-item-line-2-inner-list" style={{ display: 'flex', flexDirection: 'column', transform: 'translateY(0%)' }}><span>e</span><span>e</span><span>e</span><span>e</span></div>
                                            </div>

                                        </div>
                                    </div>
                                </a>
                            </div>
                            <a id="home-featured-cta" target="_blank">
                                <span id="home-featured-cta-dot"></span><span id="home-featured-cta-text">See all projects</span>
                                <span id="home-featured-cta-arrow">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                                        <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.343 8h11.314m0 0L8.673 3.016M13.657 8l-4.984 4.984"></path>
                                    </svg>
                                </span>
                            </a>
                        </div>

                    </div>
                </div>
                <div id="page-extra-sections" >
                    <div id="footer-section" className="section">
                        <div id="footer-bg"></div>
                        <div id="footer-top"></div>
                        <div id="footer-middle">
                            <div id="footer-middle-contact">
                                <a id="footer-contact-address" href="https://goo.gl/maps/x9evc1NxZocjrM947" target="_blank">
                                    <div className="footer-address-line-wrapper" style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                        <div className="footer-address-line">
                                            <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0em, 0px)' }}>Suite</div>
                                            <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0em, 0px)' }}>2</div>
                                        </div>
                                    </div>
                                    <div className="footer-address-line-wrapper" style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                        <div className="footer-address-line">
                                            <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0em, 0px)' }}>9</div>
                                            <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0em, 0px)' }}>Marsh</div>
                                            <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0em, 0px)' }}>Street</div>
                                        </div>
                                    </div>
                                    <div className="footer-address-line-wrapper" style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                        <div className="footer-address-line">
                                            <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0em, 0px)' }}>Bristol,</div>
                                            <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0em, 0px)' }}>BS1</div>
                                            <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0em, 0px)' }}>4AA</div>
                                        </div>
                                    </div>
                                    <div className="footer-address-line-wrapper" style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                        <div className="footer-address-line">
                                            <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0em, 0px)' }}>United</div>
                                            <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0em, 0px)' }}>Kingdom</div>
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
                                                <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0em, 0px)' }}>Twitter</div>
                                                <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0em, 0px)' }}>/</div>
                                                <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0em, 0px)' }}>X</div>
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
                                            <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0em, 0px)' }}>General</div>
                                            <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0em, 0px)' }}>enquires</div>
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
                                            <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0em, 0px)' }}>Subscribe</div>
                                            <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0em, 0px)' }}>to</div>
                                        </span>
                                    </div>
                                    <div className="footer-newsletter-line-wrapper" style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                        <span className="footer-newsletter-line">
                                            <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0em, 0px)' }}>our</div>
                                            <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0em, 0px)' }}>newsletter</div>
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
                                <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0%, 0px)' }}>©2023</div>
                                <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0%, 0px)' }}>LUSION</div>
                                <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0%, 0px)' }}>Creative</div>
                                <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0%, 0px)' }}>Studio</div>
                            </div>
                            <a id="footer-bottom-labs" href="https://labs.lusion.co" target="_blank">
                                <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0%, 0px)' }}>R&amp;D:</div>
                                <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0%, 0px)' }}>labs.lusion.co</div>
                            </a>
                            <div id="footer-bottom-tagline">
                                <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0%, 0px)' }}>Built</div>
                                <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0%, 0px)' }}>by</div>
                                <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 0%, 0px)' }}>Lusion</div>
                                <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 1.04756%, 0px)' }}>with</div>
                                <div className="word" style={{ display: 'inline-block', transform: 'translate3d(0px, 4.87547%, 0px)' }}>❤️</div>
                            </div>
                            <div id="footer-bottom-up" style={{ transform: 'scale(1)' }}>
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
            </div>

            
      
      </main>



      <Canvas eventSource={ref} id="canvas" gl={{ antialias: false }}  >
        <Stats />
        <View track={boxPhysic}>
          <BallLusion accent={colorNew}/>
          <PerspectiveCamera makeDefault fov={36} position={[0, 0, 8]} />
        </View>
        <View track={listItem}>
          <ListImgMesh position={[0, 0, 0]} />
        </View>
   
        <EffNEnvBallLusion />
        <Preload all />
      </Canvas>  
    </>
  )
}


const EffNEnvBallLusion = () => {
  <>
    <EffectComposer disableNormalPass multisampling={8}>
      <N8AO distanceFalloff={1} aoRadius={1} intensity={4} />
    </EffectComposer>
    <Environment resolution={256}>
      <group rotation={[-Math.PI / 3, 0, 1]}>
        <Lightformer form="circle" intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
        <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
        <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={2} />
        <Lightformer form="circle" intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={8} />
      </group>
    </Environment>
  </>
}
{/*   <View track={trackViewFooter}>
          <FooterSpace position={[0, 0, 4.6]} />
          <PerspectiveCamera makeDefault fov={20} />
        </View> */}