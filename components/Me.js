const Me = () => {
    return(
        <section className="main-containers contact-container">
            <h1 id="about-me-spacer">Spr</h1>
            <h1 id="about-me">A bit of me</h1>
            <h2 id="ux-designer">
                I'm a UX/UI Designer, Frontend developer, parachute enthusiast,
                gastronomy passionate etc.
            </h2>
            <p className="paragraphs">
                What's important to know about me is that 
                the intersection of Design, creativity and entrepreneurship catches
                my atention.
                I believe this is a very powerful combination, so I invest
                a lot of time developing my skills on them.
            </p>
            <p className="paragraphs">
                It's also important for me to explore the possibilities of 
                every new skill I develop, challenge myself to create something 
                new from it and over time learn new ones, not just learn a 
                thousand to put in my resume.
            </p>
            <a id="my-cv" href={"myCV_AugustoMGouveia.pdf"} target="_blank" rel="noopener noreferrer">My_CV</a>
            <h1 className="titles">Tech skills</h1>
            <div className="skills-icons" id="skills-icons-container">
                <img className="skills-icons" src="Figma_icon.png" width="80px" alt="Figma icon" />
                <img className="skills-icons" src="Javascript_icon.png" width="80px" alt="JS icon" />
                <img className="skills-icons" src="CSS_icon.png" width="80px" alt="CSS icon" />
                <img className="skills-icons" src="HTML_icon.png" width="80px" alt="HTML icon" />
                <img className="skills-icons" src="Sass_icon.png" width="80px" alt="Sass icon" />
                <img className="skills-icons" src="C_icon.png" width="80px" alt="C icon" />
                <img className="skills-icons" src="NextJS_icon_white.png" width="80px" alt="NextJS icon" />
                <img className="skills-icons" src="VSCode_icon.png" width="80px" alt="VSCode icon" />
            </div>
            <h1 className="titles">
                Get 
                <a id="linkedin-logo" href={"https://www.linkedin.com/in/augusto-m-gouveia-87b6b083/"} target="_blank" rel="noopener noreferrer">
                    <img src="linkedIn-icon.png" alt="LinkedIn icon" width="80px" />                
                </a>
                touch
            </h1>
            <a id="email" href={"mailto:augustomgouveia@gmail.com?subject=Interested%20in%20your%20work"}>
                augustomgouveia@gmail.com
            </a>
            <div id="design-possibilities">
                <div id="design-filter"></div>
            </div>
            <h1 className="titles">The end...</h1>
            <div id="end-spacer"></div>
            <div id="do-we-need-words-container">
                <p className="do-we-need-words do-we-need-words-1">Do we need</p>
                <p className="do-we-need-words do-we-need-words-2">a menu</p>
                <p className="do-we-need-words do-we-need-words-3">AND</p>
                <p className="do-we-need-words do-we-need-words-4">a scrollbar</p>
                <p className="do-we-need-words do-we-need-words-5">?</p>
                <div className="do-we-need-words do-we-need-words-6">
                    <h2>Do we need</h2>
                    <h2>a menu</h2>
                    <h2>and</h2>
                    <h2>a scrollbar ?</h2>
                </div>
            </div>
            <div id="copyright">
                <h3>Copyright @2021 by Augusto M. Gouveia</h3>
            </div>
        </section>
    );
};

export default Me;