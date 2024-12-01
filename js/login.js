function login(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const mensagem = document.getElementById('msg');

    mensagem.textContent = '';

    async function logar() {
        try {
            const response = await fetch('https://projetoweb-api.vercel.app/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('currentUser', JSON.stringify(data.user));
                localStorage.setItem('accessToken', data.accessToken);
                alert('Login bem-sucedido!');
                window.location.href = 'home.html';
            } else {
                mensagem.textContent = data.message || 'Erro no login. Tente novamente.';
            }
        } catch (error) {
            console.error('Erro na API de login:', error);
            mensagem.textContent = 'Erro inesperado. Tente novamente.';
        }
    }

    logar();
}
