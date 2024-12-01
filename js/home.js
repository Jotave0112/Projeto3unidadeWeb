document.addEventListener('DOMContentLoaded', async function () {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const token = localStorage.getItem('accessToken');

    if (!currentUser || !token) {
        alert('Você precisa estar logado para acessar esta página.');
        window.location.href = 'login.html';
        return;
    }

    document.getElementById('user-name').textContent = currentUser.name;
    document.getElementById('user-email').textContent = currentUser.email;

    const animeContainer = document.getElementById('anime-images');

    if (currentUser.animes && currentUser.animes.length > 0) {
        currentUser.animes.forEach(anime => {
            const animeDiv = document.createElement('div');
            animeDiv.className = 'anime-item';

            const animeImg = document.createElement('img');
            animeImg.src = anime.cover || '../imagens/default.jpg';
            animeImg.className = 'anime-image';

            const animeTitleElement = document.createElement('p');
            animeTitleElement.textContent = anime.title;

            animeDiv.appendChild(animeImg);
            animeDiv.appendChild(animeTitleElement);
            animeContainer.appendChild(animeDiv);
        });
    } else {
        animeContainer.innerHTML = '<p>Você ainda não selecionou animes favoritos.</p>';
    }
});

function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('accessToken');
    alert('Você saiu com sucesso!');
    window.location.href = 'login.html';
}

