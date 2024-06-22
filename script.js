document.addEventListener('DOMContentLoaded', () => {
    const newsContainer = document.getElementById('news-container');
    if (newsContainer) {
        loadNews();
    }

    const teamContainer = document.getElementById('team-container');
    if (teamContainer) {
        loadTeam();
    }

    const publicationsContainer = document.getElementById('publications-container');
    if (publicationsContainer) {
        loadPublications();
    }

    const codeContainer = document.getElementById('code-container');
    if (codeContainer) {
        loadCode();
    }

    const sponsorsContainer = document.getElementById('sponsors-container');
    if (sponsorsContainer) {
        loadSponsors();
    }

    const projectContainer = document.getElementById('project-container');
    if (projectContainer) {
        loadProject();
    }

    const newsArticle = document.getElementById('news-article');
    if (newsArticle) {
        loadNewsDetails();
    }

    const slideshowContainer = document.getElementById('slideshow-container');
    if (slideshowContainer) {
        loadSlideshow();
    }

    // Monitorar o scroll da página
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        let header = document.getElementById('header');
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            header.classList.add('hidden'); // Esconder o header ao rolar para baixo
        } else {
            header.classList.remove('hidden'); // Mostrar o header ao rolar para cima
        }
        lastScrollTop = scrollTop;
    });

    // Mostrar o header quando o mouse estiver próximo do topo
    document.addEventListener('mousemove', (event) => {
        let header = document.getElementById('header');
        if (event.clientY < 50) {
            header.classList.remove('hidden');
        }
    });

    // Mostrar o header quando o mouse estiver sobre ele
    let header = document.getElementById('header');
    header.addEventListener('mouseenter', () => {
        header.classList.remove('hidden');
    });


});

 // Mostrar o header quando o mouse estiver sobre ele
    let header = document.getElementById('header');
    header.addEventListener('mouseenter', () => {
        header.classList.remove('hidden');
    });

    // Ocultar o footer até que o visitante role até o final da página
    const footer = document.querySelector('footer');
    footer.style.display = 'none';

    window.addEventListener('scroll', () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            footer.style.display = 'block';
        } else {
            footer.style.display = 'none';
        }
    });

