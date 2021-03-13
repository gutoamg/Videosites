const Me = () => {
    return(
        <section className="main-containers contact-container">
            <div className="how-come">
                <div className="how-come-title">
                    <p>Me</p>
                </div>
                <p className="how-come-text">
                    Once upon a time a high school student, pulled into Design
                    by a journey across Turkey...
                </p>
                <p className="how-come-text">
                    Now, passionate about parachutes, cooking and Design,
                    tries to find the best ways to express his creativity.
                </p>
                <p className="how-come-text">
                    Years pass by, viruses pass by and he decides to embrace
                    programming too, as an attempt to ally theory and practice.
                    
                </p>
                <p className="how-come-text">
                    Find out more about his story...
                </p>
            </div>
            <div id="get-in-touch-container">
                <div className="get-in-touch">
                    <p className="get-in-touch-text">Get in touch</p>
    
                    <div className="get-in-touch-email">
                        <img src="/email-icon.png" alt="Email Icon" />
                        <a href={"#0"} rel="noopener noreferrer">augustomgouveia@gmail.com</a>
                    </div>
    
                    <div className="get-in-touch-linkedin">
                        <a href={"https://www.linkedin.com/in/augusto-m-gouveia-87b6b083/"} target="_blank" rel="noopener noreferrer">
                            <img src="/linkedIn-icon.png" alt="LinkedIn Icon" />
                        </a>
                        <a id="linkedin-link" href={"https://www.linkedin.com/in/augusto-m-gouveia-87b6b083/"} target="_blank" rel="noopener noreferrer">Augusto M. G.</a>
                    </div>
    
                    <a id="CV" href="/myCV_AugustoMGouveia.pdf" target="_blank" rel="noopener noreferrer">My CV</a>
                </div>
                <div className="rights-reserved">
                    <p>Copyright @2021 by Augusto M. Gouveia</p>
                </div>
            </div>
        </section>
    );
};

export default Me;