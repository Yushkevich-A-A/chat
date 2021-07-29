export default class Controller {
  constructor(login, chat) {
    this.login = login;
    this.chat = chat;
    this.init();
  }

  init() {
    this.login.drawAutentification();
    this.listeners();
  }

  listeners() {
    document.addEventListener('click', event => {
      event.preventDefault();
      if(event.target.closest('.button-alias')){
        this.checkAndSendLogin();
      }
    })
  }

  async checkAndSendLogin() {
    if (this.login.input.value.trim() === '') {
      this.login.addInputError('Поле ввода не может быть пустым');
      return;
    }
    this.login.deleteInputError();
    const response = await this.login.sendLogin();
    if (!response.status) {
    this.login.addInputError('Этот никнейм занят');
    return;
    } 

    console.log('авторизация прошла успешно');
  }
}