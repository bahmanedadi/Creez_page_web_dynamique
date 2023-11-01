let worksData = [];
let categoriesData = [];

/* Récupération des données des travaux*/
fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
        worksData = data;
        /* Appel d'une fonction pour ajouter les travaux à la galerie*/
        addWorksToGallery(worksData);
        console.log(worksData);
    });

/* Récupération des données des catégories*/
fetch('http://localhost:5678/api/categories')
    .then(response => response.json())
    .then(data => {
        categoriesData = data;
        /* Appel d'une fonction pour créer les boutons de catégorie*/
        createCategoryButtons(categoriesData);
    });

/* Fonction pour ajouter les travaux à la galerie*/
function addWorksToGallery(works) {
    const galerie = document.querySelector('.gallery');
    galerie.innerHTML = '';

    works.forEach(work => {
        const figure = document.createElement('figure');
        const image = document.createElement('img');
        image.src = work.imageUrl;
        image.alt = work.title;
        const legende = document.createElement('figcaption');
        legende.textContent = work.title;
        figure.appendChild(image);
        figure.appendChild(legende);
        galerie.appendChild(figure);
    });
}

/* Fonction pour créer les boutons de catégorie*/
function createCategoryButtons(categories) {
    const divBtns = document.querySelector('.btns');
    const galerie = document.querySelector('.gallery');

    categories.forEach(categorie => {
        const bouton = document.createElement('button');
        bouton.innerText = categorie.name;
        bouton.classList.add('btn');
        bouton.addEventListener('click', function () {
            const categorieSelectionnee = categorie.name;

            /*Filtrer les travaux en fonction de la catégorie sélectionnée*/
            const travauxFiltres = worksData.filter(work => work.category.name === categorieSelectionnee);

            /* Affichez les travaux filtrés dans la galerie*/
            addWorksToGallery(travauxFiltres);
            console.log(travauxFiltres);
            /* Retirez la classe "active" de tous les boutons de catégorie*/
            const allButtons = document.querySelectorAll('.btn');
            allButtons.forEach(button => {
                button.classList.remove('active');
            });

            /* Ajoutez la classe "active" uniquement au bouton cliqué*/
            bouton.classList.add('active');
        });
        divBtns.appendChild(bouton);
    });
}



/* Fonction pour ajouter les travaux à la galerie*/
function addWorksToGallery(works, target) {
    const galerie = document.querySelector(target);
    galerie.innerHTML = '';

    works.forEach(work => {
        const figure = document.createElement('figure');
        const image = document.createElement('img');
        image.src = work.imageUrl;
        image.alt = work.title;
        const legende = document.createElement('figcaption');
        legende.textContent = work.title;
        figure.appendChild(image);
        figure.appendChild(legende);
        galerie.appendChild(figure);
    });
}

const boutonTous = document.querySelector('.btn_1');
boutonTous.addEventListener('click', function () {
    /*Affichez tous les travaux dans la galerie (sans filtre par catégorie)*/
    addWorksToGallery(worksData);
    console.log(worksData);

    /* Retirez la classe "active" de tous les boutons de catégorie */
    const allButtons = document.querySelectorAll('.btn');
    allButtons.forEach(button => {
        button.classList.remove('active');
    });

    /* Ajoutez la classe "active" uniquement au bouton cliqué */
    boutonTous.classList.add('active');
});


if (localStorage.getItem("token")) {
    document.getElementById("login").innerHTML = '<a id="logout">logout</a>';
    const modal = document.getElementById("myModal");
    const closeButton = document.querySelector(".close");

    // Afficher la modal
    modal.style.display = "block";

    // Fermer la modal lorsque l'utilisateur clique sur le bouton de fermeture
    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Fermer la modal lorsque l'utilisateur clique en dehors de la modal
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Mettez à jour la modal avec les travaux
    addWorksToModal(worksData);

    document.getElementById("logout").addEventListener("click", () => {
        localStorage.removeItem("token");
        document.getElementById("login").innerHTML = '<a href="login.html">logout</a>';
    });
} else {
    document.getElementById("login").innerHTML = '<a href="login.html">login</a>';
    document.querySelector('.btns').style.display = 'block';
}

function addWorksToModal(works) {
    const galerie = document.querySelector('.modal-content');

    works.forEach(work => {
        const figure = document.createElement('figure');
        const image = document.createElement('img');
        image.src = work.imageUrl;
        figure.appendChild(image);
        galerie.appendChild(figure);
    });
}