const Why = () => {
    return(
        <section className="main-containers tools-container">
            <div className="do-we-need do-we-need-js">
                <img className="diagonal-arrow" src="diagonal-angular-22.svg" fill={"rgb(21, 21, 21)"} width="80%" height="90%" alt="Diagonal arrow" />
                <nav className="menu do-we-need-js">
                    <p className="menu-logo do-we-need-js">gutoamg</p>
                    <div className="menu-highlight"></div>
                    <div className="menu-slider"></div>
                    <p className="menu-option do-we-need-js">Home</p>
                    <p className="menu-option do-we-need-js">About</p>
                    <p className="menu-option do-we-need-js">Contact</p>
                </nav>
                <div className="scrollbar do-we-need-js">
                    <div className="scrollbar-slider"></div>
                </div>
                <p className="diagonal-arrow diagonal-arrow-look">Look</p>
                <p className="diagonal-arrow diagonal-arrow-what">What</p>
                <p className="diagonal-arrow diagonal-arrow-can">can</p>
                <p className="diagonal-arrow diagonal-arrow-we">we</p>
                <p className="diagonal-arrow diagonal-arrow-do">do</p>
                <p className="diagonal-arrow diagonal-arrow-question">?</p>
            </div>
            <h1 id="the-insight-title">The insight</h1>
            <div className="the-insight the-insight-container">
                <div id="the-insight-numbers" className="the-insight">
                    <p className="the-insight the-insight-numbers-p">1</p>
                    <p className="the-insight the-insight-numbers-p">+</p>
                    <p className="the-insight the-insight-numbers-p">1</p>
                    <p className="the-insight the-insight-numbers-p">=</p>
                    <p className="the-insight the-insight-numbers-p" id="the-insight-one">2</p>
                </div>
                <p id="navComponent" className="the-insight">Scrollbar</p>
                <p className="the-insight-text" id="twofunctions">2 functions</p>
                <div className="the-insight-text" id="insight-many-designs">
                    <h3 className="the-insight-text">And many possible designs</h3>
                    <nav className="the-insight menu">
                        <p className="menu-logo">gutoamg</p>
                        <div className="menu-highlight menu-component"></div>
                        <div className="menu-slider menu-component"></div>
                        <p className="menu-option menu-component">Home</p>
                        <p className="menu-option menu-component">About</p>
                        <p className="menu-option menu-component">Contact</p>
                    </nav>
                </div>
                <div className="the-insight-text" id="insight-text-itsAFilm">
                    <h2 className="the-insight-text">It's a</h2>
                    <p className="the-insight-text">And you are the director</p>
                    <h2 className="the-insight-text">Film</h2>
                </div>
                <p className="the-insight-text" id="by-the-way">By the way, here's the script...</p>
            </div>
        </section>
    );
};

export default Why;