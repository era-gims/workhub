function toggleMenu() {
  const menu = document.getElementById("navMenu");
  menu.classList.toggle("active");
}

function showMessage(section) {
  alert(section + " feature is coming soon. We are building WorkHub!");
}

function searchPlatform() {
  const search = document.getElementById("searchInput").value;
  const location = document.getElementById("location").value;

  if (!search && !location) {
    alert("Please enter a job, skill, service or location.");
    return;
  }

  alert(
    "Searching for: " +
    (search || "all opportunities") +
    (location ? " in " + location : "")
  );
}
