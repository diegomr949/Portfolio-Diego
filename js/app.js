import { projects } from './data.js';

// --- SELECCIÓN DE ELEMENTOS DEL DOM ---
const projectsContainer = document.getElementById('projects-container');
const navToggle = document.querySelector('.nav__toggle');
const navMenu = document.querySelector('#nav-menu');
const navLinks = document.querySelectorAll('.nav__link');

// --- CONFIGURACIÓN DE ANIMACIONES  ---
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target); // Dejar de observar una vez mostrado
        }
    });
}, observerOptions);

function initScrollAnimations() {
    // Seleccionamos todo lo que tenga la clase .hidden
    const elementsToAnimate = document.querySelectorAll('.hidden');
    elementsToAnimate.forEach((el) => observer.observe(el));
}

// --- GENERADOR DE TARJETAS ---
function createProjectCard(project) {
    const techTags = project.tech.map(tag => `<li>${tag}</li>`).join('');

    
    return `
        <article class="card hidden">
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

// --- RENDERIZADO PRINCIPAL ---
function renderProjects() {
    if (!projectsContainer) return;

    projectsContainer.innerHTML = '';

    projects.forEach(project => {
        const cardHTML = createProjectCard(project);
        projectsContainer.insertAdjacentHTML('beforeend', cardHTML);
    });

    // Iniciamos la animación DESPUÉS de crear las tarjetas
    initScrollAnimations();
}

// --- CARGA  ---
document.addEventListener('DOMContentLoaded', () => {
    // Renderizar Proyectos
    renderProjects();
    console.log(`✅ Se cargaron ${projects.length} proyectos correctamente.`);

    // Lógica del Menú Hamburguesa
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show-menu');
        });
    }

    // Cerrar menú al hacer clic en un link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    });

    /* --- FORM DE CONTACTO --- */
    const contactForm = document.getElementById('contact-form');
    const formButton = document.getElementById('form-button');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Evitar que la página se recargue

            // Cambiar estado del botón (UX)
            const originalButtonText = formButton.innerText;
            formButton.innerText = 'Enviando...';
            formButton.disabled = true;

            // Capturar los datos
            const formData = new FormData(contactForm);

            try {
                // Enviar a Formspree usando fetch
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                // Manejar respuesta
                if (response.ok) {
                    formStatus.innerText = '¡Mensaje enviado! Te responderé pronto.';
                    formStatus.classList.add('success');
                    contactForm.reset();
                } else {
                    formStatus.innerText = 'Hubo un error al enviar. Intenta nuevamente.';
                    formStatus.classList.add('error');
                }
            } catch (error) {
                formStatus.innerText = 'Error de conexión.';
                formStatus.classList.add('error');
            } finally {
                // Restaurar botón
                formButton.innerText = originalButtonText;
                formButton.disabled = false;
                
                
                setTimeout(() => {
                    formStatus.className = 'form-status'; 
                }, 5000);
            }
        });
    }
    /* --- Dark mode --- */
    const themeToggle = document.getElementById('theme-toggle');
    const iconSun = document.getElementById('theme-icon-sun');
    const iconMoon = document.getElementById('theme-icon-moon');
    
    // Función para aplicar el tema
    const applyTheme = (theme) => {
        document.body.setAttribute('data-theme', theme);
        
        if (theme === 'dark') {
            iconMoon.classList.add('hidden'); // Ocultar luna
            iconSun.classList.remove('hidden'); // Mostrar sol
        } else {
            iconSun.classList.add('hidden'); // Ocultar sol
            iconMoon.classList.remove('hidden'); // Mostrar luna
        }
    };

    // Verificar preferencia guardada o del sistema
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        applyTheme(savedTheme); // Usar lo guardado
    } else if (systemPrefersDark) {
        applyTheme('dark'); // Usar preferencia del sistema
    }

    // Click
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme); // Guardar en "base de datos" local
        });
    }
});