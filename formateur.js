const form = document.getElementById("mentorForm");
const status1 = document.getElementById("mentorStatus");
const submitBtn = form?.querySelector("button");

// ===== Email: prenom.nom@esen.tn =====
function validateEmail(email) {
  const emailRegex = /^[a-zA-Z]+\.[a-zA-Z]+@esen\.tn$/;
  return emailRegex.test(email);
}
// ===== Phone: XX XXX XXX (8 chiffres) =====
function validatePhone(phone) {
  const cleanPhone = phone.replace(/\s/g, "");
  const phoneRegex = /^(\+216)?[2|5|9]\d{7}$/;
  return phoneRegex.test(cleanPhone);
}

// ===== Format phone automatically =====
form.mentorTel.addEventListener("input", e => {
  const n = e.target.value.replace(/\D/g, "").slice(0, 8);

  e.target.value = n.slice(0, 2) +(n.length > 2 ? " " + n.slice(2, 5) : "") +(n.length > 5 ? " " + n.slice(5) : "");
});


// ===== Real-time validation =====
document.querySelectorAll("#mentorForm input").forEach(input => {
  input.addEventListener("input", () => {
    let isValid = true;
    if (input.name === "mentorEmail") 
        isValid = validateEmail(input.value);
    else if (input.name === "mentorTel") 
        isValid = validatePhone(input.value);
    else 
        isValid = input.value.trim() !== "";
        
    input.style.borderColor = isValid ? "limegreen" : "crimson";
  });
});

// ===== Textarea character counter =====
mentorBio.oninput = () =>
  bioCount.textContent = mentorBio.value.length;

// ===== Submit validation =====
form?.addEventListener("submit", (e) => {
  e.preventDefault();

  const get = (name) => form[name].value.trim();

  const name = get("mentorName");
  const email = get("mentorEmail");
  const phone = get("mentorTel");
  const expertise = get("expertise");
  const experience = get("experience");
  const training = get("nextTraining");
  const format = get("format");

  const fail = (msg) => {
    status1.textContent = msg;
    status1.className = "form-status error";
    shakeForm();
  };

  if (!name) return fail('Le champ "Nom & prénom" est obligatoire !');
  if (!email) return fail('Le champ "Email professionnel" est obligatoire !');
  if (!phone) return fail('Le champ "Téléphone" est obligatoire !');
  if (!expertise) return fail('Le champ "Spécialité principale" est obligatoire !');
  if (!experience) return fail('Le champ "Années d\'expérience" est obligatoire !');
  if (!training) return fail('Le champ "Titre de la formation" est obligatoire !');
  if (!format) return fail('Le champ "Format & durée" est obligatoire !');

  if (!validateEmail(email))
    return fail("Email invalide ! Format requis : prenom.nom@esen.tn");

  if (!validatePhone(phone))
    return fail("Téléphone invalide ! Format requis : XX XXX XXX");

  if (+experience < 1)
    return fail("Les années d'expérience doivent être ≥ 1");

  // loading
  submitBtn.textContent = "Envoi en cours...";
  submitBtn.disabled = true;

  setTimeout(() => {
    status1.textContent = "Merci ! Votre proposition a été envoyée avec succès ✔";
    status1.className = "form-status success";
    form.reset();
    submitBtn.textContent = "Envoyer la proposition";
    submitBtn.disabled = false;
  }, 1500);
});


// ===== Simple animated counters =====
document.querySelectorAll(".stat-counter").forEach(c => {
  let i = 0, t = +c.dataset.target;
  const timer = setInterval(() => {
    c.textContent = ++i;
    if (i >= t) clearInterval(timer);
  }, 20);
});



