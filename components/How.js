

const How = () => {
    return(
        <section className="main-containers about-container">
            <div className="how-title">
                <h1 className="how-title-text">HOW</h1>
            </div>
            <p>With plain Javascript, CSS and HTML</p>
            <a href={"https://github.com/gutoamg/Videosites"} className="GitHub-icon" target="_blank" rel="noopener noreferrer">
                <img src="/GitHub-icon5.png" alt="GitHub-icon" />
            </a>
            <div id="future-improvements">
                <h2>
                    Future improvements:
                </h2>
                <ul>
                    <li>Smoothen the scroll</li>
                    <li>Lazy load high quality images</li>
                    <li>Reestructure code with more object oriented logic</li>
                </ul>
            </div>
            <div id="other-possible-designs">
                <h2>
                    Other possible designs:
                </h2>
                <ul>
                    <li>
                        For bigger screens, move the navbar to the upper page, near to the
                        adress bar and browser tabs.
                    </li>
                    <li>Add keywords to the navbar, simulating traditional navbars fashion.</li>
                    <li>Add music to the film, just for fun.</li>
                </ul>
            </div>
            <div id="projects-upload">
                <h2>PS Other projects will be uploaded in the future</h2>
            </div>
        </section>

    );
};

export default How;