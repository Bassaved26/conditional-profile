/* eslint-disable semi */
/* eslint-disable no-empty */
import "../style/index.css";

/**
 *  EDIT ONLY INSIDE THIS RENDER FUNCTION
 *  This function is called every time the user changes types or changes any input
 * 
    {
        includeCover: true, // if includeCover is true the algorithm should show the cover image
        background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da", // this is the image's url that will be used as a background for the profile cover
        avatarURL: "https://randomuser.me/api/portraits/women/42.jpg", // this is the url for the profile avatar
        socialMediaPosition: "right", // social media bar position (left or right)
        
        twitter: null, // social media usernames
        github: null,
        linkedin: null,
        instagram: null,

        name: null,
        lastName: null,
        role: null,
        country: null,
        city: null
    }
 */
function render(variables = {}) {
  console.log("These are the current variables: ", variables); // print on the console
  // here we ask the logical questions to make decisions on how to build the html
  // if includeCover==false then we reset the cover code without the <img> tag to make the cover transparent.
  let cover = `<div class="cover"><img src="${variables.background}" /></div>`;
  if (variables.includeCover == false) cover = "<div class='cover'></div>";

  //REVISANDO INPUTS
  function revisionInputs() {
    let HTMLname = variables.name;
    let HTMLlastname = variables.lastName;

    if (!HTMLname || HTMLname.trim() === "") HTMLname = "name";

    if (!HTMLlastname || HTMLlastname.trim() === "") HTMLlastname = "lastname";

    return `${HTMLname} ${HTMLlastname}`;
  }

  // DEFINIENDO EL ROLE
  let city = ["Toronto", "Munich", "Miami", "Caracas"];
  let country = ["Venezuela", "Germany", "USA", "Canada"];
  let role = ["Web Developer", "Floor Planner", "Technical Writter"];

  let HTMLcity = "";
  let HTMLcountry = "";
  let HTMLrole = "";

  for (let v of city) {
    if (variables.city === null) HTMLcity = "city";
    if (variables.city === v) HTMLcity = v;
  }
  for (let v of country) {
    if (variables.country === null) HTMLcountry = "country";
    if (variables.country === v) HTMLcountry = v;
  }
  for (let v of role) {
    if (variables.role === null) HTMLrole = "role";
    if (variables.role === v) HTMLrole = v;
  }

  let HTMLposition = variables.socialMediaPosition;
  if (HTMLposition === "Left") HTMLposition = "position-left";

  const socialLinks = {
    twitter: "https://twitter.com/",
    github: "https://github.com/",
    linkedin: "https://linkedin.com/in/",
    instagram: "https://instagram.com/"
  };

  function socialMedia() {
    let HTMLsocialMedia = "";
    for (let red in socialLinks) {
      if (!socialLinks[red] || socialLinks[red] === null) HTMLsocialMedia = "";
      HTMLsocialMedia += `<li><a target="_blank" href="${socialLinks[red] + variables[red]}"><i class="fab fa-${red}"></i></a></li>`;
    }
    return HTMLsocialMedia;
  }

  // reset the website body with the new html output"
  document.querySelector("#widget_content").innerHTML = `<div class="widget">
            ${cover}
          <img src="${variables.avatarURL}" class="photo" />
          <h1>${revisionInputs()}</h1>
          <h2>${HTMLrole}</h2>
          <h3>${HTMLcity} ${HTMLcountry}</h3>
          <ul class= ${HTMLposition}>
           ${socialMedia()}
          </ul>
        </div>
    `;
}
/**
 * Don't change any of the lines below, here is where we do the logic for the dropdowns
 */
window.onload = function() {
  window.variables = {
    // if includeCover is true the algorithm should show the cover image
    includeCover: true,
    // this is the image's url that will be used as a background for the profile cover
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    // this is the url for the profile avatar
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    // social media bar position (left or right)
    socialMediaPosition: "position-left",
    // social media usernames
    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,
    name: null,
    lastName: null,
    role: null,
    country: null,
    city: null
  };
  render(window.variables); // render the card for the first time

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      // <- add a listener to every input
      const attribute = e.target.getAttribute("for"); // when any input changes, collect the value
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values)); // render again the card with new values
    });
  });
};
