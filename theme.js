/* ===== DARK MODE ===== */
const btn = document.getElementById("toggleTheme");

// toggle
btn.onclick = () => {
  const isDark = document.body.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  btn.textContent = isDark ? "Mode clair" : "Mode sombre";
};

// load theme
const isDarkSaved = localStorage.getItem("theme") === "dark";
document.body.classList.toggle("dark", isDarkSaved);
btn.textContent = isDarkSaved ? "Mode clair" : "Mode sombre";

/* ===== BACK TO TOP ===== */
const topBtn = document.createElement("button");
topBtn.textContent = "↑";
topBtn.className = "back-to-top";
document.body.append(topBtn);

// show / hide on scroll
window.addEventListener("scroll", () =>
  topBtn.classList.toggle("show", window.scrollY > 300)
);
// scroll to top
topBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });


