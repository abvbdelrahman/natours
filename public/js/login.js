/*eslint-disable*/
const hideAlert = () =>{
  const el = document.querySelector('.alert');
  if(el){
      el.parentElement.removeChild(el);
  }
};
const showAlert = (type, msg) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert,5000);
};

const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');



const login = async (email, password) => {
  //دي بتخلي الداتا اللي تكتبها في الحقول تروح ل endpoint اللي في الurl
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email,
        password
      }
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Log In Successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1000);
    }
  } catch (e) {
    showAlert('error', e.response.data.message);
  }
};

if (document.querySelector('.form--login')) {
  document.querySelector('.form--login').addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const passsword = document.getElementById('password').value;
    login(email, passsword);
  });
}

const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/logout'
    });
    if (res.data.status === 'success') {
      location.reload(true);
    }
  } catch (e) {
    showAlert('error', 'error logging out! try again');
  }
};
if (document.querySelector('.nav__el--logout')) {
  document.querySelector('.nav__el--logout').addEventListener('click', logout);
};

if (loginForm)
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

if (logOutBtn) logOutBtn.addEventListener('click', logout);

const signUpForm = document.querySelector('.form--signup');

const signUp = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm
      }
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Sign Up Successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1000);
    }
  } catch (e) {
    showAlert('error', e.response.data.message);
  }
};

if (document.querySelector('.form--signup')) {
  document.querySelector('.form--signup').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    signUp(name, email, password, confirmPassword);
  });
}
//