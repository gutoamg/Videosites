
import favIcon from '../public/gutoamg-Recording-Favicon-32x32.png'

const Header = () => {
    return(
        <div>
            <title>gutoamg</title>

            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="shortcut icon" href={favIcon} type="image/x-icon" />
            <link rel="stylesheet" type="text/css" href="./final_style.css" />

            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@900&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@900&family=Sigmar+One&display=swap" rel="stylesheet" /> 
            <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@700&display=swap" rel="stylesheet" />
        </div>
    );
};

export default Header;