export default class Controller {
  constructor(login, chat) {
    this.login = login;
    this.chat = chat;
    this.ws = null;
    this.nickname = null;
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

    document.addEventListener('keydown', event => {
      if (event.target.closest('.textarea-message') && event.code === 'Enter'){
        event.preventDefault();
        const textBlock = event.target.closest('.textarea-message');
          if (textBlock.value.trim() !== '') {
            const obj = {
              user: this.nickname,
              date: +new Date(),
              text: textBlock.value.trim(),
            }
            this.ws.send(JSON.stringify({
              status: 'message',
              message: obj,
            }));
          }
        textBlock.value = '';
      }
    });
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
    this.nickname = this.login.input.value;
    this.login.deleteAutentificationBlock();
    this.drawChat();
  }

  drawChat() {
    this.chat.drawChat();

    this.ws = new WebSocket('ws://192.168.1.57:7070/');

    this.ws.addEventListener('open', () => {
      this.ws.send(JSON.stringify({
        status: 'init',
        nickname: this.nickname,
      }));
    });

    this.ws.addEventListener('message', event => {
      const data = JSON.parse(event.data);
      if (data.status === 'init') {
        this.chat.drawChatList(data.chat, this.nickname);
      }

      if (data.status === 'message') {
        this.chat.addNewMessage(data.data, this.nickname);
      }

      if (data.status === 'uploadParticipant') {
        this.chat.drawParticipantList(data.users, this.nickname);
      }
    });
    this.ws.addEventListener('close', event => {
      event.preventDefault();
      this.ws.send('exfcnybr elfkty');
      this.ws.close(1001, this.nickname);
    })
  }
}