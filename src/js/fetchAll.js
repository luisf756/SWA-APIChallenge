const BASE_URL = 'https://swapi.dev/api/';
let resourceName = 'people';
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