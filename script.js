class Giphy {
  constructor(keyword) {
    this.keyword = keyword;
    this.endpoint = "https://api.giphy.com/v1/gifs";
    this.api_key = "o8ZEiRD0VN5d24cuqr4HyCYVVWwNbMn7";
  }

  getGifUrl(callback) {
    let xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      this.endpoint +
        "/translate?api_key=" +
        this.api_key +
        "&s=" +
        this.keyword
    );

    xhr.responseType = "json";
    xhr.onload = function () {
      callback(this.response.data.images.original.mp4);
    };

    xhr.send();
  }

  static getUrlAsync(keyword, callback) {
    return new Giphy(keyword).getGifUrl(callback);
  }
}

const toggleButton = document.getElementsByClassName("nav-toggle")[0];
const navLinks = document.getElementsByClassName("nav-container_left")[0];

toggleButton.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

let search = document.getElementById("search");
let keyword = document.getElementById("txt-search");

keyword.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sendGif();
    keyword.value = "";
  }
});

search.addEventListener("click", sendGif);

function sendGif() {
  let keywordW = keyword.value;
  console.log(keywordW);
  let gifDiv = document.getElementById("video");
  let section = document.getElementById("main_section");
  section.style.gap = "1em";
  section.style.margin = "3% auto";
  gifDiv.style.display = "flex";
  Giphy.getUrlAsync(keywordW, (videoURL) => {
    document.getElementById("gif").src = videoURL;
  });
}


let shareButton = document.getElementById("share-btn");

shareButton.addEventListener("click", () => { 
  if (navigator.share) {
    navigator.share({
      title: "Gif",
      text: "Check out this gif",
      url: document.getElementById("gif").src,
    })
      .then(() => console.log("Successful share"))
      .catch((error) => console.log("Error sharing", error));
  } else {
    console.log("Web Share API not supported");
  }
});