document.addEventListener('DOMContentLoaded', async function () {
    const animeSelect = document.getElementById('anime_preference');

    try {
        const response = await fetch('https://projetoweb-api.vercel.app/anime');
        if (response.ok) {
            const data = await response.json();
            data.animes.forEach((anime) => {
                const option = document.createElement('option');
                option.value = anime.id; 
                option.textContent = anime.title;
                animeSelect.appendChild(option);
            });
        } else {
            console.error('Erro ao carregar animes.');
        }
    } catch (err) {
        console.error('Erro na API de animes:', err);
    }
});

function registro(event) {
    event.preventDefault();

    const usuario = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-senha').value;
    const animeSelect = document.getElementById('anime_preference');

    const selecaoAnimes = Array.from(
        document.getElementById("anime_preference").selectedOptions
    ).map(option => option.value);

    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
        alert('A senha deve ter no mínimo 8 caracteres, incluindo letras e números.');
        return;
    }

    if (selecaoAnimes.length === 0) {
        alert('Selecione pelo menos um anime favorito.');
        return;
    }

    const user = { name: usuario, email, password, anime_preference: selecaoAnimes };
    
    
    async function register() {
        try {
            console.log(user);
            const response = await fetch('https://projetoweb-api.vercel.app/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            if (response.status === 201) {
                alert('Cadastro realizado com sucesso!');
                window.location.href = 'login.html';
            } else {
                const error = await response.json();
                console.error(error.message);
                alert('Erro no cadastro: ' + error.message);
            }
        } catch (err) {
            console.error('Erro na API de registro:', err);
        }
    }

    register();
}
