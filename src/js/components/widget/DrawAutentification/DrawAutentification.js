export default class DrawAutentification {
  constructor() {
  }

  drawAutentification() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('wrapper-autentification');
    this.wrapper.innerHTML = `    <div class="autentification">
    <div class="autentification-block">
      <div class="autentification-title-block">
        <h2 class="autentification-title">
          Выберите псевдоним
        </h2>
      </div>
      <form class="form-login">
        <div class="block-alias">
          <input type="text" class="input alias-input" name="nickname"><!-- input-error -->
        </div>
        <div class="submit-alias">
          <button class="button button-alias">Продолжить</button>
        </div>
      </form>
    </div>
    <div class="autentification-error disable">
      Этот никнейм уже занят
    </div>
  </div>`;

  document.body.appendChild(this.wrapper);
  this.form = document.querySelector('.form-login');
  this.input = document.querySelector('.alias-input');
  this.blockError = document.querySelector('.autentification-error');
  }

  deleteAutentificationBlock() {
    this.wrapper.parentElement.removeChild(this.wrapper);
    this.form = null;
    this.input = null;
  }

  async sendLogin() {
    const formData = new FormData(this.form);

    const response = await fetch('http://192.168.1.57:7070/', {
      method: 'POST',
      body: formData
    })

    if (response.ok) { 
      let json = await response.json();
      return json;
    } else {
      alert("Ошибка HTTP: " + response.status);
    }
  }

  resetForm() {
    this.form.reset();
  }

  addInputError(textError) {
    this.input.classList.add('input-error');
    this.blockError.textContent = textError;
    this.blockError.classList.remove('disable');
  }
  
  deleteInputError() {
    this.input.classList.remove('input-error');
    this.blockError.textContent = '';
    this.blockError.classList.add('disable');
  }
}