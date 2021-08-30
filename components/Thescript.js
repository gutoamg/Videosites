import React, { useEffect } from "react";

const Thescript = () => {
    const mount = () => {
    // -----        ----   ----   --------       --------       --------         --------   ----   --------   --------       --------
    //  ----       ----    ----   ----   ----    ----         ----    ----     ----         ----     ----     ----         ----
    //   ----     ----     ----   ----    ----   --------   ----   --   ----     ----       ----     ----     --------       ----
    //    ----   ----      ----   ----   ----    ----         ----    ----         ----     ----     ----     ----             ----
    //     --------        ----   ----------     --------       --------     --------       ----     ----     --------   --------

    // Transforms node list into array with broad support
    const nodeList_to_array = (nodeList) => {
        var array = [];
        var i = nodeList.length
        // iterate backwards ensuring that length is an UInt32
        for (i >>> 0; i--;) {
            array[i] = nodeList[i];
        }
        return array;
    };

    // For responsiveness, compares the height and
    // width of the screen and returns the smallest
    // value so that HTML elements fit the screen.
    const window_smallest_size = (windowObj) => {
        if (windowObj.windowWidth < windowObj.windowHeight)
            return windowObj.windowWidth;
        else 
            return windowObj.windowHeight;
    };


    // Receives three values representing the interval in which
    // the animation must work and the current value between
    // those, all related to percentage scrolled height
    // of the page. Also receives the two values representing
    // the initial and final states(values) desirable for
    // some animation variable such as opacity and position.
    // Returns the value of that variable considering the
    // current position in the interval.
    const animation_value = (intervalBeg, intervalEnd, currentPos, stateBeg, stateEnd) => {
        if (currentPos < intervalBeg)
            animationVariable = stateBeg;
        else if (currentPos > intervalEnd)
            animationVariable = stateEnd;
        else {
            if (intervalBeg == 0)
                intervalBeg = 0.0001;
            else if (intervalEnd == 0)
                intervalEnd = 0.0001;
            else if (currentPos == 0)
                currentPos = 0.0001;
            else if (stateBeg == 0)
                stateBeg = 0.0001;
            else if (stateEnd == 0)
                stateEnd = 0.0001;
            var changeInState = stateEnd - stateBeg;
            var percentageIntervalPos = (intervalEnd / intervalBeg) - 1;
            var animationVariable = (stateBeg + ((changeInState / percentageIntervalPos) * ((currentPos / intervalBeg) - 1)));
        }

        return animationVariable;
    };


    // Receives absolute cursor position and returns 
    // it's position relative to the styled-input 
    // width (if the cursor is right above the 
    // styled-input left side the function will return 
    // 0 - which is how much of the width it reached). 
    // It also returns the absolute left position 
    // from the styled input. 
    // To do that, it takes the width of the page
    // and the width of the styled input and makes
    // some calculations to discover in pixels the 
    // styled input left side's absolute position.
    // Then it subtracts that position from the 
    // absolute position and converts the result
    // into relative position. 
    const cursor_absolute_to_relative_pos = (mousePosition) => {
        var styledinputWidth, styledInputLeft, thumbPos;
        var styledInput = document.getElementById("styled-input");
        var pageWidth = document.getElementsByTagName("body")[0].clientWidth;

        styledinputWidth = styledInput.clientWidth;
        styledInputLeft = ((pageWidth - styledinputWidth) / 2);
        thumbPos = (mousePosition - styledInputLeft) * 100 / styledinputWidth;

        if (thumbPos < 0)
            thumbPos = 0;
        else if (thumbPos > 100)
            thumbPos = 100;

        return { thumbPos, styledInputLeft };
    };


    // transforms percentual position of the thumb - relative to the
    // total length of the rangeBar - into 
    // pixels from the top of the page until the current position.
    const relative_position_to_height = (relativePosition) => {
        var mainContainers = document.getElementsByClassName("main-containers");
        var projectsContainerHeight = mainContainers[0].offsetHeight;
        var toolsContainerHeight = mainContainers[1].offsetHeight;
        var aboutContainerHeight = mainContainers[2].offsetHeight;
        var contactContainerHeight = mainContainers[3].offsetHeight;
        var incompleteSectionWidth = 0;
        var absolutePosition = 0;
        relativePosition = parseFloat(relativePosition);

        if (relativePosition >= 75) {
            incompleteSectionWidth = (relativePosition - 75) / 25;
            absolutePosition = projectsContainerHeight + toolsContainerHeight +
                aboutContainerHeight + incompleteSectionWidth * contactContainerHeight;
        } else if (relativePosition >= 50) {
            incompleteSectionWidth = (relativePosition - 50) / 25;
            absolutePosition = projectsContainerHeight + toolsContainerHeight +
                incompleteSectionWidth * aboutContainerHeight;
        } else if (relativePosition >= 25) {
            incompleteSectionWidth = (relativePosition - 25) / 25;
            absolutePosition = projectsContainerHeight + incompleteSectionWidth * toolsContainerHeight;
        } else {
            incompleteSectionWidth = relativePosition / 25;
            absolutePosition = incompleteSectionWidth * (projectsContainerHeight - window.innerHeight) + window.innerHeight;
        }

        return absolutePosition;
    };


    // Coloring progress bars between zero and current thumb position
    // Coloring play/pause button accordingly
    const coloring_progressBars_playPause = (navbarObj, pageWindowObj) => {
        var incompleteWidth = 0;

        if (navbarObj.relativeThumbPos >= 75.5) {
            navbarObj.firstProgressBar.style.width = `100%`;
            navbarObj.secondProgressBar.style.width = `100%`;
            navbarObj.thirdProgressBar.style.width = `100%`;
            incompleteWidth = 4 * (navbarObj.relativeThumbPos - 75);
            navbarObj.fourthProgressBar.style.width = `${incompleteWidth}%`;

            navbarObj.playButton.style.fill = `rgb(0, 60, 121)`;
            navbarObj.pauseButton.style.fill = `rgb(0, 60, 121)`;
            navbarObj.pageReference.style.color = `rgb(0, 60, 121)`;

            navbarObj.pageReference.innerHTML = `Me`;
        } else if (navbarObj.relativeThumbPos >= 50.5) {
            navbarObj.firstProgressBar.style.width = `100%`;
            navbarObj.secondProgressBar.style.width = `100%`;
            incompleteWidth = 4 * (navbarObj.relativeThumbPos - 50);
            navbarObj.thirdProgressBar.style.width = `${incompleteWidth}%`;
            navbarObj.fourthProgressBar.style.width = `0`;

            navbarObj.playButton.style.fill = `rgb(131, 0, 124)`;
            navbarObj.pauseButton.style.fill = `rgb(131, 0, 124)`;
            navbarObj.pageReference.style.color = `rgb(131, 0, 124)`;

            navbarObj.pageReference.innerHTML = `How`;
        } else if (navbarObj.relativeThumbPos >= 25.5) {
            navbarObj.firstProgressBar.style.width = `100%`;
            incompleteWidth = 4 * (navbarObj.relativeThumbPos - 25);
            navbarObj.secondProgressBar.style.width = `${incompleteWidth}%`;
            navbarObj.thirdProgressBar.style.width = `0`;
            navbarObj.fourthProgressBar.style.width = `0`;

            navbarObj.playButton.style.fill = `rgb(183, 0, 72)`;
            navbarObj.pauseButton.style.fill = `rgb(183, 0, 72)`;
            navbarObj.pageReference.style.color = `rgb(183, 0, 72)`;

            navbarObj.pageReference.innerHTML = `Why`;
        } else {
            incompleteWidth = 4 * navbarObj.relativeThumbPos;
            navbarObj.firstProgressBar.style.width = `${incompleteWidth}%`;
            navbarObj.secondProgressBar.style.width = `0`;
            navbarObj.thirdProgressBar.style.width = `0`;
            navbarObj.fourthProgressBar.style.width = `0`;

            navbarObj.playButton.style.fill = `rgb(223, 23, 26)`;
            navbarObj.pauseButton.style.fill = `rgb(223, 23, 26)`;
            navbarObj.pageReference.style.color = `rgb(223, 23, 26)`;

            navbarObj.pageReference.innerHTML = `Home`;
        }

        pageWindowObj.pixelsToScroll.value = window.pageYOffset;
    };


    // If the mouse is moving within the length 
    // of the rangeBar it updates the thumb position, 
    // colors the progresss bars accordingly and 
    // scrolls the page proportionally.
    const event_rangebar_updates = (navbarObj, pageWindowObj) => {
        var relativeMousePos = cursor_absolute_to_relative_pos(pageWindowObj.mousePosition);
        navbarObj.relativeThumbPos = relativeMousePos.thumbPos;

        if (relativeMousePos.thumbPos >= 0 && relativeMousePos.thumbPos <= 100)
            navbarObj.styledThumb.style.left = navbarObj.relativeThumbPos + "%";
        coloring_progressBars_playPause(navbarObj, pageWindowObj);

        pageWindowObj.scrolledPage = window.pageYOffset;
        pageWindowObj.pixelsToScroll.value = relative_position_to_height(navbarObj.relativeThumbPos);
        pageWindowObj.pixelsToScroll.value -= pageWindowObj.windowHeight;
        window.scroll({
            top: pageWindowObj.pixelsToScroll.value,
            left: 0,
            behavior: 'auto'
        });
    };


    const update_rangebar_onscroll = (dom, windowObj, navbarObj) => {
        var scrolledHeight = windowObj.windowHeight + window.pageYOffset;
        var exposedHeight, percentualAppearance;
        var auxiliar = dom.projectsContainerHeight + dom.toolsContainerHeight + dom.aboutContainerHeight;

        if (scrolledHeight >= (auxiliar)) {
            exposedHeight = scrolledHeight - (auxiliar);
            percentualAppearance = exposedHeight / dom.contactContainerHeight;
            percentualAppearance = percentualAppearance * 25 + 75;
        } else if (scrolledHeight >= (dom.projectsContainerHeight + dom.toolsContainerHeight)) {
            exposedHeight = scrolledHeight - (dom.projectsContainerHeight + dom.toolsContainerHeight);
            percentualAppearance = exposedHeight / dom.aboutContainerHeight;
            percentualAppearance = percentualAppearance * 25 + 50;
        } else if (scrolledHeight >= (dom.projectsContainerHeight)) {
            exposedHeight = scrolledHeight - (dom.projectsContainerHeight);
            percentualAppearance = exposedHeight / dom.toolsContainerHeight;
            percentualAppearance = percentualAppearance * 25 + 25;
        } else {
            exposedHeight = (scrolledHeight - windowObj.windowHeight);
            percentualAppearance = exposedHeight / (dom.projectsContainerHeight - windowObj.windowHeight);
            percentualAppearance = percentualAppearance * 25;
        }
        if (percentualAppearance >= 100)
            percentualAppearance = 100;

        navbarObj.styledThumb.style.left = `${percentualAppearance}%`;
        navbarObj.relativeThumbPos = percentualAppearance;
        coloring_progressBars_playPause(navbarObj, windowObj);
    };

    // Alternate play/pause buttons
    // Changes navBar class
    // Updates scrolling variable based on thumb position
    const playPause_clicked = (navBarObj, pagewindowObj) => {
        if (navBarObj.reload.style.display === `inline-block`) {
            window.scroll(0, 0);
            navBarObj.reload.style.display === `none`;
            navBarObj.playButton.style.display === `none`;
            navBarObj.pauseButton.style.display === `inline-block`;
        } else if (navBarObj.playButton.style.display === `inline-block`) {
            var absoluteScroll = 0;
            navBarObj.playButton.style.display = `none`;
            navBarObj.pauseButton.style.display = `inline-block`;
            navBarObj.navbar.className = "navBar hideBar";
            absoluteScroll = relative_position_to_height(parseFloat(navBarObj.styledThumb.style.left));
            absoluteScroll -= window.innerHeight;
            pagewindowObj.pixelsToScroll.value = absoluteScroll;
            pagewindowObj.boolScrollPage = true;
            navBarObj.playBtnClicked = true;
            pagewindowObj.startTime = null;
            pagewindowObj.animationID = window.requestAnimationFrame(scroll_page);
        } else {
            navBarObj.pauseButton.style.display = `none`;
            navBarObj.playButton.style.display = `inline-block`;
            navBarObj.navbar.className = "navBar";
            pagewindowObj.boolScrollPage = false;
            navBarObj.playBtnClicked = false;
            cancelAnimationFrame(pagewindowObj.animationID);
        }
    };


    const hide_bar_after_delay = (navBarObj) => {
        navBarObj.navbar.className = "navBar";
        if (navBarObj.playBtnClicked === true) {
            setTimeout(() => {
                if (navBarObj.playBtnClicked === true) {
                    navBarObj.appearanceStatus = "none";
                    navBarObj.navbar.className = "navBar hideBar";
                }
            }, 2000);
        }
    };


    // The frame rate is 1000/timePassed
    // To make a smooth scroll, the number of 
    // pixels jumped needs to adapt to the
    // frame rate, i.e., if we want 4 pixels
    // jumped at 60fps, as the frame rate 
    // increases the pixel jump decreases
    const scroll_page = (currentTime) => {
        if (pageWindow.startTime === null)
            pageWindow.startTime = currentTime;
        var timePassed = currentTime - pageWindow.startTime;
        pageWindow.pixelsToScroll.value += (pageWindow.pixelsToScroll.pixelsToJump*60*timePassed) / 1000;
        window.scroll(0, pageWindow.pixelsToScroll.value);
        pageWindow.startTime = currentTime;
        pageWindow.animationID = requestAnimationFrame(scroll_page);
    };


    const run_animations = () => {
        var totalheight = dom.projectsContainerHeight +
                            dom.toolsContainerHeight +
                            dom.aboutContainerHeight +
                            dom.contactContainerHeight;

        var totalScrolled = window.pageYOffset + window.innerHeight;
        var relativeScrolledFirstPage = (totalScrolled - window.innerHeight) / (dom.projectsContainerHeight - window.innerHeight);
        var relativeScrolledSecondPage = (totalScrolled - dom.projectsContainerHeight) / dom.toolsContainerHeight;
        var relativeScrolledThirdPage = 
            (totalScrolled - dom.projectsContainerHeight - dom.toolsContainerHeight) / dom.aboutContainerHeight;
        var relativeScrolledFourthPage = 
            (totalScrolled - dom.projectsContainerHeight - dom.toolsContainerHeight - dom.aboutContainerHeight) / 
            dom.contactContainerHeight;
        var animationAux = 0;
        var secondanimationaux = 0;
        var thirdAnimationaux = 0;

        // Adjust Play and reload button states
        if (relativeScrolledFourthPage < 1 && (navBar.pauseButton.style.display != `inline-block`)) 
            navBar.playButton.style.display = `inline-block`;
        navBar.reload.style.display = `none`;

        // Hiding background image in case someone
        // slides down in smartphone at the
        // beginning of the website
        if (relativeScrolledFirstPage <= 0.1)  
            fourthPage.designPossibilities.style.display = `none`;
        else
            fourthPage.designPossibilities.style.display = `inline-block`;

        // ----------- FIRST PART ----------
        if (relativeScrolledFirstPage >= 0 && relativeScrolledFirstPage <= 0.75) {
            firstPage.introContainer.style.display = `block`;
            // Moving and rescaling crossword container
            // Final scale changes deppending on screen size
            if (pageWindow.windowWidth <= 750) 
                thirdAnimationaux = 0.15;
            else
                thirdAnimationaux = 0.1;
            animationAux = animation_value(0.15, 0.32, relativeScrolledFirstPage, 1, thirdAnimationaux);
            secondanimationaux = animation_value(0.15, 0.32, relativeScrolledFirstPage, 16.67, 50);
            firstPage.crossWord.style.transform = `translate(-50%, -${secondanimationaux}%) scale(${animationAux})`;
            // Final "T" position changes deppending on
            // screen size
            if (pageWindow.windowWidth <= 750) 
                thirdAnimationaux = 6;
            else
                thirdAnimationaux = 20;
            animationAux = animation_value(0.15, 0.32, relativeScrolledFirstPage, 50, thirdAnimationaux);
            firstPage.crossWord.style.left = `${animationAux}%`;

            
            // Appearing and repositioning white band(which creates letter "T")
            animationAux = animation_value(0.05, 0.15, relativeScrolledFirstPage, 0, 100);
            firstPage.cwWhiteband[0].style.width = `${animationAux}%`;
            firstPage.cwWhiteband[1].style.height = `${animationAux}%`;
            animationAux = animation_value(0.30, 0.32, relativeScrolledFirstPage, 11, 0);
            firstPage.cwWhiteband[0].style.top = `${animationAux}%`;
            animationAux = animation_value(0.30, 0.32, relativeScrolledFirstPage, 0, 25);
            firstPage.cwWhiteband[0].style.left = `${animationAux}%`;

            // Vertical letters("Portfolio") appearing
            animationAux = animation_value(0, 0.02, relativeScrolledFirstPage, 0, 1);
            firstPage.cwVerticalLetters[0].style.opacity = `${animationAux}`;
            animationAux = animation_value(0.02, 0.04, relativeScrolledFirstPage, 0, 1);
            firstPage.cwVerticalLetters[1].style.opacity = `${animationAux}`;
            animationAux = animation_value(0.04, 0.05, relativeScrolledFirstPage, 0, 1);
            firstPage.cwVerticalLetters[2].style.opacity = `${animationAux}`;
            animationAux = animation_value(0.05, 0.06, relativeScrolledFirstPage, 0, 1);
            firstPage.cwVerticalLetters[3].style.opacity = `${animationAux}`;
            animationAux = animation_value(0.06, 0.07, relativeScrolledFirstPage, 0, 1);
            firstPage.cwVerticalLetters[4].style.opacity = `${animationAux}`;
            animationAux = animation_value(0.07, 0.08, relativeScrolledFirstPage, 0, 1);
            firstPage.cwVerticalLetters[5].style.opacity = `${animationAux}`;
            animationAux = animation_value(0.08, 0.09, relativeScrolledFirstPage, 0, 1);
            firstPage.cwVerticalLetters[6].style.opacity = `${animationAux}`;
            animationAux = animation_value(0.09, 0.1, relativeScrolledFirstPage, 0, 1);
            firstPage.cwVerticalLetters[7].style.opacity = `${animationAux}`;

            // Disappearing crossword letters
            animationAux = animation_value(0.29, 0.3, relativeScrolledFirstPage, 1, 0);
            nodeList_to_array(firstPage.cwLineContainers).forEach( (line) => {
                line.style.opacity = `${animationAux}`;
            });

            // Displaying text "Time's short ?"
            // It only displays after the letter
            // "T" is in place, at 0.32
            if (relativeScrolledFirstPage >= 0.32)
                firstPage.timeIsShort.style.display = `block`;
            else
                firstPage.timeIsShort.style.display = `none`;
            // "ime's short" fades in
            animationAux = animation_value(0.32, 0.34, relativeScrolledFirstPage, 0, 1);
            firstPage.tisInner[1].style.opacity = `${animationAux}`;
            // "ime's short" appears from left to right
            animationAux = animation_value(0.32, 0.36, relativeScrolledFirstPage, 5, 100);
            firstPage.tisInner[2].style.left = `${animationAux}%`;
            // Hiding box is not displayed after the effect
            // is over, at 0.36
            if (relativeScrolledFirstPage >= 0.36)
                firstPage.tisInner[2].style.display = `none`;
            else
                firstPage.tisInner[2].style.display = `block`; 
            
            // Appearing "Jump to end"
            animationAux = animation_value(0.38, 0.42, relativeScrolledFirstPage, 0, 1);
            firstPage.tisHidden[1].style.opacity = `${animationAux}`;
            // Calculating how much to go up
            // Moving "Time's short" up
            animationAux = firstPage.tisHidden[1].getElementsByTagName("a")[0].offsetHeight;
            animationAux = animationAux * 100 / pageWindow.windowHeight;
            animationAux = 50-(animationAux * 1.2);
            firstPage.auxVar = animationAux;
            animationAux = animation_value(0.38, 0.42, relativeScrolledFirstPage, 50, firstPage.auxVar);
            firstPage.timeIsShort.style.top = `${animationAux}%`;
            firstPage.crossWord.style.top = `${animationAux}%`;
            
            // Moving "Or keep watching" cover to right
            animationAux = animation_value(0.44, 0.52, relativeScrolledFirstPage, 50, 80);
            firstPage.keepwtc.style.left = `${animationAux}%`;
            // "Or keep watching" cover is not displayed after
            // the effect is over, at 0.52
            if (relativeScrolledFirstPage >= 0.52)
                firstPage.keepwtc.style.display = `none`;
            else
                firstPage.keepwtc.style.display = `block`;
            // Disappearing and moving "Jump to end"
            if (relativeScrolledFirstPage >= 0.5) {
                animationAux = animation_value(0.51, 0.52, relativeScrolledFirstPage, 1, 0);
                firstPage.tisHidden[1].style.opacity = `${animationAux}`;
            }
            animationAux = animation_value(0.508, 0.54, relativeScrolledFirstPage, 50, 80);
            firstPage.tisHidden[1].style.left = `${animationAux}%`;
            // Inserting introduction container in website flow
            // Fading out "Time's short or keep watching"
            if (relativeScrolledFirstPage >= 0.525) {
                firstPage.introContainer.style.position = "absolute";
                firstPage.introContainer.style.height = `25%`;
                firstPage.introContainer.style.top = `52%`;
            } else {
                firstPage.introContainer.style.position = "fixed";
                firstPage.introContainer.style.height = `100%`;
                firstPage.introContainer.style.top = `50%`;
            }
            animationAux = animation_value(0.55, 0.75, relativeScrolledFirstPage, 1, 0);
            firstPage.introContainer.style.opacity = `${animationAux}`;
        } else {
            firstPage.introContainer.style.display = `none`;
        }

        // "This is a Videosite" animation
        if (relativeScrolledFirstPage >= 0.64 && relativeScrolledFirstPage <= 1.4) {
            firstPage.videosites[0].style.display = "block";
            // Fading in "This is a Videosite..." 
            animationAux = animation_value(0.65, 0.75, relativeScrolledFirstPage, 0, 1);
            firstPage.videosites[0].style.opacity = `${animationAux}`;
            animationAux = animation_value(0.79, 0.83, relativeScrolledFirstPage, 0, 1);
            firstPage.videosites[3].style.opacity = `${animationAux}`;
            // Creating "A" letter with text
            animationAux = animation_value(0.85, 0.9, relativeScrolledFirstPage, -50, -80);
            secondanimationaux = animation_value(0.85, 0.9, relativeScrolledFirstPage, 0, 100);
            thirdAnimationaux = animation_value(0.85, 0.9, relativeScrolledFirstPage, 0, -70);
            firstPage.videosites[2].style.transform = `translate(${animationAux}%, 0%) rotate(${thirdAnimationaux}deg)`;
            animationAux = animation_value(0.85, 0.9, relativeScrolledFirstPage, -50, -40);
            secondanimationaux = animation_value(0.85, 0.9, relativeScrolledFirstPage, 0, -130);
            thirdAnimationaux = animation_value(0.85, 0.9, relativeScrolledFirstPage, 0, 45);
            firstPage.videosites[4].style.transform = `translate(${animationAux}%, ${secondanimationaux}%) rotate(${thirdAnimationaux}deg)`;
            thirdAnimationaux = animation_value(0.85, 0.9, relativeScrolledFirstPage, 1, 0.3);
            firstPage.videosites[1].style.transform = `translate(-50%, -50%) scale(${thirdAnimationaux})`;
        
            // The logic: sum the lenght of the "A" letter - which is the length of the horizontal
            // text - with the lenght of the "nd this is" text - which varies with the screen
            // size. Then find the mean point between them. That point represents the center of the 
            // page. It is bigger than the lenght of "A" letter and smaller than the other text.
            // That difference relates to how much each text needs to be shifted.
            if (pageWindow.windowWidth >= 1700)
                animationAux = 590;
            else if (pageWindow.windowWidth >= 750) 
                animationAux = 450;
            else if (pageWindow.windowWidth >= 465) 
                animationAux = 300;
            else 
                animationAux = 180;
            secondanimationaux = animationAux + (firstPage.videosites[3].offsetWidth * 0.3);
            secondanimationaux /= 2;
            thirdAnimationaux = secondanimationaux - (animationAux / 1.95);
            secondanimationaux -= (firstPage.videosites[3].offsetWidth * 0.18);
            secondanimationaux /= firstPage.videosites[0].offsetWidth;
            thirdAnimationaux /= firstPage.videosites[0].offsetWidth;
            secondanimationaux = 50 - (secondanimationaux * 100);
            thirdAnimationaux = 50 + (thirdAnimationaux * 100);
            animationAux = animation_value(0.85, 0.9, relativeScrolledFirstPage, 50, secondanimationaux);
            firstPage.videosites[1].style.left = `${animationAux}%`;
            
            // "this is how it started" positioning
            // It adjusts values for responsiveness
            if (pageWindow.windowWidth > pageWindow.windowHeight 
                && pageWindow.windowHeight < 750) {
                animationAux = 89;
                secondanimationaux = 1.032;
            } else {
                animationAux = 95;
                secondanimationaux = 1.1;
            }
            if (relativeScrolledFirstPage >= secondanimationaux) {
                firstPage.videosites[0].style.top = `${animationAux}%`;
                firstPage.videosites[0].style.position = "absolute";
            } else if (relativeScrolledFirstPage >= 0.83) {
                firstPage.videosites[0].style.top = "50%";
                firstPage.videosites[0].style.position = "fixed";
            } else {
                firstPage.videosites[0].style.top = "75%";
                firstPage.videosites[0].style.position = "absolute";
            }
        
            // Sliding "And this is how it started"
            //secondanimationaux = 50 + (firstPage.videosites[5].offsetWidth * 100 / (pageWindow.windowWidth * 5));
            animationAux = animation_value(0.93, 0.97, relativeScrolledFirstPage, 150, thirdAnimationaux);
            firstPage.videosites[5].style.left = `${animationAux}%`;
            animationAux = animation_value(0.9, 0.97, relativeScrolledFirstPage, 150, 50);
            firstPage.videosites[6].style.left = `${animationAux}%`;
        } else
            firstPage.videosites[0].style.display = "none";


        // ----------- SECOND PART ----------
        // Fixing do-we-need container
        if (relativeScrolledSecondPage >= 0.15 && relativeScrolledSecondPage < 0.505)
            secondPage.doWeNeed[0].style.position = "fixed";
        else
            secondPage.doWeNeed[0].style.position = "relative";
        // Gutoamg menu appearing
        animationAux = animation_value(0.148, 0.15, relativeScrolledSecondPage, 1, 50);
        secondPage.doWeNeed[1].style.height = `${animationAux}px`;

        // "Do we need a menu and a scrollbar" animation
        if (relativeScrolledSecondPage >= 0 && relativeScrolledSecondPage <= 0.3) {
            secondPage.dwnContainer.style.display = `block`;
            
            if (pageWindow.windowWidth >= 750) {
                animationAux = animation_value(0.16, 0.173, relativeScrolledSecondPage, -90, 0);
                secondPage.dwnWords[0].style.transform = `translate(-50%, -50%) rotate(${animationAux}deg)`;
                animationAux = animation_value(0.178, 0.196, relativeScrolledSecondPage, -90, 0);
                secondPage.dwnWords[1].style.transform = `translate(-50%, 0%) rotate(${animationAux}deg)`;
                animationAux = animation_value(0.205, 0.223, relativeScrolledSecondPage, -90, 0);
                secondPage.dwnWords[2].style.transform = `translate(0%, 0%) rotate(${animationAux}deg)`;
            } else {
                animationAux = animation_value(0.155, 0.173, relativeScrolledSecondPage, -90, 0);
                secondPage.dwnWords[0].style.transform = `translate(0%, -50%) rotate(${animationAux}deg)`;
                animationAux = animation_value(0.178, 0.196, relativeScrolledSecondPage, -90, 0);
                secondPage.dwnWords[1].style.transform = `translate(0%, -50%) rotate(${animationAux}deg)`;
                animationAux = animation_value(0.205, 0.223, relativeScrolledSecondPage, -90, 0);
                secondPage.dwnWords[2].style.transform = `translate(0%, -50%) rotate(${animationAux}deg)`;
            }
            animationAux = animation_value(0.178, 0.196, relativeScrolledSecondPage, 130, 80);
            secondPage.dwnWords[1].style.top = `${animationAux}px`;
            animationAux = animation_value(0.205, 0.223, relativeScrolledSecondPage, 100, 80);
            secondPage.dwnWords[2].style.top = `${animationAux}px`;
            animationAux = animation_value(0.231, 0.249, relativeScrolledSecondPage, 90, 0);
            secondanimationaux = animation_value(0.231, 0.249, relativeScrolledSecondPage, 30, -10);
            secondPage.dwnWords[3].style.transform = `translate(${secondanimationaux}%, -50%) rotate(${animationAux}deg)`;
            animationAux = animation_value(0.258, 0.276, relativeScrolledSecondPage, 0, 1);
            secondPage.dwnWords[4].style.opacity = `${animationAux}`;
            animationAux = animation_value(0.276, 0.299, relativeScrolledSecondPage, 0, 100);
            secondPage.dwnContainer.style.right = `${animationAux}px`;
            animationAux = animation_value(0.276, 0.299, relativeScrolledSecondPage, 0, 100);
            secondPage.dwnContainer.style.top = `${animationAux}px`;
            animationAux = animation_value(0.285, 0.299, relativeScrolledSecondPage, 1, 0);
            secondPage.dwnContainer.style.opacity = `${animationAux}`;
        } else
            secondPage.dwnContainer.style.display = `none`;

        // "Look at..." and "What can..." animations
        if (relativeScrolledSecondPage >= 0 && relativeScrolledSecondPage <= 0.712) {
            secondPage.doWeNeed[0].style.display = `block`;
            // Appearing diagonal arrow and "Look..."
            animationAux = animation_value(0.285, 0.294, relativeScrolledSecondPage, 0, 1);
            secondPage.diagonalArrow[0].style.opacity = `${animationAux}`;
            animationAux = animation_value(0.294, 0.302, relativeScrolledSecondPage, 0, 1);
            secondPage.diagonalArrow[1].style.opacity = `${animationAux}`;
            // Adjusting diagonal arrow to smaller screen side
            secondanimationaux = window_smallest_size(pageWindow);
            if (pageWindow.windowWidth >= pageWindow.windowHeight)
                secondanimationaux -= 50;
            else
                secondanimationaux -= 15;
            secondPage.diagonalArrowWidth = secondanimationaux;
            animationAux = animation_value(0.285, 0.356, relativeScrolledSecondPage, 15, secondanimationaux);
            secondPage.diagonalArrow[0].style.width = `${animationAux}px`;
            secondPage.diagonalArrow[0].style.height = `${animationAux}px`;
            // Moving "Look at this separation" near to diagonal arrow
            secondPage.diagonalArrow[1].style.top = `${(animationAux / 2) + 50}px`;
            if (relativeScrolledSecondPage < 0.356)
                secondPage.diagonalArrow[1].style.right = `${(animationAux / 2) + 15}px`;
            // Changing text as diagonal arrow grows
            if (relativeScrolledSecondPage >= 0.338)
                secondPage.diagonalArrow[1].innerHTML = `Look at their separation`;
            else if (relativeScrolledSecondPage >= 0.32)
                secondPage.diagonalArrow[1].innerHTML = `Look at their`;
            else if (relativeScrolledSecondPage >= 0.312)
                secondPage.diagonalArrow[1].innerHTML = `Look at`;
            else
                secondPage.diagonalArrow[1].innerHTML = `Look`;
            // Disappearing "Look at this separation"
            if (relativeScrolledSecondPage >= 0.347) {
                animationAux = animation_value(0.347, 0.356, relativeScrolledSecondPage, 1, 0);
                secondPage.diagonalArrow[1].style.opacity = `${animationAux}`;
            }
            // If screen is portrait increase diagonal arrow size to biggest size(height)
            if (pageWindow.windowWidth < pageWindow.windowHeight && relativeScrolledSecondPage >= 0.356) {
                animationAux = animation_value(0.356, 0.392, relativeScrolledSecondPage, secondanimationaux, pageWindow.windowHeight);
                secondPage.diagonalArrow[0].style.width = `${animationAux}px`;
                secondPage.diagonalArrow[0].style.height = `${animationAux}px`;
                secondanimationaux = pageWindow.windowHeight;
                secondPage.diagonalArrowWidth = secondanimationaux;
            }
            // Rotating arrow
            animationAux = animation_value(0.356, 0.392, relativeScrolledSecondPage, 0, 45);
            secondPage.diagonalArrow[0].style.transform = `rotate(${animationAux}deg)`;
            if (relativeScrolledSecondPage >= 0.285)
                secondPage.diagonalArrow[1].style.transform = `translateX(40%) rotate(45deg)`;
            else
                secondPage.diagonalArrow[1].style.transform = `rotate(45deg)`;
            // Hidding top part of the arrow
            if (pageWindow.windowHeight <= 600 && pageWindow.windowWidth > pageWindow.windowHeight)
                thirdAnimationaux = -0.1 * secondanimationaux;
            else if (pageWindow.windowWidth < pageWindow.windowHeight)
                thirdAnimationaux = -0.198 * secondanimationaux;
            else
                thirdAnimationaux = -0.15 * secondanimationaux;
            animationAux = animation_value(0.356, 0.392, relativeScrolledSecondPage, 50, thirdAnimationaux);
            secondPage.diagonalArrow[0].style.top = `${animationAux}px`;
            // Finding how much the diagonal image needs to be
            // shifted to be centered in the page
            thirdAnimationaux = (pageWindow.windowWidth / 2) - (secondanimationaux / 2);
            // Adding the width of the "What" text to the right:"" property so that
            // the diagonal arrow goes left this much and then comes to center
            // of page erasing "What can we do ?" 
            if (pageWindow.windowWidth >= 750)
                secondanimationaux = 270;
            else if (pageWindow.windowWidth >= 465)
                secondanimationaux = 210;
            else
                secondanimationaux = 150;
            secondanimationaux = thirdAnimationaux + secondanimationaux;
        
            // Repositioning diagonal arrow to left
            animationAux = animation_value(0.356, 0.392, relativeScrolledSecondPage, 15, secondanimationaux);
            secondPage.diagonalArrow[0].style.right = `${animationAux}px`;
        
            // Moving "What can we do ?" from right
            thirdAnimationaux = ((secondPage.diagonalArrowWidth / 2) + secondanimationaux - 290);
            animationAux = animation_value(0.392, 0.41, relativeScrolledSecondPage, -400, thirdAnimationaux);
            secondPage.diagonalArrow[2].style.right = `${animationAux}px`;
            animationAux = animation_value(0.406, 0.427, relativeScrolledSecondPage, -400, thirdAnimationaux);
            secondPage.diagonalArrow[3].style.right = `${animationAux}px`;
            animationAux = animation_value(0.423, 0.445, relativeScrolledSecondPage, -400, thirdAnimationaux);
            secondPage.diagonalArrow[4].style.right = `${animationAux}px`;
            animationAux = animation_value(0.441, 0.463, relativeScrolledSecondPage, -400, thirdAnimationaux);
            secondPage.diagonalArrow[5].style.right = `${animationAux}px`;
            animationAux = animation_value(0.459, 0.48, relativeScrolledSecondPage, -400, thirdAnimationaux);
            secondPage.diagonalArrow[6].style.right = `${animationAux}px`;
        
            // Disappearing "What can we do ?"
            animationAux = animation_value(0.49, 0.492, relativeScrolledSecondPage, 1, 0);
            secondPage.diagonalArrow[2].style.opacity = `${animationAux}`;
            secondPage.diagonalArrow[3].style.opacity = `${animationAux}`;
            secondPage.diagonalArrow[4].style.opacity = `${animationAux}`;
            secondPage.diagonalArrow[5].style.opacity = `${animationAux}`;
            secondPage.diagonalArrow[6].style.opacity = `${animationAux}`;
        
            // Moving diagonal arrow to center
            if (relativeScrolledSecondPage >= 0.49) {
                thirdAnimationaux = (pageWindow.windowWidth / 2) - (secondPage.diagonalArrowWidth / 2) - 0;
                animationAux = animation_value(0.49, 0.498, relativeScrolledSecondPage, secondanimationaux, thirdAnimationaux);
                secondPage.diagonalArrow[0].style.right = `${animationAux}px`;
            }

            // Positioning container in website flow
            if (relativeScrolledSecondPage >= 0.505)
                secondPage.doWeNeed[0].style.top = `34.8%`;
            else
                secondPage.doWeNeed[0].style.top = `0%`;
        } else 
            secondPage.doWeNeed[0].style.display = `none`;

        // The insight animations 0.582
        if (relativeScrolledSecondPage >= 0.498 && relativeScrolledSecondPage <= 1.2) {
            secondPage.theInsight[0].style.display = `block`;
            // Appearing "1 + 1 = 2" and disappearing "1 + 1 ="
            // depending on the relative scrolled
            if (relativeScrolledSecondPage < 0.676) {
                animationAux = animation_value(0.57, 0.587, relativeScrolledSecondPage, 0, 1);
                secondPage.theInsight[2].style.opacity = `${animationAux}`;
                animationAux = animation_value(0.582, 0.59, relativeScrolledSecondPage, 0, 1);
                secondPage.theInsight[3].style.opacity = `${animationAux}`;
                animationAux = animation_value(0.586, 0.595, relativeScrolledSecondPage, 0, 1);
                secondPage.theInsight[4].style.opacity = `${animationAux}`;
                animationAux = animation_value(0.589, 0.598, relativeScrolledSecondPage, 0, 1);
                secondPage.theInsight[5].style.opacity = `${animationAux}`;
            } else {
                animationAux = animation_value(0.676, 0.73, relativeScrolledSecondPage, 1, 0);
                secondPage.theInsight[2].style.opacity = `${animationAux}`;
                secondPage.theInsight[3].style.opacity = `${animationAux}`;
                secondPage.theInsight[4].style.opacity = `${animationAux}`;
                secondPage.theInsight[5].style.opacity = `${animationAux}`;
            }
            animationAux = animation_value(0.593, 0.602, relativeScrolledSecondPage, 0, 1);
            secondPage.theInsight[6].style.opacity = `${animationAux}`;
            // Changing number from "2" to "1"
            if (relativeScrolledSecondPage >= 0.64)
                secondPage.theInsight[6].innerHTML = `1`;
            else
                secondPage.theInsight[6].innerHTML = `2`;
            // Fixing numbers at screen center
            if (relativeScrolledSecondPage >= 0.783) {
                secondPage.theInsight[0].style.top = `69.1%`;
                secondPage.theInsight[0].style.position = `relative`;
            } else if (relativeScrolledSecondPage >= 0.61) {
                secondPage.theInsight[0].style.top = `40%`;
                secondPage.theInsight[0].style.position = `fixed`;
            } else {
                secondPage.theInsight[0].style.top = `51.8%`;
                secondPage.theInsight[0].style.position = `absolute`;
            }
            
            // Moving "Scrollbar" to left
            // Responsive "Scrollbar" width 
            if (pageWindow.windowWidth >= 750)
                thirdAnimationaux = 390;
            else if (pageWindow.windowWidth >= 465)
                thirdAnimationaux = 280;
            else
                thirdAnimationaux = 260;
            // Numbers shift to left
            // "50" represents the width of the
            // last number 1 in "1 + 1 = 1"
            secondanimationaux = 50 + thirdAnimationaux;
            secondanimationaux /= 2;
            secondPage.auxVar2 = secondanimationaux - 25;
            secondPage.auxVar2 /= secondPage.theInsight[1].offsetWidth;
            secondPage.auxVar2 *= 100;
            secondPage.auxVar2 += 90;
            // "Scrollbar" shift to right
            secondanimationaux -= 60;
            secondanimationaux /= pageWindow.windowWidth;
            secondanimationaux = 50 - (secondanimationaux * 100);

            // moving numbers to left
            animationAux = animation_value(0.676, 0.747, relativeScrolledSecondPage, -50, -secondPage.auxVar2);
            secondPage.theInsight[1].style.transform = `translate(${animationAux}%, 0%)`;
            // Moving "Scrollbar" from right
            animationAux = animation_value(0.712, 0.748, relativeScrolledSecondPage, 120, secondanimationaux);
            secondPage.theInsight[7].style.left = `${animationAux}%`;
            // Appearing "2 functions"
            animationAux = animation_value(0.755, 0.783, relativeScrolledSecondPage, 0, 1);
            secondPage.insightText[0].style.opacity = `${animationAux}`; 
            // Moving up "And many possible designs"
            animationAux = animation_value(0.783, 0.819, relativeScrolledSecondPage, 40, 25);
            secondPage.insightText[1].style.top = `${animationAux}%`;
            // Appearing "And many possible designs"
            animationAux = animation_value(0.783, 0.819, relativeScrolledSecondPage, 0, 1);
            secondPage.insightText[1].style.opacity = `${animationAux}`; 
            if (pageWindow.windowWidth <= 750) {
                secondanimationaux = 0;
                thirdAnimationaux = 100;
            } else {
                secondanimationaux = 40;
                thirdAnimationaux = 60;
            }
            // Moving menu scroll indicator
            animationAux = animation_value(0.837, 0.9, relativeScrolledSecondPage, secondanimationaux, 100);
            secondPage.menuComponent[1].style.left = `${animationAux}%`;
            animationAux = animation_value(0.837, 0.9, relativeScrolledSecondPage, 0, thirdAnimationaux);
            secondPage.menuComponent[0].style.width = `${animationAux}%`;
            // Moving up "It's a Film"
            animationAux = animation_value(0.87, 0.94, relativeScrolledSecondPage, 90, 52);
            secondPage.insightText[3].style.top = `${animationAux}%`;
            // Appearing "It's a Film"
            animationAux = animation_value(0.9, 0.94, relativeScrolledSecondPage, 0, 1);
            secondPage.insightText[3].style.opacity = `${animationAux}`; 
            // Appearing "And you are the director"
            animationAux = animation_value(0.95, 0.97, relativeScrolledSecondPage, 0, 1);
            secondPage.insightText[5].style.opacity = `${animationAux}`; 
        } else
            secondPage.theInsight[0].style.display = `none`;

        // ----------- THIRD PART ----------
        if (relativeScrolledThirdPage >= 0 && relativeScrolledThirdPage <= 0.7) {
            // Wrench animations
            // Only works with width above 750px
            // considering title width equals 580
            // Moving right wrench
            secondanimationaux = 280 / pageWindow.windowWidth;
            secondanimationaux *= 100;
            secondanimationaux +=50;
            animationAux = animation_value(0.1, 0.22, relativeScrolledThirdPage, 100, secondanimationaux);
            thirdPage.mechanics[1].style.left = `${animationAux}%`;
            animationAux = animation_value(0.1, 0.22, relativeScrolledThirdPage, -250, 28);
            thirdPage.mechanics[1].style.top = `${animationAux}px`;
            animationAux = animation_value(0.1, 0.22, relativeScrolledThirdPage, 300, -36);
            thirdPage.mechanics[1].style.transform = `rotate(${animationAux}deg)`;
            // Moving left wrench
            secondanimationaux = 585;
            secondanimationaux = secondanimationaux / pageWindow.windowWidth;
            secondanimationaux *= 100;
            secondanimationaux = 50 - secondanimationaux;
            thirdAnimationaux = 320 / pageWindow.windowWidth;
            thirdAnimationaux *= 100;
            animationAux = animation_value(0.02, 0.18, relativeScrolledThirdPage, -thirdAnimationaux, secondanimationaux);
            thirdPage.mechanics[2].style.left = `${animationAux}%`;
            animationAux = animation_value(0.02, 0.18, relativeScrolledThirdPage, -250, 17);
            thirdPage.mechanics[2].style.top = `${animationAux}px`;
            animationAux = animation_value(0.02, 0.18, relativeScrolledThirdPage, -380, -140);
            thirdPage.mechanics[2].style.transform = `rotate(${animationAux}deg)`;
            // Moving center wrench
            animationAux = animation_value(0.15, 0.25, relativeScrolledThirdPage, -450, -90);
            thirdPage.mechanics[3].style.transform = `rotate(${animationAux}deg) translateY(-33%)`;
            if (relativeScrolledThirdPage >= 0.22) {
                animationAux = animation_value(0.22, 0.25, relativeScrolledThirdPage, 25, 50);
                thirdPage.mechanics[3].style.left = `${animationAux}%`;
                animationAux = animation_value(0.22, 0.25, relativeScrolledThirdPage, -250, -40);
                thirdPage.mechanics[3].style.top = `${animationAux}px`;
            } else {
                animationAux = animation_value(0.15, 0.22, relativeScrolledThirdPage, -0.7 * thirdAnimationaux, 25);
                thirdPage.mechanics[3].style.left = `${animationAux}%`;
                animationAux = animation_value(0.15, 0.22, relativeScrolledThirdPage, (0.8 * pageWindow.windowHeight), -250);
                thirdPage.mechanics[3].style.top = `${animationAux}px`;
            }
            
            //Clicking play button in text animation 
            if (relativeScrolledThirdPage >= 0.42) {
                animationAux = animation_value(0.42, 0.44, relativeScrolledThirdPage, 0.6, 1);
                thirdPage.purplePlay.style.transform = `translateY(-50%) scale(${animationAux})`;
            } else {
                animationAux = animation_value(0.4, 0.42, relativeScrolledThirdPage, 1, 0.6);
                thirdPage.purplePlay.style.transform = `translateY(-50%) scale(${animationAux})`;
            }
        }

        if (pageWindow.windowHeight >= 500 && relativeScrolledThirdPage >= 0 && relativeScrolledThirdPage <= 1.3) {
            // "animation_value" animation
            animationAux = animation_value(0.47, 0.52, relativeScrolledThirdPage, 200, 0);
            thirdPage.animationFunction.style.letterSpacing = `${animationAux}px`;
            animationAux = animation_value(0.47, 0.51, relativeScrolledThirdPage, 0, 1);
            thirdPage.animationFunction.style.opacity = `${animationAux}`;
            animationAux = animation_value(0.47, 0.51, relativeScrolledThirdPage, 0, 309);
            thirdPage.animationFunction.style.color = `hsl(${animationAux}, 73%, 39%)`;

            // Appearing "Demo" and "Project screens"
            animationAux = animation_value(0.76, 0.81, relativeScrolledThirdPage, 0, 1);
            thirdPage.simplist[0].style.opacity = `${animationAux}`;
            animationAux = animation_value(0.76, 0.81, relativeScrolledThirdPage, 0, 1);
            thirdPage.simplist[1].style.opacity = `${animationAux}`;
            // Moving Simplist screen down
            animationAux = animation_value(0.76, 0.81, relativeScrolledThirdPage, 0, 300);
            thirdPage.simplist[2].style.top = `${animationAux}px`;
        } else {
            thirdPage.animationFunction.style.letterSpacing = `0px`;
            thirdPage.animationFunction.style.opacity = `1`;
            thirdPage.animationFunction.style.color = `hsl(309, 73%, 39%)`;
            thirdPage.simplist[0].style.opacity = `1`;
            thirdPage.simplist[1].style.opacity = `1`;
            thirdPage.simplist[2].style.top = `300px`;
        }

        // ----------- FOURTH PART ----------
        // Hiding and showing "A bit of me" and skills icons
        if (relativeScrolledThirdPage >= 0.9) {
            fourthPage.aboutMe.style.display = `block`;
            fourthPage.skillsIcons[0].style.display = `block`;
        } else {
            fourthPage.aboutMe.style.position = `fixed`;
            fourthPage.aboutMe.style.top = `54.2%`;
            fourthPage.aboutMe.style.display = `none`;
            fourthPage.skillsIcons[0].style.position = `fixed`;
            fourthPage.skillsIcons[0].style.bottom = `-200px`;
            fourthPage.skillsIcons[0].style.display = `none`;
        }

        // Background photo animations
        if (relativeScrolledSecondPage >= 0 && relativeScrolledFourthPage <= 1.1) {
            // Zooming out cinema photo
            animationAux = animation_value(0.8, 1, relativeScrolledFourthPage, 3.8, 0.95);
            fourthPage.designPossibilities.style.transform = `scale3d(${animationAux}, ${animationAux}, 1)`;

            // The end animation
            animationAux = animation_value(0.78, 1, relativeScrolledFourthPage, 3, 0.08);
            fourthPage.designFilter.style.transform = `translate(-50%, -50%) scale(${animationAux})`;
            animationAux = animation_value(0.78, 1, relativeScrolledFourthPage, 0, 1);
            fourthPage.designFilter.style.opacity = `${animationAux}`;


            // Making cinema photo brighter
            if (relativeScrolledFourthPage >= 0.8) {
                animationAux = animation_value(0.8, 1, relativeScrolledFourthPage, 0.11, 1);
                fourthPage.designPossibilities.style.opacity = `${animationAux}`;
            } else {
                animationAux = animation_value(0, 0.2, relativeScrolledFourthPage, 0.13, 0.11);
                fourthPage.designPossibilities.style.opacity = `${animationAux}`;
            }
        }

        if (relativeScrolledFourthPage >= -0.11 && relativeScrolledFourthPage <= 1) {
            // "A bit of me" parallax 
            thirdAnimationaux = (130 + (0.359 * pageWindow.windowHeight)) / dom.contactContainerHeight;
            if (relativeScrolledFourthPage >= thirdAnimationaux) {
                fourthPage.aboutMe.style.position = `absolute`;
                fourthPage.aboutMe.style.top = `120px`;
            } else {
                fourthPage.aboutMe.style.position = `fixed`;
                animationAux = animation_value(0.05, thirdAnimationaux, relativeScrolledFourthPage, 38, 61.6);
                fourthPage.aboutMe.style.top = `${animationAux}%`;
            }
            
            // Skills icons parallax
            if (relativeScrolledFourthPage >= 0.2) {
                fourthPage.skillsIcons[0].style.position = `relative`;
                fourthPage.skillsIcons[0].style.bottom = `0px`;
            } else {
                fourthPage.skillsIcons[0].style.position = `fixed`;
                fourthPage.skillsIcons[0].style.bottom = `-200px`;
            }
            secondanimationaux = 600;
            animationAux = animation_value((0.5 * thirdAnimationaux), thirdAnimationaux, relativeScrolledFourthPage, -secondanimationaux, 0);
            fourthPage.skillsIcons[1].style.top = `${animationAux}px`;
            animationAux = animation_value((0.35 * thirdAnimationaux), (0.82 * thirdAnimationaux), relativeScrolledFourthPage, -secondanimationaux, 0);
            fourthPage.skillsIcons[2].style.top = `${animationAux}px`;
            animationAux = animation_value((0.75 * thirdAnimationaux), thirdAnimationaux, relativeScrolledFourthPage, -secondanimationaux, 0);
            fourthPage.skillsIcons[3].style.top = `${animationAux}px`;
            animationAux = animation_value(0, (0.45 * thirdAnimationaux), relativeScrolledFourthPage, -secondanimationaux, 0);
            fourthPage.skillsIcons[4].style.top = `${animationAux}px`;
            animationAux = animation_value(0, (0.94 * thirdAnimationaux), relativeScrolledFourthPage, -secondanimationaux, 0);
            fourthPage.skillsIcons[5].style.top = `${animationAux}px`;
            animationAux = animation_value((0.6 * thirdAnimationaux), (0.87 * thirdAnimationaux), relativeScrolledFourthPage, -secondanimationaux, 0);
            fourthPage.skillsIcons[6].style.top = `${animationAux}px`;
            animationAux = animation_value(0, (0.66 * thirdAnimationaux), relativeScrolledFourthPage, -secondanimationaux, 0);
            fourthPage.skillsIcons[7].style.top = `${animationAux}px`;
            animationAux = animation_value((0.65 * thirdAnimationaux), thirdAnimationaux, relativeScrolledFourthPage, -secondanimationaux, 0);
            fourthPage.skillsIcons[8].style.top = `${animationAux}px`;

        }

        // Stopping page scroll at website end
        // Changing variables accordingly 
        if (relativeScrolledFourthPage >= 1) {
            navBar.pauseButton.style.display = `none`;
            navBar.playButton.style.display = `none`;
            navBar.reload.style.display = `inline-block`;
            navBar.navbar.className = "navBar";
            pageWindow.boolScrollPage = false;
            navBar.playBtnClicked = false;
            cancelAnimationFrame(pageWindow.animationID);
        }
    };      


    // ------------------- FIRST RENDERING -------------------
    var pageWindow = {
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth,
        scrolledPage: window.pageYOffset,
        animationID: 2.5,
        startTime: 1,
        pixelsToScroll: {
            value: 5,
            pixelsToJump: (window.innerHeight / 500)
        },
        lastScroll: 0,
        autoScrollFramesPassed: 0,
        mousePosition: 0
    };

    var dom = new Object();
    dom.body = document.getElementsByTagName("body")[0];
    dom.variableProgressBarsNodeList = document.getElementsByClassName("variable-progress-bar");
    dom.variableProgressBarsArray = nodeList_to_array(dom.variableProgressBarsNodeList);
    dom.mainContainers = document.getElementsByClassName("main-containers");
    dom.projectsContainerHeight = dom.mainContainers[0].offsetHeight;
    dom.toolsContainerHeight = dom.mainContainers[1].offsetHeight;
    dom.aboutContainerHeight = dom.mainContainers[2].offsetHeight;
    dom.contactContainerHeight = dom.mainContainers[3].offsetHeight;

    // Progress bars here are actually the variable progress bars,
    // the ones colored that change width depending on the thumb
    // position.
    var navBar = new Object();
    navBar.navbar = document.getElementById("navBar");
    navBar.firstProgressBar = dom.variableProgressBarsArray[0];
    navBar.secondProgressBar = dom.variableProgressBarsArray[1];
    navBar.thirdProgressBar = dom.variableProgressBarsArray[2];
    navBar.fourthProgressBar = dom.variableProgressBarsArray[3];
    navBar.playPauseContainer = document.getElementById("container-play-pause");
    navBar.styledThumb = document.getElementById("styled-thumb");
    navBar.playButton = document.getElementById("playButton");
    navBar.pauseButton = document.getElementById("pauseButton");
    navBar.reload = document.getElementById("reload");
    navBar.pageReference = document.getElementById("index");
    navBar.rangeBar = document.getElementById("rangeBar");
    navBar.appearanceStatus = "fixed";
    navBar.rangeBarClicked = false;
    navBar.playBtnClicked = false;
    navBar.relativeThumbPos = 0;
    navBar.coloring_items = coloring_progressBars_playPause;
    navBar.rangebar_updates = event_rangebar_updates;

    var firstPage = new Object();
    firstPage.introContainer = document.getElementById("introduction-container");
    firstPage.crossWord = document.getElementById("crossword-container");
    firstPage.cwLineContainers = document.getElementsByClassName("line-container");
    firstPage.cwVerticalLetters = document.getElementsByClassName("vertical-letter");
    firstPage.cwWhiteband = document.getElementsByClassName("white-band");
    firstPage.timeIsShort = document.getElementById("time-is-short");
    firstPage.tisInner = nodeList_to_array(document.getElementsByClassName("time-is-short-inner"));
    firstPage.tisHidden = document.getElementsByClassName("hidden-text");
    var aux = firstPage.tisHidden[1].getElementsByTagName("a")[0].offsetHeight;
    aux = aux * 100 / pageWindow.windowHeight;
    aux = 50-(aux * 1.2);
    firstPage.auxVar = aux;
    firstPage.keepwtc = document.getElementById("keep-watching-cover");
    firstPage.videosites = document.getElementsByClassName("videosites");

    var secondPage = new Object();
    secondPage.doWeNeed = document.getElementsByClassName("do-we-need-js");
    secondPage.dwnWords = document.getElementsByClassName("do-we-need-words");
    secondPage.diagonalArrow = document.getElementsByClassName("diagonal-arrow");
    secondPage.dwnContainer = document.getElementById("do-we-need-words-container");
    secondPage.diagonalArrowWidth = 0;
    secondPage.theInsight = document.getElementsByClassName("the-insight");
    secondPage.insightText = document.getElementsByClassName("the-insight-text");
    secondPage.auxVar2;
    secondPage.menuComponent = document.getElementsByClassName("menu-component");

    var thirdPage = new Object();
    thirdPage.mechanics = document.getElementsByClassName("the-mechanics");
    thirdPage.purplePlay = document.getElementById("purple-play-button");
    thirdPage.simplist = document.getElementsByClassName("simplist");
    thirdPage.animationFunction = document.getElementById("animation");

    var fourthPage = new Object();
    fourthPage.designPossibilities = document.getElementById("design-possibilities");
    fourthPage.skillsIcons = document.getElementsByClassName("skills-icons");
    fourthPage.aboutMe = document.getElementById("about-me");
    fourthPage.designFilter = document.getElementById("design-filter");


    // Set initial play button CSS display rule to `inline-block`
    // This way, in the function playPause_clicked it is possible
    // to use playButton.style.display instead of 
    // window.getComputedStyle(element, null).display,
    // helping on compatibility issues.
    navBar.playButton.style.display = `inline-block`;
    navBar.pauseButton.style.display = `none`;


    // "Jump to end" functionality
    // Scrolls page directly to fourth page
    firstPage.tisHidden[1].onclick = () => {
        var scrollHeight = dom.projectsContainerHeight;
        scrollHeight += dom.toolsContainerHeight;
        scrollHeight += dom.aboutContainerHeight;
        window.scroll(0, scrollHeight);
    };

    //Reload to beginning
    fourthPage.designFilter.onclick = () => {
        window.scroll(0, 0);
    };

    // Setting scroll events:
    // - On scroll animations
    // - Progress bar coloring
    document.addEventListener("scroll", (e) => {
        if (!navBar.rangeBarClicked) {
            update_rangebar_onscroll(dom, pageWindow, navBar);
        }
        run_animations();
    });

    // Functionalities of the play/pause button
    navBar.playPauseContainer.addEventListener("click", () => {
        playPause_clicked(navBar, pageWindow);
    }, false);

    // Plays page of purple button is clicked
    thirdPage.purplePlay.addEventListener("click", () => {
        playPause_clicked(navBar, pageWindow);
    }, false);

    // Updates the rangeBar thumb position and coloring
    //  if there is a mouse click and hold inside
    //  the rangeBar area  
    navBar.rangeBar.addEventListener("mousedown", (e) => {
        e.preventDefault();
        navBar.rangeBarClicked = true;
        pageWindow.mousePosition = e.clientX;
        event_rangebar_updates(navBar, pageWindow);
    }, false);

    // Unables the rangeBar updates if the mouse
    //  is no longer clicking or holding click
    document.addEventListener("mouseup", () => {
        navBar.rangeBarClicked = false;
    }, false);

    // If it is not a touch screen device,
    //  when there is mouse movement inside
    //  the navBar area it avoids the bar
    //  to disappear
    navBar.navbar.addEventListener("mousemove", (e) => {
        e.preventDefault();
        if (!(window.matchMedia("(pointer: coarse)").matches)) {
            if (navBar.rangeBarClicked) {
                pageWindow.mousePosition = e.clientX;
                event_rangebar_updates(navBar, pageWindow);
                hide_bar_after_delay(navBar);
                pageWindow.autoScrollFramesPassed = 0;
            }
        }
    }, false);

    navBar.rangeBar.addEventListener("touchmove", (e) => {
        e.preventDefault();
        navBar.rangeBarClicked = true;
        pageWindow.mousePosition = e.touches[0].clientX;
        event_rangebar_updates(navBar, pageWindow);
        hide_bar_after_delay(navBar);
        pageWindow.autoScrollFramesPassed = 0;
    }, false);

    // For touch screens, on movement stop the scroll and change playPause button
    dom.body.addEventListener("touchmove", (e) => {
        navBar.pauseButton.style.display = 'none';
        if (navBar.reload.style.display === `inline-block`)
            navBar.playButton.style.display = `none`;
        else
            navBar.playButton.style.display = `inline-block`;
        cancelAnimationFrame(pageWindow.animationID);
        navBar.playBtnClicked = false;
        navBar.rangeBarClicked = false;
        hide_bar_after_delay(navBar);
        update_rangebar_onscroll(dom, pageWindow, navBar);
    }, false);

    // For mouse based screens, on movement stop the scroll and change playPause button
    dom.body.addEventListener("wheel", (e) => {
        navBar.pauseButton.style.display = 'none';
        if (navBar.reload.style.display === `inline-block`)
            navBar.playButton.style.display = `none`;
        else
            navBar.playButton.style.display = `inline-block`;
        cancelAnimationFrame(pageWindow.animationID);
        navBar.playBtnClicked = false;
        hide_bar_after_delay(navBar);
    }, false);

    // For touch screens, on screen touch makes navBar appear
    dom.body.addEventListener("touchstart", (e) => {
        if (navBar.className === "navBar") {
            navBar.appearanceStatus = "none";
            navBar.playBtnClicked = false;
        }
        else {
            hide_bar_after_delay(navBar);
            navBar.playBtnClicked = false;
        }
    }, false);

    // For mouse based screens, on mouse move makes navBar appear
    dom.body.addEventListener("mousemove", (e) => {
        e.preventDefault();
        if (navBar.className === "navBar") {
            navBar.appearanceStatus = "none";
            pageWindow.autoScrollFramesPassed = 0;
        }
        else {
            hide_bar_after_delay(navBar);
            pageWindow.autoScrollFramesPassed = 0;
        }
    }, false);

    //On page resize(reload was here before this code) goes to beginning
    window.addEventListener("resize", (e) => {
        e.preventDefault();
        pageWindow.windowHeight = window.innerHeight;
        pageWindow.windowWidth = window.innerWidth;
        pageWindow.pixelsToScroll.pixelsToJump = (window.innerHeight / 500);
        dom.projectsContainerHeight = dom.mainContainers[0].offsetHeight;
        dom.toolsContainerHeight = dom.mainContainers[1].offsetHeight;
        dom.aboutContainerHeight = dom.mainContainers[2].offsetHeight;
        dom.contactContainerHeight = dom.mainContainers[3].offsetHeight;
    }, false);


    window.addEventListener("reload", (e) => {
        e.preventDefault();

        event_rangebar_updates(navBar, pageWindow);
        run_animations();
    }, false);

}
    useEffect (mount);

  return null;
}

export default Thescript;