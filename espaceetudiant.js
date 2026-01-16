const form = document.getElementById("studentForm");
const status1 = document.getElementById("studentStatus");
const submitBtn = form?.querySelector("button");

// ===== Email validation: doit se terminer par @esen.tn =====
function validateEmail(email) {
  const emailRegex = /^[a-zA-Z]+\.[a-zA-Z]+@esen\.tn$/;
  return emailRegex.test(email);
}

// ===== Phone validation: XX xxx xxx =====
function validatePhone(phone) {
  const cleanPhone = phone.replace(/\s/g, "");
  const phoneRegex = /^(\+216)?[2|5|9]\d{7}$/;
  return phoneRegex.test(cleanPhone);
}
  
// ===== Format phone automatically =====
form.studentPhone.addEventListener("input", e => {
  const n = e.target.value.replace(/\D/g, "").slice(0, 8);

  e.target.value = n.slice(0, 2) +(n.length > 2 ? " " + n.slice(2, 5) : "") +(n.length > 5 ? " " + n.slice(5) : "");
});

// ===== Real-time input validation =====
document.querySelectorAll("#studentForm input").forEach(input => {
  input.addEventListener("input", () => {
    let isValid = true;
    if (input.name === "studentEmail") isValid = validateEmail(input.value);
    else if (input.name === "studentPhone") isValid = validatePhone(input.value);
    else isValid = input.value.trim() !== "";

    input.style.borderColor = isValid ? "limegreen" : "crimson";
  });
});
// ===== Submit validation =====
form?.addEventListener("submit", e => {
  e.preventDefault();

  const name = form.studentName.value.trim();
  const email = form.studentEmail.value.trim();
  const phone = form.studentPhone.value.trim();
  const major = form.studentMajor.value.trim();
  const training = form.studentTraining.value.trim();

  const requiredFields = [
    { field: name, label: "Nom & prénom" },
    { field: email, label: "Email professionnel" },
    { field: phone, label: "Téléphone" },
    { field: major, label: "Filière / promotion" },
    { field: training, label: "Formation souhaitée" }
  ];

  for (const { field, label } of requiredFields) {
    if (!field) {
      status1.textContent = `Le champ "${label}" est obligatoire !`;
      status1.className = "form-status error";
      shakeForm();
      return;
    }
  }

  if (!validateEmail(email)) {
    status1.textContent = "Email invalide ! Doit se terminer par @esen.tn";
    status1.className = "form-status error";
    shakeForm();
    return;
  }

  if (!validatePhone(phone)) {
    status1.textContent = "Numéro de téléphone invalide ! Format: +216 XX XXX XXX";
    status1.className = "form-status error";
    shakeForm();
    return;
  }

  // ===== Loading effect =====
  submitBtn.textContent = "Envoi en cours...";
  submitBtn.disabled = true;

  setTimeout(() => {
    status1.textContent = "Merci ! Votre candidature a été envoyée avec succès ✔";
    status1.className = "form-status success";
    form.reset();
    submitBtn.textContent = "Envoyer la candidature";
    submitBtn.disabled = false;
  }, 1500);
});


// ===== Optional: Simple animated counters =====
document.querySelectorAll(".stat-counter").forEach(c => {
  let i = 0, t = +c.dataset.target;
  const timer = setInterval(() => {
    c.textContent = ++i;
    if (i >= t) clearInterval(timer);
  }, 20);
});

