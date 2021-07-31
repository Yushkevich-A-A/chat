import moment from 'moment';
import 'moment/locale/ru';

moment().local('ru');

export default class DrawChat {
    drawChat() {
        this.widget = document.createElement('div');
        this.widget.classList.add('wrapper-widget');
        this.widget.innerHTML = `<div class="widget">
            <div class="participants-block">
                <ul class="participants-list">
                </ul>
            </div>
            <div class="chat-block">
                <div class="chat-messages-block">
                </div>
                <div class="chat-input-block">
                    <textarea class="textarea-message" name="message" placeholder="Type your message here"></textarea>
                </div>
            </div>
        </div>`;
        document.body.appendChild(this.widget);
        this.participantsList = document.querySelector('.participants-list');
        this.chatMessagesBlock = document.querySelector('.chat-messages-block');
    }

    drawParticipantList(data, currentNickName) {
        this.participantsList.innerHTML = '';

        for (let i of data) {
           const li = document.createElement('li');
           li.classList.add('participants-item');
           li.innerHTML = `<div class="participants-image">
           </div>
           <div class="participants-name">
             <p class="nickname"></p>
           </div>`
           this.participantsList.appendChild(li);
           const nickName = li.querySelector('.nickname');
           if (i === currentNickName) {
            nickName.textContent = 'You';
            nickName.classList.add('you-nickname');
           } else {
            nickName.textContent = i;
           }
        }
    }

    drawChatList(data, currentNickName) {
        this.chatMessagesBlock.innerHTML = '';
        if (data.length === 0) {
            return;
        }
        console.log(data);
        for (let i of data) {
            this.addNewMessage(i, currentNickName);
        }
    }

    addNewMessage(data, currentNickName) {
        const message = document.createElement('div');
        message.classList.add('chat-message-block');
        message.innerHTML = `<div class="participant-information">
             <div class="participant-nickname"></div>
             <div class="date-message"></div>
         </div>
         <div class="message-block">
             <p class="message"></p>
         </div>`
         this.chatMessagesBlock.appendChild(message);
         if (currentNickName === data.user) {
            message.classList.add('you-message');
            message.querySelector('.participant-nickname').textContent = 'You';
        } else {
            message.querySelector('.participant-nickname').textContent = data.user;
        }
         message.querySelector('.date-message').textContent = moment(data.date).format('HH:mm DD.MM.YYYY');
         message.querySelector('.message').textContent = data.text;

         this.chatMessagesBlock.scrollTop = this.chatMessagesBlock.scrollHeight;
    }
}