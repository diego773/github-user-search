let searchButton = document.querySelector(".search-button");
let form = document.getElementById("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let searchInput = document.getElementById("search-input").value;
  // let user = searchInput.split(" ").join("");
  // alert(user);

  fetch("https://api.github.com/users/" + searchInput)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // document.getElementById(
      //   "user-avatar-container"
      // ).innerHTML = `<img src="${data.avatar_url}"/>`;
      const userAvatarImage = document.getElementById("user-card-img");
      userAvatarImage.src = data.avatar_url;

      const userName = document.getElementById("user-name");
      userName.textContent = data.name;

      const userEmail = document.getElementById("user-email");
      userEmail.textContent = data.email;

      const dateJoined = document.getElementById("user-date");
      dateJoined.textContent = data.created_at;

      const userBio = document.getElementById("user-notes");
      userBio.textContent = data.bio;

      const repos = document.getElementById("repos");
      repos.textContent = data.public_repos;

      const followers = document.getElementById("followers");
      followers.textContent = data.followers;

      const following = document.getElementById("following");
      following.textContent = data.following;

      const location = document.getElementById("location");
      location.textContent = data.location;

      const twitter = document.getElementById("twitter");
      twitter.textContent = data.twitter_username;

      const blog = document.getElementById("blog");
      blog.textContent = data.blog;

      const company = document.getElementById("company");
      company.textContent = data.company;
    });
});