function loadNews() {
    fetch('data/news.json')
        .then(response => response.json())
        .then(data => {
            const newsContainer = document.getElementById('news-container');

            // Ordenar notícias pela data, mais recentes primeiro
            data.sort((a, b) => new Date(b.date) - new Date(a.date));

            data.forEach(news => {
                const newsItem = document.createElement('div');
                newsItem.classList.add('news-item');
                newsItem.innerHTML = `
                    <h3><a href="news.html?id=${news.id}">${news.title}</a></h3>
                    <p>${news.subtitle}</p>
                    <small>${news.date}</small>
                `;
                newsContainer.appendChild(newsItem);
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function loadNewsDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const newsId = urlParams.get('id');

    if (!newsId) {
        document.getElementById('news-article').innerHTML = '<p>No news ID provided</p>';
        return;
    }

    fetch('data/news.json')
        .then(response => response.json())
        .then(data => {
            const news = data.find(item => item.id === newsId);
            if (news) {
                document.getElementById('news-article').innerHTML = `
                    <h1>${news.title}</h1>
                    <p>${news.date}</p>
                    <p>${news.content}</p>
                `;
            } else {
                document.getElementById('news-article').innerHTML = '<p>News not found</p>';
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function loadTeam() {
    fetch('data/team.json')
        .then(response => response.json())
        .then(data => {
            const teamContainer = document.getElementById('team-container');
            data.forEach(member => {
                const memberItem = document.createElement('div');
                memberItem.classList.add('team-member');
                memberItem.innerHTML = `
                    <img src="${member.photo}" alt="${member.name}">
                    <h3>${member.name}</h3>
                    <p>${member.role}</p>
                    <div class="summary">${member.summary}</div>
                    <div class="details">${member.details}</div>
                `;
                teamContainer.appendChild(memberItem);
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function loadPublications() {
    fetch('data/publications.json')
        .then(response => response.json())
        .then(data => {
            const publicationsContainer = document.getElementById('publications-container');

            // Ordenar publicações pelo ano, mais recentes primeiro
            data.sort((a, b) => b.year - a.year);

            data.forEach(pub => {
                const pubItem = document.createElement('div');
                pubItem.classList.add('publication-item');
                pubItem.innerHTML = `
                    <div class="publication-details">
                        <div class="publication-title">${pub.title}</div>
                        <div class="publication-authors">${pub.authors}</div>
                        <div class="publication-journal">${pub.journal} (${pub.year})</div>
                        <a href="${pub.doi}" target="_blank">Read more</a>
                    </div>
                `;
                publicationsContainer.appendChild(pubItem);
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function loadCode() {
    fetch('data/code.json')
        .then(response => response.json())
        .then(data => {
            const codeContainer = document.getElementById('code-container');
            data.forEach(code => {
                const codeItem = document.createElement('div');
                codeItem.classList.add('code-item');
                codeItem.innerHTML = `
                    <h3>${code.title}</h3>
                    <p>${code.description}</p>
                    <a href="${code.link}" target="_blank">View Code</a>
                `;
                codeContainer.appendChild(codeItem);
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function loadSponsors() {
    fetch('data/sponsors.json')
        .then(response => response.json())
        .then(data => {
            const sponsorsContainer = document.getElementById('sponsors-container');
            data.forEach(sponsor => {
                const sponsorItem = document.createElement('div');
                sponsorItem.classList.add('sponsor-item');
                sponsorItem.innerHTML = `
                    <img src="${sponsor.logo}" alt="${sponsor.name}">
                    <h3>${sponsor.name}</h3>
                    <p>${sponsor.description}</p>
                `;
                sponsorsContainer.appendChild(sponsorItem);
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function loadProject() {
    fetch('data/project.json')
        .then(response => response.json())
        .then(data => {
            const projectContainer = document.getElementById('project-container');
            projectContainer.innerHTML = `
                <h2>CORA Project Introduction</h2>
                <div class="img-text">
                    <img src="assets/images/intro.png" alt="CORA Project Introduction">
                    <p>${data.summary}</p>
                </div>
                <h2>CORA Methodology</h2>
                <div class="img-text">
                    <img src="assets/images/methodology.png" alt="CORA Methodology">
                    <p>${data.objectives.join(' ')}</p>
                </div>
                <h2>Applications</h2>
                <div class="img-text">
                    <img src="assets/images/applications.png" alt="CORA Applications">
                    <p>${data.methodology.join(' ')}</p>
                </div>
                <h2>Alignment with EBIA</h2>
                <div class="img-text">
                    <img src="assets/images/ebia.png" alt="CORA Alignment with EBIA">
                    <p>${data.alignment}</p>
                </div>
            `;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function loadSlideshow() {
    fetch('data/project.json')
        .then(response => response.json())
        .then(data => {
            const slideshowContainer = document.getElementById('slideshow-container');
            let slidesHTML = '';

            slidesHTML += `
               
                <div class="mySlides fade">
                    <h2 class="slide-title">What We Do</h2>
                    <div class="text">
                        <p>${data.summary}</p>
                    </div>
                </div>
                <div class="mySlides fade">
                    <h2 class="slide-title">Our Mission</h2>
                    <div class="text">
                        <p>${data.objectives.join(' ')}</p>
                    </div>
                </div>
                <div class="mySlides fade">
                    <h2 class="slide-title">Applications</h2>
                    <div class="text">
                        <p>${data.applications.join(' ')}</p>
                    </div>
                </div>
                <div class="mySlides fade">
                    <h2 class="slide-title">Alignment</h2>
                    <div class="text">
                        <p>${data.alignment}</p>
                    </div>
                </div>
             
            `;

            slideshowContainer.innerHTML = slidesHTML;

            showSlides(slideIndex); // Start the slideshow
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

let slideIndex = 1;

function showSlides(n) {
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");

    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}
