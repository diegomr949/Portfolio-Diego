// 1. Importamos los datos desde nuestro "módulo"
import { projects } from './data.js';

// 2. Seleccionamos el contenedor del DOM
const projectsContainer = document.getElementById('projects-container');

// 3. Función para generar el HTML de una tarjeta
function createProjectCard(project) {
    // Convertimos el array de tecnologías en strings <li>...</li>
    // .map() transforma cada elemento del array.
    // .join('') une todo en un solo string de texto.
    const techTags = project.tech.map(tag => `<li>${tag}</li>`).join('');

    return `
        <article class="card">
            <div class="card__header">
                <div class="folder-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                </div>
                <div class="card__links">
                    <a href="${project.githubLink}" target="_blank" aria-label="Ver código">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                    </a>
                    <a href="${project.liveLink}" target="_blank" aria-label="Ver demo">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </a>
                </div>
            </div>
            
            <h3 class="card__title">${project.title}</h3>
            <p class="card__description">${project.description}</p>
            
            <ul class="card__tech-list">
                ${techTags} 
            </ul>
        </article>
    `;
}

// 4. Función Principal: Renderizar todo
function renderProjects() {
    // Si el contenedor no existe (por si estamos en otra página), paramos.
    if (!projectsContainer) return;

    // Limpiamos contenido previo (buena práctica)
    projectsContainer.innerHTML = '';

    // Recorremos los datos e inyectamos el HTML
    projects.forEach(project => {
        const cardHTML = createProjectCard(project);
        // insertAdjacentHTML es más rápido y seguro que innerHTML += ...
        projectsContainer.insertAdjacentHTML('beforeend', cardHTML);
    });
}

// 5. Ejecutamos al cargar
// DOMContentLoaded asegura que el HTML esté listo antes de correr el JS
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    console.log(`✅ Se cargaron ${projects.length} proyectos correctamente.`);
});