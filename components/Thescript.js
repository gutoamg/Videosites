import React, { useEffect } from "react";

const Thescript = () => {
  const mount = () => {

    // -----        ----   ----   --------       --------       --------         --------   ----   --------   --------       --------
    //  ----       ----    ----   ----   ----    ----         ----    ----     ----         ----     ----     ----         ----
    //   ----     ----     ----   ----    ----   --------   ----   --   ----     ----       ----     ----     --------       ----
    //    ----   ----      ----   ----   ----    ----         ----    ----         ----     ----     ----     ----             ----
    //     --------        ----   ----------     --------       --------     --------       ----     ----     --------   --------

    //  This code will be refactored in the future with more readable structure around objects,
    //  but if you are a fan of deciphering puzzles here it comes:

    // ------ Functions ------

    // Returns the relative position of the input range standard thumb
    const current_thumb_position = (inputRange, newButton) => {
      var inputMin = 0;
      var inputMax = inputRange.max ? inputRange.max : 1;
      var absoluteThumbPosition = inputRange.value;
      var relativePosition = Number( ((absoluteThumbPosition - inputMin)*100) / (inputMax - inputMin) );
      var roundedPosition = relativePosition.toFixed(4);

      return roundedPosition;
    };

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

    // Coloring progress bars between zero and current thumb position
    // Coloring play/pause button accordingly
    const coloring_progressBars_playPause = (currentRelativeThumbPosition, progressBars, playButton, pauseButton) => {
      const firstProgressBar = progressBars[0].getElementsByClassName("variable-progress-bar")[0];
      const secondProgressBar = progressBars[1].getElementsByClassName("variable-progress-bar")[0];
      const thirdProgressBar = progressBars[2].getElementsByClassName("variable-progress-bar")[0];
      const fourthProgressBar = progressBars[3].getElementsByClassName("variable-progress-bar")[0];
      const pageIndex = document.getElementById("index");

      if (currentRelativeThumbPosition >= 75.5) {
          firstProgressBar.style.width = `100%`;
          secondProgressBar.style.width = `100%`;
          thirdProgressBar.style.width = `100%`;
          fourthProgressBar.style.width = `${ 4*(currentRelativeThumbPosition - 75)}%`;

          playButton.style.fill = `rgba(26, 101, 124, 1)`;
          pauseButton.style.fill = `rgba(26, 101, 124, 1)`;

          pageIndex.innerHTML = `Me`;
      } else if (currentRelativeThumbPosition >= 50.5) {
          firstProgressBar.style.width = `100%`;
          secondProgressBar.style.width = `100%`;
          thirdProgressBar.style.width = `${ 4*(currentRelativeThumbPosition - 50)}%`;
          fourthProgressBar.style.width = `0`;

          playButton.style.fill = `rgba(210, 76, 1, 1)`;
          pauseButton.style.fill = `rgba(210, 76, 1, 1)`;

          pageIndex.innerHTML = `How`;
      } else if (currentRelativeThumbPosition >= 25.5) {
          firstProgressBar.style.width = `100%`;
          secondProgressBar.style.width = `${ 4*(currentRelativeThumbPosition - 25)}%`;
          thirdProgressBar.style.width = `0`;
          fourthProgressBar.style.width = `0`;

          playButton.style.fill = `rgba(210, 160, 1, 1)`;
          pauseButton.style.fill = `rgba(210, 160, 1, 1)`;

          pageIndex.innerHTML = `Why`;
      } else {
          firstProgressBar.style.width = `${4*currentRelativeThumbPosition}%`;
          secondProgressBar.style.width = `0`;
          thirdProgressBar.style.width = `0`;
          fourthProgressBar.style.width = `0`;

          playButton.style.fill = `rgba(202, 51, 5, 1)`;
          pauseButton.style.fill = `rgba(202, 51, 5, 1)`;

          pageIndex.innerHTML = `Hi`;
      }
    };

    // Alternate play/pause buttons
    // Changes navBar class
    // Updates scrolling variable based on thumb position
    const playPause_clicked = (navBar, boolScroll, playButton, pauseButton, pixelsToScroll) => {
      if (playButton.style.display === `inline-block`) {
          var absoluteScroll = 0;
          playButton.style.display = `none`;
          pauseButton.style.display = `inline-block`;
          navBar.className = "navBar hideBar";
          absoluteScroll = relative_to_absolute_position(parseFloat(styledThumb.style.left));
          absoluteScroll -= window.innerHeight;
          pixelsToScroll.value = absoluteScroll;
          scrollPage = true;
          playBtnClicked = true;
      } else {
          pauseButton.style.display = `none`;
          playButton.style.display = `inline-block`;
          navBar.className = "navBar";
          scrollPage = false;
          playBtnClicked = false;
      }
    };

    // Positions styled thumb in the same position than the standard thumb
    // Colors the progresss bars accordingly
    const rangebar_updates = (thumbPosition) => {
      styledThumb.style.left = `calc(${thumbPosition}% + (${1 - thumbPosition * 0.18}px))`;
      coloring_progressBars_playPause(thumbPosition, progressBarsArray, playButton, pauseButton);
    };

    // Positions styled thumb accordingly
    // Colors the progresss bars accordingly
    // If the mouse is moving within the length 
    //  of the rangeBar, it updates thumb 
    //  position, colors the rangeBar and 
    //  scrolls the page proportionally
    const event_rangebar_updates = (mousePosition) => {
      var styledInputLeft, styledInputRight, pageWidth;
      var rangebarWidth, styledinputWidth, thumbPos;
      var styledInput = document.getElementById("styled-input");
      var rangebarLeftX = (document.getElementsByTagName("body")[0].clientWidth - styledInput.clientWidth) / 2;

      rangeBarClicked = true;
      pageWidth = document.getElementsByTagName("body")[0].clientWidth;
      styledinputWidth = styledInput.clientWidth;
      styledInputLeft = ((pageWidth - styledinputWidth) / 2);
      styledInputRight = (styledInputLeft + styledinputWidth);
      thumbPos = (mousePosition - styledInputLeft)*100 / styledinputWidth;
      
      if (mousePosition >= (styledInputLeft - 3) && mousePosition <= (styledInputRight + 5)) {
          styledThumb.style.left = mousePosition - styledInputLeft + "px";
          coloring_progressBars_playPause(thumbPos, progressBarsArray, playButton, pauseButton);
          scroll_page_oninput(thumbPos);
      } 
    };

    // Compares the total scrolled height with the sum of section heights of the website, 
    // considering the viewport height. That way it knows in which of the sections
    // the user is(gets in the first "if" in case it is on the fourth section).
    // Than it subtracts the height of the sections before from the total scrolled
    // height, resulting in the height of the current section being 
    // displayed/exposed in the screen.
    // After that, it divides this value by the respective section height to know the 
    // percentage of the section being exposed. This percentage is
    // precisely how much of the progress bar needs to be filled with
    // color.
    // Because each progress bar has 25% width of the range bar,
    // those values are multiplied and than added to the percentage
    // of previous progress bars to be totally filled.
    // The rangebar_updates function is called to make the 
    // changes based on that value.
    const update_rangebar_onscroll = () => {
      var mainContainers = document.getElementsByClassName("main-containers");
      var projectsContainerHeight = mainContainers[0].offsetHeight;
      var toolsContainerHeight = mainContainers[1].offsetHeight;
      var aboutContainerHeight = mainContainers[2].offsetHeight;
      var contactContainerHeight = mainContainers[3].offsetHeight;
      
      var windowHeight = window.innerHeight;
      var standardThumb = document.getElementById("timeline");
      var scrolledHeight = windowHeight + window.pageYOffset;
      var styledInput = document.getElementById("styled-input");
      var exposedHeight, percentualAppearance;

      if (scrolledHeight >= (projectsContainerHeight + toolsContainerHeight + aboutContainerHeight)) {
          exposedHeight = scrolledHeight - (projectsContainerHeight + toolsContainerHeight + aboutContainerHeight);
          percentualAppearance = exposedHeight/contactContainerHeight;
          percentualAppearance = 75 + percentualAppearance*25;
      } else if (scrolledHeight >= (projectsContainerHeight + toolsContainerHeight)) {
          exposedHeight = scrolledHeight - (projectsContainerHeight + toolsContainerHeight);
          percentualAppearance = exposedHeight/aboutContainerHeight;
          percentualAppearance = 50 + percentualAppearance*25;
      } else if (scrolledHeight >= (projectsContainerHeight)) {
          exposedHeight = scrolledHeight - (projectsContainerHeight);
          percentualAppearance = exposedHeight/toolsContainerHeight;
          percentualAppearance = 25 + percentualAppearance*25;
      } else {
          exposedHeight = (scrolledHeight - windowHeight);
          percentualAppearance = exposedHeight/(projectsContainerHeight - windowHeight);
          percentualAppearance = percentualAppearance*25;
      }
      if (percentualAppearance >= 100)
          percentualAppearance = 100;
      styledThumb.style.left = `${percentualAppearance}%`;
      coloring_progressBars_playPause(percentualAppearance, progressBarsArray, playButton, pauseButton);
    };

    // transforms percentual position of the thumb, relative to the
    // total length of the rangeBar, and transforms it into 
    // pixels from the top of th page until the current position.
    const relative_to_absolute_position = (relativePosition) => {
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
                          aboutContainerHeight + incompleteSectionWidth*contactContainerHeight;
      } else if (relativePosition >= 50) {
          incompleteSectionWidth = (relativePosition - 50) / 25;
          absolutePosition = projectsContainerHeight + toolsContainerHeight +
                          incompleteSectionWidth*aboutContainerHeight;
      } else if (relativePosition >= 25) {
          incompleteSectionWidth = (relativePosition - 25) / 25;
          absolutePosition = projectsContainerHeight + incompleteSectionWidth*toolsContainerHeight;
      } else {
          incompleteSectionWidth = relativePosition / 25;
          absolutePosition = incompleteSectionWidth*(projectsContainerHeight - window.innerHeight) + window.innerHeight;
      }

      return absolutePosition;
    };

    // Scrolls the page when the range thumb is moved
    // Works with reverse logic of update_rangebar_onscroll
    // function.
    const scroll_page_oninput = (thumbPosition) => {
      var positionToScroll = 0;
      positionToScroll = relative_to_absolute_position(thumbPosition);
      positionToScroll -= window.innerHeight;
      pixelsToScroll.value = positionToScroll;
      window.scroll(0, positionToScroll);
    };

    // Receives two values representing the interval in which
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
              intervalBeg = 0.001;
          else if (intervalEnd == 0)
              intervalEnd = 0.001;
          else if (currentPos == 0)
              currentPos = 0.001;
          else if (stateBeg == 0)
              stateBeg = 0.001;
          else if (stateEnd == 0)
              stateEnd = 0.001;
          var changeInState = stateEnd - stateBeg;
          var percentageIntervalPos = (intervalEnd / intervalBeg) - 1;
          var animationVariable = (stateBeg + ((changeInState / percentageIntervalPos) * ((currentPos / intervalBeg) - 1)));
      }

      return animationVariable;
    }; 

    // Variables
    const rangeTimeline = document.getElementById("timeline");
    const styledThumb = document.getElementById("styled-thumb");

    var progressBarsNodeList = document.getElementsByClassName("section");
    var progressBarsArray = nodeList_to_array(progressBarsNodeList);

    const playPauseContainer = document.getElementById("container-play-pause");
    const playButton = document.getElementById("playButton");
    const pauseButton = document.getElementById("pauseButton");

    var scrollPage = true;
    var pixelsToScroll = { value: 5, pixelsToJump: (window.innerHeight / 80) };
    const loadingPage = document.getElementById("loading-page");

    var rangeBarClicked = false;
    var mousePosition;
    var boolRunScrollFunction = true;
    const navBar = document.getElementsByClassName("navBar")[0];
    const rangeBar = document.getElementsByClassName("rangeBar")[0];
    var autoscrollInnerCounting = 0;
    var playBtnClicked = true;
    const windowHeight = window.innerHeight;
    var changeNavBar = 0;

    // Set initial play button CSS display rule to `inline-block`
    // This way, in the function playPause_clicked it is possible
    // to use playButton.style.display instead of 
    // window.getComputedStyle(element, null).display,
    // helping on compatibility issues.
    pauseButton.style.display = `inline-block`;
    playButton.style.display = `none`;


    const run_animations = () => {
      const mergedFuncNodeList = document.getElementsByClassName("merged-functionalities");
      const fixedAnimationsContainer = document.getElementById("fixed-animations");
      const mainContainers = document.getElementsByClassName("main-containers");
      const videositeAdv = document.getElementById("videosite-advantages");
      const fullScreen = document.getElementsByClassName("full-screen")[0];
      const theScript = document.getElementsByClassName("the-script")[0];
      const itsAFilm = document.getElementsByClassName("its-a-film")[0];
      const videositeTitle = document.getElementById("videosite-title");
      const videositeAdvNodeList = document.getElementsByTagName("h3");
      const fixedPicture = document.getElementById("loading-image");
      const questionMark = document.getElementById("question-mark");
      const whyTitle = document.getElementById("why-title");
      const windowWidth = window.innerWidth;

      const HiContainerHeight = mainContainers[0].offsetHeight;
      const WhyContainerHeight = mainContainers[1].offsetHeight;
      const HowContainerHeight = mainContainers[2].offsetHeight;
      const MeContainerHeight = mainContainers[3].offsetHeight;
      const totalheight = HiContainerHeight +
                          WhyContainerHeight +
                          HowContainerHeight +
                          MeContainerHeight;

      var totalScrolled = window.pageYOffset + window.innerHeight;
      var relativeScrolledFirstPage = totalScrolled / HiContainerHeight;
      var relativeScrolledSecondPage = (totalScrolled - HiContainerHeight) / WhyContainerHeight;
      var relativeScrolledThirdPage = 
          (totalScrolled - HiContainerHeight - WhyContainerHeight) / HowContainerHeight;
      var relativeScrolledFourthPage = 
          (totalScrolled - HiContainerHeight - WhyContainerHeight - HowContainerHeight) / 
          MeContainerHeight;
      var animationAuxVar;
      
      // // Zoom the initial-image
      if (relativeScrolledFirstPage >= 1) {
          animationAuxVar = 0.9;
      } else if (relativeScrolledFirstPage >= 0.85) {
          animationAuxVar = animation_value(0.85, 0.99, relativeScrolledFirstPage, 3, 0.9);
          //animationAuxVar = (3 - (3.1*relativeScrolledFirstPage - (2 - relativeScrolledFirstPage*relativeScrolledFirstPage)));
      } else {
          animationAuxVar = 3;
      }
      fixedPicture.style.transform = `scale(${animationAuxVar}, ${animationAuxVar})`;

      // Videosite title goes away
      if (relativeScrolledFirstPage >= 0.55 && relativeScrolledFirstPage <= 0.6) {
          videositeTitle.style.display = `inline-block`;
          animationAuxVar = animation_value(0.55, 0.6, relativeScrolledFirstPage, 50, -100);
          videositeTitle.style.top = `${animationAuxVar}%`;
      } else if (relativeScrolledFirstPage < 0.55) {
          videositeTitle.style.display = `inline-block`;
          videositeTitle.style.top = `50%`;
      } else
          videositeTitle.style.display = `none`;

      // Videosite advantages passing by towards top of page
      if (relativeScrolledFirstPage >= 0.6 && relativeScrolledFirstPage <= 0.65) {
          videositeAdv.style.display = `block`;
          animationAuxVar = animation_value(0.6, 0.65, relativeScrolledFirstPage, 150, 50);
          videositeAdv.style.top = `${animationAuxVar}%`;
      } else if (relativeScrolledFirstPage < 0.6) {
          videositeAdv.style.display = `none`;
          videositeAdv.style.top = `150%`;
      } else  {
          videositeAdv.style.top = `50%`;
          videositeAdv.style.display = `block`;
      }
      if (relativeScrolledFirstPage > 0.95 && relativeScrolledFirstPage <= 0.99) {
          videositeAdv.style.display = `block`;
          animationAuxVar = animation_value(0.95, 0.99, relativeScrolledFirstPage, 1, 0);
          videositeAdv.style.opacity = `${animationAuxVar}`;
      } else if (relativeScrolledFirstPage < 0.95)
          videositeAdv.style.opacity = `1`;
      else
          videositeAdv.style.opacity = `0`;

      // "This" appears
      if (relativeScrolledFirstPage >= 0.84)
          videositeAdvNodeList[2].innerHTML = `More or less, this`;
      else
          videositeAdvNodeList[2].innerHTML = `More or less,`;


      //------ Animations Why page ------
      // Displays fixed container
      if (relativeScrolledSecondPage >= 0.18)
          fixedAnimationsContainer.style.display = `block`;
      else if (relativeScrolledSecondPage < 0.18 || relativeScrolledSecondPage > 1)
          fixedAnimationsContainer.style.display = `none`;
      
          // "Why ?" appearing
      if (relativeScrolledSecondPage >= 0.12 && relativeScrolledSecondPage <= 0.17) {
          animationAuxVar = animation_value(0.12, 0.17, relativeScrolledSecondPage, 0, 230);
          whyTitle.style.width = `${animationAuxVar}px`;
          
          animationAuxVar = animation_value(0.12, 0.17, relativeScrolledSecondPage, 55, 0);
          whyTitle.style.left = `${animationAuxVar}%`;
          
          animationAuxVar = animation_value(0.125, 0.17, relativeScrolledSecondPage, 40, 0);
          questionMark.style.right = `${animationAuxVar}%`;
      } else if (relativeScrolledSecondPage > 0.17) {
          whyTitle.style.width = `230px`;
          whyTitle.style.left = `0%`;
          questionMark.style.right = `0%`;
      } else {
          whyTitle.style.width = `0px`;
          whyTitle.style.left = `55%`;
          questionMark.style.right = `40%`;
      }

      // Changes fixed animations container position
      if (relativeScrolledSecondPage >= 0.996) {
          fixedAnimationsContainer.style.top = `90%`;
          fixedAnimationsContainer.style.position = `absolute`;
      } else {
          fixedAnimationsContainer.style.top = `50%`;
          fixedAnimationsContainer.style.position = `fixed`;
      }

      // Changes full screen container position
      if (relativeScrolledSecondPage >= 0.266 && relativeScrolledSecondPage <= 0.45) {
          fullScreen.style.display = `block`;
          if (relativeScrolledSecondPage >= 0.41) { // Container goes away
              animationAuxVar = animation_value(0.41, 0.45, relativeScrolledSecondPage, 50, -100);
              fullScreen.style.left = `${animationAuxVar}%`;
          } else { // Container appears
              animationAuxVar = animation_value(0.266, 0.32, relativeScrolledSecondPage, 150, 50);
              fullScreen.style.left = `${animationAuxVar}%`;
          }
      } else 
          fullScreen.style.display = `none`;

      // Merged functionalities container animations
      if (relativeScrolledSecondPage >= 0.47 && relativeScrolledSecondPage <= 0.72) {
          mergedFuncNodeList[0].style.display = `inline-block`;
          
          if (relativeScrolledSecondPage >= 0.695) { // Container goes away
              animationAuxVar = animation_value(0.695, 0.72, relativeScrolledSecondPage, 50, -100);
              mergedFuncNodeList[0].style.left = `${animationAuxVar}%`;
          } else { // Container appears
              animationAuxVar = animation_value(0.47, 0.51, relativeScrolledSecondPage, 150, 50);
              mergedFuncNodeList[0].style.left = `${animationAuxVar}%`;
              // Vertical scrollbar goes down
              animationAuxVar = animation_value(0.52, 0.7, relativeScrolledSecondPage, -50, 150);
              mergedFuncNodeList[1].style.top = `${animationAuxVar}%`;
              // Horizontal scrollbar goes right
              animationAuxVar = animation_value(0.52, 0.7, relativeScrolledSecondPage, -50, 150);
              mergedFuncNodeList[2].style.left = `${animationAuxVar}%`;
          }
      } else 
          mergedFuncNodeList[0].style.display = `none`;

      // Changes "It's a FILM" container position
      if (relativeScrolledSecondPage >= 0.73 && relativeScrolledSecondPage <= 0.9) {
          itsAFilm.style.display = `block`;
          if (relativeScrolledSecondPage >= 0.88) { // Container goes away
              animationAuxVar = animation_value(0.88, 0.9, relativeScrolledSecondPage, 50, -100);
              itsAFilm.style.left = `${animationAuxVar}%`;
          } else { // Container appears
              animationAuxVar = animation_value(0.73, 0.77, relativeScrolledSecondPage, 150, 50);
              itsAFilm.style.left = `${animationAuxVar}%`;
          }
      } else if (relativeScrolledSecondPage > 0.9) {
          itsAFilm.style.display = `none`;
          itsAFilm.style.left = `-100%`;
      } else  
          itsAFilm.style.display = `none`;

      // Changes "Btw, here's the script" container position
      if (relativeScrolledSecondPage >= 0.9 && relativeScrolledSecondPage <= 0.95) {
          theScript.style.display = `block`;
          theScript.style.backgroundColor = `rgba(255, 255, 255, 0)`;
          // Container appears
          animationAuxVar = animation_value(0.9, 0.95, relativeScrolledSecondPage, 150, 50);
          theScript.style.left = `${animationAuxVar}%`;
      } else if (relativeScrolledSecondPage < 0.9) {
          theScript.style.display = `none`;
          theScript.style.backgroundColor = `rgba(255, 255, 255, 0)`;
      } else {
          theScript.style.display = `block`;
          theScript.style.left = `50%`;
          animationAuxVar = animation_value(0.95, 0.99, relativeScrolledSecondPage, 0, 0.3);
          theScript.style.backgroundColor = `rgba(255, 255, 255, ${animationAuxVar})`;
      }
    };


    // Setting scroll events:
    // - On scroll animations
    // - Progress bar coloring
    document.addEventListener("scroll", () => {
      update_rangebar_onscroll();
    });

    // Auto scroll page
    // Hide navBar after 3 seconds without 
    //  mouse movement or navBar activity
    const autoScroll = () => {
      autoscrollInnerCounting++;
      if (changeNavBar === 1)
          navBar.className = "navBar";
      else if (changeNavBar === 2)
          navBar.className = "navBar appearBar";
      else if (changeNavBar === 3)
          navBar.className = "navBar hideBar";

      if (scrollPage) {
          window.scroll(0, pixelsToScroll.value);
          pixelsToScroll.value = window.pageYOffset + pixelsToScroll.pixelsToJump;
      }
      if (!playBtnClicked) {
          autoscrollInnerCounting = 0;
      }
      if(autoscrollInnerCounting == 40) {
          autoscrollInnerCounting = 0;
          navBar.className = "navBar hideBar";
      }

      run_animations();
    };
    setInterval(autoScroll, 50);

    // Functionalities of the play/pause button
    playPauseContainer.addEventListener("click", () => {
      playPause_clicked(navBar, scrollPage, playButton, pauseButton, pixelsToScroll);
    }, false);

    // Unables the rangeBar updates if the mouse
    //  is no longer clicking or holding click
    document.addEventListener("mouseup", () => {
      rangeBarClicked = false;
    }, false);

    // Updates the rangeBar thumb position and coloring
    //  if there is a mouse click and hold inside
    //  the rangeBar area  
    rangeBar.addEventListener("mousedown", (e) => {
      e.preventDefault();
      mousePosition = e.clientX;
      event_rangebar_updates(mousePosition);
    }, false);

    // If it is not a touch screen device,
    //  when there is mouse movement inside
    //  the navBar area it avoids the bar
    //  to disappear
    navBar.addEventListener("mousemove", (e) => {
      e.preventDefault();
      if(!(window.matchMedia("(pointer: coarse)").matches)) {
          if (rangeBarClicked) {
              mousePosition = e.clientX;
              event_rangebar_updates(mousePosition);
              changeNavBar = 1;
              autoscrollInnerCounting = 0;
          }
      }
    }, false);

    rangeBar.addEventListener("touchmove", (e) => {
      e.preventDefault();
      rangeBarClicked = true;
      mousePosition = e.touches[0].clientX;
      if (rangeBarClicked) {
          event_rangebar_updates(mousePosition);
      }
      changeNavBar = 1;
      autoscrollInnerCounting = 0;
    }, false);


    // For touch screens, on movement stop the scroll and change playPause button
    var lastTopPos = 0;
    document.getElementsByTagName("body")[0].addEventListener("touchmove", (e) => {
      playButton.style.display = `inline-block`;
      pauseButton.style.display = 'none';
      scrollPage = false;
      playBtnClicked = false;
      changeNavBar = 1;
    }, false);

    // For mouse based screens, on movement stop the scroll and change playPause button
    document.getElementsByTagName("body")[0].addEventListener("wheel", (e) => {
      pauseButton.style.display = 'none';
      playButton.style.display = `inline-block`;
      scrollPage = false;
      playBtnClicked = false;
      changeNavBar = 1;
      //playPause_clicked(navBar, scrollPage, playButton, pauseButton, pixelsToScroll);
    }, false);

    // For touch screens, on screen touch makes navBar appear
    document.getElementsByTagName("body")[0].addEventListener("touchstart", (e) => {
      if (navBar.className === "navBar") {
          changeNavBar = 0;
          playBtnClicked = false;    
      }
      else {
          changeNavBar = 1;
          playBtnClicked = false;
      }
    }, false);

    // For mouse based screens, on mouse move makes navBar appear
    document.getElementsByTagName("body")[0].addEventListener("mousemove", (e) => {
      e.preventDefault();
      if (navBar.className === "navBar") {
          changeNavBar = 0;
          autoscrollInnerCounting = 0;
      }
      else {
          changeNavBar = 1;
          autoscrollInnerCounting = 0;
      }
    }, false);
  }
  useEffect (mount);

  return null;
}

export default Thescript;