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

search.addEventListener("click", () => {
  let keyword = document.getElementById("gsearch").value;
  console.log(keyword);
  let gifDiv = document.getElementById("video");
  gifDiv.style.display = "block";
  Giphy.getUrlAsync(keyword, (videoURL) => {
    document.getElementById("gif").src = videoURL;
  });
});
