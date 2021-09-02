const Navbar = () => {
    return(
        <div id="navBar">
            <div id="container-play-pause" className="container-play-pause">
                <svg width="26px" height="26px" id="playButton" viewBox="0 0 513 514" fill={"white"} xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.00071 4.62269C13.0942 0.636863 16.7962 0.464464 24.0007 1.62285L502.001 240.623C506.324 243.131 508.337 245.1 511.001 249.623L512.001 256.123C511.896 259.854 511.638 261.804 511.001 265.123C509.083 267.499 507.986 268.668 506.001 270.623L502.001 273.623L30.0007 509.623L23.0007 512.621C17.8748 512.621 19.0007 513.352 13.0006 511.951C7.07167 509.367 3.40821 506.509 1 499.621L1.00071 498.622V14.6227C2.40476 9.64694 3.70099 7.26667 8.00071 4.62269Z" stroke="none"/>
                </svg>
    
                <svg width="26px" height="29px" id="pauseButton" viewBox="0 0 456 521" fill={"none"} xmlns="http://www.w3.org/2000/svg">
                    <path d="M134.64 1C162.876 4.41017 170.795 10.818 171.484 30L171.305 491C170.616 510.182 162.697 516.59 134.461 520H37.8446C9.60841 516.59 1.68957 510.182 1 491L1.17869 30C1.86826 10.818 9.7871 4.41017 38.0233 1H134.64Z" stroke="none"/>
                    <path d="M321.36 1C293.124 4.41017 285.205 10.818 284.516 30L284.695 491C285.384 510.182 293.303 516.59 321.539 520H418.155C446.392 516.59 454.31 510.182 455 491L454.821 30C454.132 10.818 446.213 4.41017 417.977 1H321.36Z" stroke="none"/>
                </svg>

                <svg width="26px" height="29px" id="reload" style={{display: "none"}} viewBox="0 0 502 508" fill={"none"} xmlns="http://www.w3.org/2000/svg">
                    <path d="M126.001 40.4941C6.42757 109.53 -34.5412 262.427 34.4944 382C103.53 501.574 256.428 542.542 376.001 473.507C455.781 427.446 500.569 344.053 501.039 258.133L400.929 262.238C399.138 312.164 372.457 360.083 326.001 386.904C254.257 428.326 162.518 403.744 121.097 332C79.6756 260.257 104.257 168.518 176.001 127.097C216.197 103.889 262.67 101.401 303.053 116.317L252.301 155.261C241.437 163.597 245.511 180.856 258.957 183.453L443.634 219.128C452.985 220.934 461.812 214.161 462.487 204.661L475.826 17.0434C476.797 3.38365 461.181 -5.01874 450.317 3.31781L390.323 49.353C313.638 -2.01567 211.333 -8.77277 126.001 40.4941Z" fill="rgb(0, 60, 121)"/>
                </svg>
            </div>

            <div id="rangeBar">
                <div id="styled-input">
                    <div id="styled-thumb" style={{left:"0%"}}></div>
                    <div className="progressbar first-project"><div className="variable-progress-bar"></div></div>
                    <div className="progressbar second-project"><div className="variable-progress-bar"></div></div>
                    <div className="progressbar third-project"><div className="variable-progress-bar"></div></div>
                    <div className="progressbar fourth-project"><div className="variable-progress-bar"></div></div>
                </div>
            </div>
            <p id="index">Home</p>
        </div>
    );
};

export default Navbar;