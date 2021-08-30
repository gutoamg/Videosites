function scrollToEnd() {
    var heightToScroll = document.getElementsByTagName('body')[0].offsetHeight;
    heightToScroll -= document.getElementsByClassName("contact-container")[0].offsetHeight;
    window.scroll(0, heightToScroll);
};

const Hi = () => {
    return(
        <section className="main-containers projects-container">
            <div id="introduction-container">
                <div id="hidden-text">
                    <div id="keep-watching" className="hidden-text">
                        <p>Or keep watching</p>
                        <div id="keep-watching-cover"></div>
                    </div>

                    <div id="jump-to-end" className="hidden-text">
                        <a href={"#0"} onClick={scrollToEnd}>Jump to end</a>
                    </div>
                </div>

                <div id="time-is-short">
                    <div className="time-is-short-inner"></div>
                    <p className="time-is-short-inner">ime's short ?</p>
                    <div className="time-is-short-inner"></div>
                </div>

                <div id="crossword-container">
                    <div className="white-band"></div>
                    <div className="white-band"></div>

                    <div className="line-container">
                        <div className="letter-container vertical-letter">
                            <p className="crossword-letter">P</p>
                        </div>
                    </div>

                    <div className="line-container">
                        <div className="crossword-spacer"></div>
                        <div className="letter-container">
                            <p id="letter-A" className="crossword-letter">A</p>
                        </div>
                        <div className="letter-container">
                            <p id="letter-u1" className="crossword-letter">u</p>
                        </div>
                        <div className="letter-container">
                            <p id="letter-g" className="crossword-letter">g</p>
                        </div>
                        <div className="letter-container">
                            <p id="letter-u" className="crossword-letter">u</p>
                        </div>
                        <div className="letter-container">
                            <p id="letter-s1" className="crossword-letter">s</p>
                        </div>
                        <div className="letter-container">
                            <p id="letter-t" className="crossword-letter">t</p>
                        </div>
                        <div className="letter-container">
                            <p id="letter-o" className="crossword-letter">o</p>
                        </div>
                        <div className="letter-container">
                            <p id="letter-sign" className="crossword-letter">'</p>
                        </div>
                        <div className="letter-container">
                            <p id="letter-s" className="crossword-letter">s</p>
                        </div>
                        <div className="crossword-spacer"></div>
                    </div>

                    <div className="line-container">
                        <div className="letter-container vertical-letter">
                            <p className="crossword-letter">r</p>
                        </div>
                    </div>
                    <div className="line-container">
                        <div className="letter-container vertical-letter">
                            <p className="crossword-letter">t</p>
                        </div>
                    </div>
                    <div className="line-container">
                        <div className="letter-container vertical-letter">
                            <p className="crossword-letter">f</p>
                        </div>
                    </div>
                    <div className="line-container">
                        <div className="letter-container vertical-letter">
                            <p className="crossword-letter">o</p>
                        </div>
                    </div>
                    <div className="line-container">
                        <div className="letter-container vertical-letter">
                            <p className="crossword-letter">l</p>
                        </div>
                    </div>
                    <div className="line-container">
                        <div className="letter-container vertical-letter">
                            <p className="crossword-letter">i</p>
                        </div>
                    </div>
                    <div className="line-container">
                        <div className="letter-container vertical-letter">
                            <p className="crossword-letter">o</p>
                        </div>
                    </div>
                </div>
            </div>

            <div id="videosites-container" className="videosites">
                <div id="videosites" className="videosites">
                    <h2 className="videosites">This is a</h2>
                    <h3 className="videosites">video-like concept I designed for single page websites</h3>
                    <h1 className="videosites">Videosite</h1>
                </div>
                <p className="how-it-started videosites">nd this is</p>
                <p className="how-it-started-2 videosites">how it started</p>
            </div>
        </section>
        
    );
};

export default Hi;