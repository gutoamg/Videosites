
const Hi = () => {
    return(
        <section className="main-containers projects-container">
            <div id="fixed-picture">
                <svg width="100px" height="100px" id="disappearing-button" viewBox="0 0 513 514" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <filter id="dropshadow" height="130%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
                        <feOffset dx="0" dy="0" result="offsetblur"/> 
                        <feComponentTransfer>
                            <feFuncA type="linear" slope="0.5"/> 
                        </feComponentTransfer>
                        <feMerge> 
                            <feMergeNode/> 
                            <feMergeNode in="SourceGraphic"/> 
                        </feMerge>
                    </filter>
                    <path style={{filter:"url(#dropshadow)"}} d="M8.00071 4.62269C13.0942 0.636863 16.7962 0.464464 24.0007 1.62285L502.001 240.623C506.324 243.131 508.337 245.1 511.001 249.623L512.001 256.123C511.896 259.854 511.638 261.804 511.001 265.123C509.083 267.499 507.986 268.668 506.001 270.623L502.001 273.623L30.0007 509.623L23.0007 512.621C17.8748 512.621 19.0007 513.352 13.0006 511.951C7.07167 509.367 3.40821 506.509 1 499.621L1.00071 498.622V14.6227C2.40476 9.64694 3.70099 7.26667 8.00071 4.62269Z" stroke="none"/>
                </svg>
                <div id="loading-image" className="async-image">
                    <div id="loading-image-inner-elem">
                        <div id="videosite-title">
                            <h1 id="videosites">VIDEOSITES</h1>
                            <h4> Websites for the era of video </h4>
                        </div>
                        <div id="videosite-advantages">
                            <h3> More appealing </h3>
                            <h3> More rhythm </h3>
                            <h3 id="moreless"> Moreless,</h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hi;