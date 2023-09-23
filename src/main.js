document.addEventListener("DOMContentLoaded", () => {
  // Constantes de la API
  const BASE_URL = "https://swapi.dev/api/";
  const RESOURCE_MAP = {
    films: "Films",
    people: "People",
    planets: "Planets",
    species: "Species",
    starships: "Starships",
    vehicles: "Vehicles",
  };

  const selectBtn = document.getElementById("categoryPicker");
  const searchBtn = document.getElementById("searchButton");

  // Función para hacer una solicitud a la API
  async function fetchData(url) {
    console.log(url);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Función para renderizar una lista de entidades
  function renderList(entities, resourceName) {
    const listContainer = document.getElementById("app");
    listContainer.innerHTML = `<h1>${RESOURCE_MAP[resourceName]}</h1>`;
    const ul = document.createElement("ul");
    entities.forEach((entity) => {
      const li = document.createElement("li");
      li.accessKey = entity.url;
      if (entity.name) {
        li.textContent = entity.name;
      } else if (entity.title) {
        li.textContent = entity.title;
      }

      ul.appendChild(li);
    });
    listContainer.appendChild(ul);
  }
  
  // Función para manejar la navegación a una vista de detalle
  function navigateToDetail(resourceUrl, resourceName) {
    fetchData(resourceUrl)
      .then((data) => {
        switch (selectBtn.value) {
          case "people":
            console.log("voy por usuarios");
            renderDetail(data, resourceName);
            break;

          case "planets":
            console.log("voy por Planetas");
            renderDetailPlanet(data, resourceName);
            break;

          case "species":
            console.log("voy por Species");
            break;

          case "starships":
            console.log("voy por naves");
            break;

          case "films":
            renderDetailFilms(data, resourceName);
            console.log("voy por peliculas");
            break;

          case "vehicles":
            console.log("voy por vehicles");
            break;

          default:
            console.warn("\x1B[31m Unknown action type!");
        }
        // renderDetail(data, resourceName);
      })
      .catch((error) => {
        console.error("Error navigating to detail:", error);
      });
  }

  // Función para renderizar una vista de detalle de personas
  function renderDetail(data) {
    const detailContainer = document.getElementById("app");
    detailContainer.innerHTML = `<h1>${data.name} Detail</h1>
    <div> 
      <h2>Characteristics</h2>
      <p>Eye color: ${data.eye_color}<p>
      <p>Height: ${data.height} cm<p>
      <p>Mass: ${data.mass}<p>
      <p>Skin color: ${data.skin_color}<p>
      <p>Hair color: ${data.hair_color}<p>
      <p>Gender: ${data.gender}<p>
      <p>Films: ${data.films.length}<p>
      <div>
        <h3>Planet home</h3>
      
      </div>
    </div>
    `;
    const planetLink = document.createElement("a");
    if (data.homeworld) {
      fetch(data.homeworld)
        .then((response) => response.json())
        .then((homeworldData) => {
          const planetName = homeworldData.name;
          planetLink.textContent = planetName;
          planetLink.href = "#";

          // Agrega un evento de clic al enlace para mostrar información de planetas en el modal
          planetLink.addEventListener("click", function (event) {
            event.preventDefault(); // Evita la navegación por defecto
            // openModalWithPlanets(data.homeworld); // Función para mostrar información de planetas en el modal
          });

          // detailContainer.appendChild(planetLink);
        })
        .catch((error) =>
          console.error("Error fetching homeworld data:", error)
        );
    } else {
      // Si person.homeworld no existe, simplemente muestra un guión o un mensaje
      planetLink.textContent = "-";
    }
    const backButton = document.createElement("button");
    backButton.textContent = "Go Back";
    backButton.addEventListener("click", () => {
      const selectedCategory = selectBtn.value;

      fetchDataCategory(selectedCategory);
    });
    detailContainer.appendChild(planetLink);
    detailContainer.appendChild(backButton);
    // const detailVi = document.getElementById("detailView");
    // detailVi.innerHTML=`<h1>${data.name} Detail</h1>`;

    // renderListChild(data.films
    // console.log(data);
  }
      // tttttttttttttttttttdetalleslist
  function renderDetailPlanet(data) {
    const detailContainer = document.getElementById("app");
    detailContainer.innerHTML = `<h1>${data.name} Detail</h1>
    <div> 
      <h2>Characteristics</h2>
      <p>Climate: ${data.climate}<p>
      <p>Diameter: ${data.diameter} cm<p>
      <p>Population: ${data.population}<p>
      <p>Rotation period: ${data.rotation_period}<p>
      <p>Orbital period: ${data.orbital_period}<p>
      <p>Terrain: ${data.terrain}<p>
    </div>
    `;
    // const resident=
    // renderListEntity(data.residents,"Residents")
    const backButton = document.createElement("button");
    backButton.textContent = "Go Back";
    backButton.addEventListener("click", () => {
      const selectedCategory = selectBtn.value;

      fetchDataCategory(selectedCategory);
    });
    // detailContainer.appendChild(renderListEntity);
    detailContainer.appendChild(backButton);
  }

  function renderDetailFilms(data) {
    const detailContainer = document.getElementById("app");
    detailContainer.innerHTML = `<h1>${data.title} Detail</h1>
    <div> 
      <h2>Characteristics</h2>
      <p>Director: ${data.director}<p>
      <p>Episode: ${data.episode_id} cm<p>
      <p>Producer: ${data.producer}<p>
      <p>Release date: ${data.release_date}<p>
      <p>Characters: ${data.directror}<p>
      <p>Sumary: ${data.opening_crawl}<p>
      <div>
        <h3>Characters</h3>
      
      </div>
    </div>
    `;

    const backButton = document.createElement("button");
    backButton.textContent = "Go Back";
    backButton.addEventListener("click", () => {
      const selectedCategory = selectBtn.value;
      fetchDataCategory(selectedCategory);
    });

    detailContainer.appendChild(backButton);
  }

  // Evento de clic en un elemento de la lista
  document.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
      const resourceUrl = event.target.accessKey;
      navigateToDetail(resourceUrl);
    }
  });

  //traigo los datos iniciales
  fetchData(BASE_URL + "people/" + "?page=1")
    .then((data) => {
      // console.log(data.results)
      renderList(data.results, "people");
    })
    .catch((error) => {
      console.error("Error loading initial data:", error);
    });

  function fetchDataCategory(selectedCategory) {
    fetchData(BASE_URL + selectedCategory + "?page=1")
      .then((data) => {
        renderList(data.results, selectedCategory);
      })
      .catch((error) => {
        console.error("Error loading initial data:", error);
      });
  }

  //https://swapi.dev/api/people/?search=r2
  function searchNames(searchTerm, selectedCategory) {
    fetchData(BASE_URL + selectedCategory + "/?search=" + searchTerm)
      .then((data) => {
        renderList(data.results, selectedCategory);
      })
      .catch((error) => {
        console.error("Error loading initial data:", error);
      });
  }

  categoryPicker.addEventListener("change", function () {
    const selectedCategory = selectBtn.value;
    // Carga por categorias
    fetchDataCategory(selectedCategory);
  });

  searchBtn.addEventListener("click", () => {
    const selectedCategory = selectBtn.value;
    const searchTerm = document.getElementById("searchInput").value;
    searchNames(searchTerm, selectedCategory);
  });

  //find e fin
});
