/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
// navbar element
const navElement = document.querySelector("#navbar__list");
// all sections elements
const sectionElements = document.querySelectorAll("section");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */
// bulid the navbar
// handle event for click in each item in navbar
const buildTheNav = () => {
  // virtual dom element that will contains all items of navbar
  const fragmentContainer = document.createDocumentFragment();
  // loop over sections elelments
  for (sectionElement of sectionElements) {
    // get text from section element that will shown in navbar item
    let navtext = sectionElement.getAttribute("data-nav");
    // create nav item which is list item
    let navElement = document.createElement("li");
    /*
    reate link that going to be in the list item
    and enable the user to navigate through sections
    */
    let aNavElement = document.createElement("a");
    // get the section id that will nav item go to it
    let navId = sectionElement.getAttribute("id");
    aNavElement.textContent = navtext;
    aNavElement.setAttribute("data-id", navId);
    navElement.appendChild(aNavElement);
    fragmentContainer.appendChild(navElement);
  }
  navElement.appendChild(fragmentContainer);
  navElement.addEventListener("click", scrollToTheTargetSection);
};
/**
 * End Helper Functions
 * Begin Main Functions
 *
 */
// check if the section element is in viewport
const isSectionInViewport = (sectionElement) => {
  const SectionBox = sectionElement.getBoundingClientRect();
  return (
    SectionBox.top >= 0 &&
    SectionBox.left >= 0 &&
    SectionBox.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    SectionBox.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
};
// build the nav
// Add class 'active' to section when near top of viewport
// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
// Scroll to section on link click
// Set sections as active
const scrollToTheTargetSection = (e) => {
  e.preventDefault();
  const sectionId = e.target.getAttribute("data-id");
  if (sectionId) {
    const targetSectionElement = document.getElementById(sectionId);
    targetSectionElement.classList.add("active");
    e.target.parentNode.classList.add("active");
    removeActiveSection();
    window.scrollTo({
      top: targetSectionElement.offsetTop,
      behavior: "smooth",
    });
  }
};

// remove active class from current active section
const removeActiveSection = () => {
  const activeSection = document.querySelector(".active");
  activeSection.classList.remove("active");
};
// in case user scroll
// loop over our sections
// get the current section in viewport
// remove active class from previous active section
// add active class to the section that is currently in viewport
const handleScroll = () => {
  for (sectionElement of sectionElements) {
    sectionElement.classList.remove("active");
    if (isSectionInViewport(sectionElement)) {
      sectionElement.classList.add("active");
      const activeNavElement = navElement.querySelector(".active");
      if (activeNavElement) {
        activeNavElement.classList.remove("active");
      }
      navElement
        .querySelector(`[data-id=${sectionElement.getAttribute("id")}]`)
        .parentNode.classList.add("active");
    }
  }
};
// handle scroll event
document.addEventListener("scroll", handleScroll);

// bulid navbar
// handle click events
buildTheNav();
