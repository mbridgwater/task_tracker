import App from "./app.js";

const main = () => {
  let app = new App();

  
  app.addCard("doing", "Write Card class", "lightblue");
  app.addCard("done", "Write App class", "khaki");
  app.addCard("todo", "Write Card class", "lightblue");
  app.addCard("doing", "Write App class", "khaki");
  let card = app.addCard("todo", "Test everything!", "pink");
  card.setDescription("Hopefully we've been testing throughout the process...");
  let card2 = app.addCard("done", "WE ARE TESTING IT ALL!", "lightgreen");
  card2.setDescription("Hopefully we've been testing throughout the process frfr");
};
main();
