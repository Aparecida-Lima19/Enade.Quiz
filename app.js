const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

// elementos esqueci senha
const forgotPasswordLink = document.querySelector('.forgot-password-link');
const forgotPasswordContainer = document.getElementById('forgot-password-container');
const backToLoginBtn = document.getElementById('back-to-login-btn');

// Mostrar a tela de "Esqueci a Senha"
forgotPasswordLink.addEventListener('click', () => {
    forgotPasswordContainer.style.display = 'flex';
});

// Voltar para a tela de login
backToLoginBtn.addEventListener('click', () => {
    forgotPasswordContainer.style.display = 'none';
});


sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
})


// Adicionando a funcionalidade de "Esqueci a Senha"
document.addEventListener('DOMContentLoaded', () => {
  const forgotPasswordForm = document.querySelector('.forgot-password-form');

  forgotPasswordForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const emailInput = forgotPasswordForm.querySelector('input[type="email"]');
    
    if (!emailInput.value) {
      alert('Por favor, insira seu email.');
      return;
    }

    //requisição para esqueci senha
      try {
      const response = await fetch('http://localhost:8080/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: emailInput.value
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao solicitar a recuperação de senha.');
      }

      const data = await response.json();
      console.log('Forgot Password Response:', data);
      alert('Se o email estiver registrado, você receberá instruções para redefinir sua senha.');

      // Redirecionar para a página de login após o envio do email
      forgotPasswordContainer.style.display = 'none';
    } catch (error) {
      console.error('Erro ao solicitar recuperação de senha:', error);
      alert('Falha ao solicitar recuperação de senha. Tente novamente.');
    }
  });
});



document.addEventListener('DOMContentLoaded', () => {
  const signInForm = document.querySelector('.sign-in-form');
  const signUpForm = document.querySelector('.sign-up-form');

  // Validação para o formulário de login
  signInForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = signInForm.querySelector('input[type="text"]');
    const password = signInForm.querySelector('input[type="password"]');
    
    if (!username.value || !password.value) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Requisição para login
    try {
      const loginResponse = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username.value,
          password: password.value
        })
      });

      if (!loginResponse.ok) {
        throw new Error('Erro no login');
      }

      const loginData = await loginResponse.json();
      console.log('Login Response:', loginData);
      alert('Login bem-sucedido!');

      // Redirecionar ou realizar outras ações após o login bem-sucedido
    } catch (error) {
      console.error('Erro no login:', error);
      alert('Falha no login. Verifique suas credenciais.');
    }
  });

  // Validação para o formulário de cadastro
  signUpForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = signUpForm.querySelector('input[type="text"]');
    const email = signUpForm.querySelector('input[type="email"]');
    const password = signUpForm.querySelector('input[type="password"]');
    const course = signUpForm.querySelector('select[name="course"]');

    console.log("Selected Course ID:", course.value);

    let isValid = true;

    // Verificação de preenchimento
    if (!username.value || !email.value || !password.value || !course.value) {
      isValid = false;
      alert('Por favor, preencha todos os campos obrigatórios.');
    }

    // Verificação de limite de caracteres
    if (username.value.length > 20) {
      isValid = false;
      alert('O nome de usuário deve ter no máximo 20 caracteres.');
    }

    if (email.value.length > 50) {
      isValid = false;
      alert('O e-mail deve ter no máximo 50 caracteres.');
    }

    if (password.value.length > 120) {
      isValid = false;
      alert('A senha deve ter no máximo 120 caracteres.');
    }

    if (!isValid) {
      return;
    }

    // Requisição para cadastro
    try {
      const registerResponse = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username.value,
          email: email.value,
          password: password.value,
          role:["user"],
          course: course.value
        })
      });

      if (!registerResponse.ok) {
        throw new Error('Erro no cadastro');
      }

      const registerData = await registerResponse.json();
      console.log('Register Response:', registerData);
      alert('Cadastro bem-sucedido!');

      // Opcionalmente, você pode automaticamente logar o usuário após o cadastro
      // ou redirecioná-lo para a página de login.
    } catch (error) {
      console.error('Erro no cadastro:', error);
      alert('Falha no cadastro. Verifique os dados e tente novamente.');
    }
  });
});
