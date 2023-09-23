document.addEventListener('DOMContentLoaded', () => {
    // Constantes de la API
    const BASE_URL = 'https://swapi.dev/api/';
    const resourceName = 'people';
    let currentPage = 1;
  
    async function fetchPage(page) {
      try {
        const response = await fetch(`${BASE_URL}${resourceName}/?page=${page}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return await response.json();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    function getPageNumber(url) {
      const match = url.match(/page=(\d+)/);
      if (match) {
        return parseInt(match[1], 10);
      }
      return 1;
    }
  
    function renderList(entities) {
      const listContainer = document.getElementById('app');
      listContainer.innerHTML = '';
      
      const ul = document.createElement('ul');
      entities.forEach((entity) => {
        const li = document.createElement('li');
        li.textContent = entity.name; // Cambiar a la propiedad relevante
        ul.appendChild(li);
      });
  
      listContainer.appendChild(ul);
    }

  function implementPagination(data) {
    const paginationContainer = document.createElement("div");
    paginationContainer.classList.add("pagination");

    const prevButton = document.createElement("button");
    prevButton.textContent = "Página anterior";
    prevButton.disabled = !data.previous;
    prevButton.addEventListener("click", () => {
      if (data.previous) {
        currentPage = getPageNumber(data.previous);
        fetchPage(currentPage)
          .then((newData) => {
            renderList(newData.results);
            implementPagination(newData);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }
    });

    const nextButton = document.createElement("button");
    nextButton.textContent = "Página siguiente";
    nextButton.disabled = !data.next;
    nextButton.addEventListener("click", () => {
      if (data.next) {
        currentPage = getPageNumber(data.next);
        fetchPage(currentPage)
          .then((newData) => {
            renderList(newData.results);
            implementPagination(newData);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }
    });

    paginationContainer.appendChild(prevButton);
    paginationContainer.appendChild(nextButton);

    const app = document.getElementById("app");
    app.appendChild(paginationContainer);
  }

  // Cargar la primera página de datos
  fetchPage(currentPage)
    .then((data) => {
      renderList(data.results);
      implementPagination(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

    // Agregar evento de clic al botón de búsqueda
  const searchButton = document.getElementById('searchButton');
  searchButton.addEventListener('click', () => {
    const searchTerm = document.getElementById('searchInput').value;
    searchEntities(searchTerm);
  });

  // Agregar evento de tecla presionada al campo de búsqueda
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      const searchTerm = searchInput.value;
      searchEntities(searchTerm);
    }
  });

  
});
