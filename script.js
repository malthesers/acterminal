document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");

  let startup = document.querySelector("#template-startup").cloneNode(true).content;
  document.querySelector("#terminal-messages").appendChild(startup);

  document
    .querySelector("#terminal")
    .lastElementChild.lastElementChild.lastElementChild.addEventListener(
      "keydown",
      commandPrompt
    );
});

let filter = "all";

async function loadJSON() {
  const data = await fetch("actors.json");
  const actors = await data.json();

  showActors(actors);
}

function showActors(actors) {
  console.log("showingActors");
  const container = document.querySelector("#actors-container");
  const template = document.querySelector("#template-actor");

  document.querySelector("#actors-container").innerHTML = " ";

  actors.forEach((actor) => {
    if (filter == "all" || filter == actor.movie) {
      let clone = document
        .querySelector("#template-actor")
        .cloneNode(true).content;

      clone.querySelector(".actor-box").addEventListener("click", openDetails);

      clone.querySelector(".actor-name").textContent = actor.fullname;
      clone.querySelector(".actor-movie").textContent = actor.movie;

      container.appendChild(clone);
    }
  });
}

function openDetails() {
  let details = this.lastElementChild;

  if (details.style.maxHeight == "120px") {
    console.log("openingDetails");

    details.style.maxHeight = "0";
  } else {
    console.log("closingDetails");

    document.querySelectorAll(".actor-bottom").forEach((detailbox) => {
      detailbox.style.maxHeight = "0";
    });

    details.style.maxHeight = "120px";
  }
}

function commandPrompt(event) {
  if (event.keyCode === 13) {
    //Form variables
    let input =
      document.querySelector("#terminal").lastElementChild.lastElementChild
        .lastElementChild.value;
    let messageContainer = document.querySelector("#terminal-messages");
    let promptClone = document
      .querySelector("#terminal")
      .lastElementChild.cloneNode(true);

    //Clone previous prompt
    if (input != "") {
      messageContainer.appendChild(promptClone);
    }

    //Prompt functions
    if (input == "show actors") {
      filter = "all";
      loadJSON();
    } else if (
      input == "show Fight Club" ||
      input == "show Goodfellas" ||
      input == "show Inception" ||
      input == "show Pulp Fiction"
    ) {
      filter = input.replace("show ", "");
      loadJSON();
    } else if (input == "movies") {
      let movies = document
        .querySelector("#template-movies")
        .cloneNode(true).content;
      messageContainer.appendChild(movies);
    } else if (input == "restart") {
      location.reload();
    } else if (input == "help") {
      let help = document
        .querySelector("#template-help")
        .cloneNode(true).content;
      messageContainer.appendChild(help);
    } else if (input == "clear") {
      messageContainer.innerHTML = " ";
    } else if (input != "") {
      let error = document
        .querySelector("#template-error")
        .cloneNode(true).content;
      error.querySelector(".input-color").textContent = input;
      messageContainer.appendChild(error);
    }

    //Clear new input field
    document.querySelector(
      "#terminal"
    ).lastElementChild.lastElementChild.lastElementChild.value = "";
  }
}
