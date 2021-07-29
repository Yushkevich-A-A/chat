import Controller from "./controller/controller";
import DrawAutentification from "./DrawAutentification/DrawAutentification";

const autentification = new DrawAutentification();


const controller = new Controller(autentification);