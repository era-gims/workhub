function toggleMenu() {
  const menu = document.getElementById("navMenu");

  if (menu) {
    menu.classList.toggle("active");
  }
}

function showAuth(mode) {
  const section = document.getElementById("authSection");

  if (section) {
    section.scrollIntoView({
      behavior: "smooth"
    });
  }

  alert("The button is working! Mode: " + mode);
}

function switchAuthMode() {
  alert("Switch button is working!");
}

function searchPlatform() {
  alert("Search button is working!");
}

console.log("WorkHub JavaScript is running.");
