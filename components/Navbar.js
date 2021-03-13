
const Navbar = () => {
    return(
        <div className="navBar">
            <div id="container-play-pause" className="container-play-pause">
                <svg width="26px" height="26px" id="playButton" viewBox="0 0 513 514" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.00071 4.62269C13.0942 0.636863 16.7962 0.464464 24.0007 1.62285L502.001 240.623C506.324 243.131 508.337 245.1 511.001 249.623L512.001 256.123C511.896 259.854 511.638 261.804 511.001 265.123C509.083 267.499 507.986 268.668 506.001 270.623L502.001 273.623L30.0007 509.623L23.0007 512.621C17.8748 512.621 19.0007 513.352 13.0006 511.951C7.07167 509.367 3.40821 506.509 1 499.621L1.00071 498.622V14.6227C2.40476 9.64694 3.70099 7.26667 8.00071 4.62269Z" stroke="none"/>
                </svg>
    
                <svg width="26px" height="29px" id="pauseButton" viewBox="0 0 456 521" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M134.64 1C162.876 4.41017 170.795 10.818 171.484 30L171.305 491C170.616 510.182 162.697 516.59 134.461 520H37.8446C9.60841 516.59 1.68957 510.182 1 491L1.17869 30C1.86826 10.818 9.7871 4.41017 38.0233 1H134.64Z" stroke="none"/>
                    <path d="M321.36 1C293.124 4.41017 285.205 10.818 284.516 30L284.695 491C285.384 510.182 293.303 516.59 321.539 520H418.155C446.392 516.59 454.31 510.182 455 491L454.821 30C454.132 10.818 446.213 4.41017 417.977 1H321.36Z" stroke="none"/>
                </svg>
            </div>

            <div className="rangeBar">
                <div id="styled-input">
                    <div id="styled-thumb"></div>
                    <a href="#0" className="section first-project"><div className="variable-progress-bar"></div></a>
                    <a href="#0" className="section second-project"><div className="variable-progress-bar"></div></a>
                    <a href="#0" className="section third-project"><div className="variable-progress-bar"></div></a>
                    <a href="#0" className="section fourth-project"><div className="variable-progress-bar"></div></a>
                </div>
            </div>
            <a href="#0" id="index">Hi</a>
        </div>
    );
};

export default Navbar;