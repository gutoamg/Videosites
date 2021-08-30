import Thescript from '../components/Thescript.js';
import Navbar from '../components/Navbar';
import Hi from '../components/Hi.js';
import Why from '../components/Why';
import How from '../components/How';
import Me from '../components/Me';
import Header from '../components/Header.js';

function Home() {
    return(
        <body>
            <Header />
            <Navbar />
            <Hi />
            <Why />
            <How />
            <Me />
            <Thescript />
        </body>
    );
}

export default Home;