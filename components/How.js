const How = () => {
    return(
        <section className="main-containers about-container">
            <h1 className="the-mechanics" id="the-mechanics-title">The mechanics</h1>
            <img className="the-mechanics wrench wrench-1" src="grey_wrench.svg" alt="Wrench" />
            <img className="the-mechanics wrench wrench-2" src="grey_wrench.svg" alt="Wrench" />
            <img className="the-mechanics wrench wrench-3" src="grey_wrench.svg" alt="Wrench" />
            <a id="github" href={"https://github.com/gutoamg/Videosites"} target="_blank" rel="noopener noreferrer">
                <img src="github-icon.png" alt="Github icon"/>
                <p>{"<"}Decode the code/{">"}</p>
            </a>
            <p className="the-mechanics the-mechanics-text the-mechanics-text-1">
                This website was built entirely with vanilla Javascript, CSS and HTML.
            </p>
            <p className="the-mechanics the-mechanics-text">
                That way, begginers can get inspired by what is possible to do with it.
            </p>
            <p className="the-mechanics the-mechanics-text" id="performance">
                To create the automatic scroll effect without compromising the overall 
                performance, the function requestAnimationFrame() is only called when the
            </p>
            <div className="the-mechanics" id="the-mechanics-play-button">
                <img id="purple-play-button" src="purple_play_button.png" width="40px" height="40px" alt="play button" /> 
                <p>button</p>
            </div>
            <p className="the-mechanics the-mechanics-text">
                in the video-like scrollbar is clicked(try it yourself). Otherwise it is 
                canceled. Yet, this scroll feature needs to be refined.
            </p>
            <p className="the-mechanics the-mechanics-text" id="animation">animation_value()</p>
            <p className="the-mechanics the-mechanics-text">
                That function allows all animations to run backwards and forwards, timelessly,
                depending on the scroll direction.
            </p>
            <p className="the-mechanics the-mechanics-text" id="based-on">Based on the basics</p>
            <p className="the-mechanics the-mechanics-text">
                No external libraries or frameworks needed. As Leo said, 
                "simplicity is the ultimate sophistication".
            </p>
            <h1 id="other-projects">Other projects</h1>
            <div id="simplist-container">
                <h3>Simplist</h3>
                <a className="simplist" href={"https://www.figma.com/proto/mrVGlcVJVv173V13TUAKt8/Simplist?node-id=42%3A817&scaling=scale-down&page-id=0%3A1"} target="_blank" rel="noopener noreferrer">Demo</a>
                <a className="simplist" href={"https://www.figma.com/file/mrVGlcVJVv173V13TUAKt8/Simplist?node-id=0%3A1"} target="_blank" rel="noopener noreferrer">Project screens</a>
                <img className="simplist the-mechanics" src="Simplist.png" width="300px" alt="Simplist icon" />
            </div>
            <h2>PS: I'll upload more projects in the future.</h2>
        </section>
    );
};

export default How;