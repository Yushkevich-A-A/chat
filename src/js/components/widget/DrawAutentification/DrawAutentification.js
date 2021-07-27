export default class DrawAutentification {
  constructor() {
    this.drawAutentification();

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
          <input type="text" class="input alias-input" name="nickname" required><!-- input-error -->
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
  }

  deleteAutentificationBlock() {
    this.wrapper.parentElement.removeChild(this.wrapper)
  }

  sendAuth(value) {
    const formData = new FormData(value);
    const method = 'setNickName';
    formData.append('method', method)
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:7070');

    xhr.addEventListener('load', event => {
      if(xhr.response.status >= 200 || xhr.response.status <= 300){
        console.log('Привет Мир!!!');
      }
    })



    xhr.send();
  }
}