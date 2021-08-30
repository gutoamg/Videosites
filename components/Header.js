import Head from 'next/head';

const Header = () => {
    return(
        <Head>
            <title>gutoamg</title>
            <meta charset="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta
                name="description"    
                content={'This is my portfolio and a Videosite, a concept Design that presents a different way of navigating through websites.'}
            />

            // Twitter
            <meta name="twitter:card" content='This is my portfolio and a Videosite, a concept Design that presents a different way of navigating through websites.' key="twcard" />
            <meta name="twitter:creator" content={'Augusto M. Gouveia'} key="twhandle" />

            //Open Graph
            <meta property="og:url" content={'https://gutoamg.com/'} key="ogurl" />
            <meta property="og:image" content='public/Videosite_screenshot.png' key="ogimage" />
            <meta property="og:site_name" content={'gutoamg'} key="ogsitename" />
            <meta property="og:title" content={Videosites} key="ogtitle" />
            <meta property="og:description" content={'This is my portfolio and a Videosite, a concept Design that presents a different way of navigating through websites.'} key="ogdesc" />


            // Favicons
            <link rel="icon" type="image/png" sizes="32x32" href={"/gutoamg-Recording-Favicon-32x32.png"}/>
            <link rel="icon" type="image/png" sizes="16x16" href={"/gutoamg-Recording-Favicon-16x16.png"}/>
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
            <link rel="manifest" href="/site.webmanifest"/>
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
            <meta name="theme-color" content="rgb(24,24,24)"/>

            // Css file
            <link rel="stylesheet" type="text/css" href={"../styles/newSite.css"}/>

            // Fonts
            <link rel="preconnect" href={"https://fonts.gstatic.com"}/>
            <link href={"https://fonts.googleapis.com/css2?family=Saira:wght@500&display=swap"} rel="stylesheet"/> 
            <link href={"https://fonts.googleapis.com/css2?family=Saira:wght@300&display=swap"} rel="stylesheet"/> 
            <link href={"https://fonts.googleapis.com/css2?family=Saira:wght@400&display=swap"} rel="stylesheet"/> 
            <link href={"https://fonts.googleapis.com/css2?family=Saira:wght@700;800&display=swap"} rel="stylesheet"/>
        </Head>
    );
};

export default Header;