// DOM elements
const yearSelector = document.getElementById("year");
const resetBtn = document.getElementById("resetBtn");
const themeSound = document.getElementById("themeSound");
let appliedTheme = null;

// 🔊 Play retro sound
function playSound() {
  if (themeSound) {
    themeSound.currentTime = 0;
    themeSound.play();
  }
}

//  Apply selected theme
function applyTheme(year) {
    if (appliedTheme) {
      document.head.removeChild(appliedTheme);
    }
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `styles/theme-${year}.css`;
    document.head.appendChild(link);
    appliedTheme = link;

    // Set dropdown value
    yearSelector.value = year;

    // Play sound
    playSound();

    // Highlight active button
    document.querySelectorAll(".year-buttons button").forEach(btn => {
      btn.classList.remove("active");
      if (btn.textContent.includes(year)) {
        btn.classList.add("active");
      }
    });
    
  
    // Prevent showing the popup on initial page load
    if (!appliedTheme) return;
    // Show popup message
    const messages = {
      "1998": "You've time-traveled to 1998. Enjoy the nostalgia!",
      "2005": "2005 – The Web 2.0 era has arrived!",
      "2010": "Welcome to the rise of mobile-first design.",
      "2022": "Glassmorphism, dark mode, and modern bliss."
    };
    
    const showPopup = document.getElementById("showpopup");
    showPopup.style.display = "block";
    showPopup.textContent = messages[year];
    setTimeout(() => {
      showPopup.style.display = "none"; // Hide after 3 seconds
    }, 3000);

  };


// 🧹 Reset theme
resetBtn.addEventListener("click", () => {
  if (appliedTheme) {
    document.head.removeChild(appliedTheme);
    appliedTheme = null;
  }
  yearSelector.value = "";
  document.querySelectorAll(".year-buttons button").forEach(btn => btn.classList.remove("active"));
});

// 🔽 Handle dropdown change
yearSelector.addEventListener("change", (e) => {
  const year = e.target.value;
  if (year) {
    applyTheme(year);
  }
});

// 🎲 Apply random year
function randomYear() {
  const years = ["1998", "2005", "2010", "2022"];
  const year = years[Math.floor(Math.random() * years.length)];
  applyTheme(year);
}

// 🧭 Scroll to year selector
function scrollToSelector() {
  document.getElementById("selector").scrollIntoView({ behavior: "smooth" });
  document.getElementById("popup").style.display = "none"; // Hide popup
}
 document.querySelector('.sample-action').addEventListener('click', function() {
      randomYear(); 
      document.querySelector('.try-it-description').textContent = "Random year selected! Enjoy the transformation.";
      });