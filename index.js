// Récupération de l'image
const heroImg = document.getElementById("heroImage");

// Changement d'image au survol
heroImg.addEventListener("mouseenter", () => {
    heroImg.src = "../files/images/equipe.jpeg"; // image au survol
});

// Retour à l'image originale quand la souris sort
heroImg.addEventListener("mouseleave", () => {
    heroImg.src = "../files/images/524139348_1268080271775592_4973509662344700066_n.jpg";
});

