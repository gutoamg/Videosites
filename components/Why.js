import Image from 'next/image';

const Why = () => {
    return(
        <section className="main-containers tools-container">
            <div id="why-container">
                <h1 id="why-title">Why</h1>
                <h1 id="question-mark">?</h1>
            </div>
            <div id="fixed-animations">
                <div className="full-screen">
                    <img src="/gutoamg-Full-Screen-Diagonal.svg" alt="Full screen icon" className="full-screen-icon" />
                    <div className="full-screen-text">
                        <p> Full screen websites</p>
                    </div>
                </div>
                <div className="merged-functionalities">
                    <div className="merged-functionalities vertical-bar"></div>
                    <div className="merged-functionalities horizontal-bar"></div>
                    <div className="merged-functionalities text">
                        <p>Scrollbar and navbar in one slider.</p>
                    </div>
                </div>
                <div className="its-a-film">
                    <h2>It's a</h2>
                    <h1>And you are the director</h1>
                    <h2>FILM</h2>
                </div>
                <div className="the-script">
                    <p>By the way, here's the script...</p>
                </div>
            </div>
        </section>
    );
};

export default Why;