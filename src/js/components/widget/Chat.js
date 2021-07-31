import Controller from './controller/controller';
import DrawAutentification from './DrawAutentification/DrawAutentification';
import DrawChat from './DrawChat/DrawChat';

const autentification = new DrawAutentification();
const chat = new DrawChat();

const controller = new Controller(autentification, chat);
