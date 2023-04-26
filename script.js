const searchButton = document.querySelector(".search-button");
const form = document.getElementById("form");
const searchInput = document.getElementById("search-input");

const formSubmitHandler = (e) => {
  e.preventDefault();

  let username = searchInput.value.trim();

  if (!username) {
    alert("Please enter github username");
  } else {
    fetchUserApi(username);

    searchInput.value = " ";
  }
};

const fetchUserApi = (username) => {
  let apiUrl = "https://api.github.com/users/" + username;

  fetch(apiUrl).then((response) => {
    if (response.ok) {
      response.json().then((data) => {
        console.log(data);
        updateDom(data);
      });
    } else {
      alert("error" + response.statusText);
    }
  });
};

const updateDom = (user) => {
  if (!user) {
    alert("no data");
    return;
  }
  userContainerInfo(user);
};

const userContainerInfo = (user) => {
  if (!userCardHeader) {
    user.textContent = " ";
    return;
  }

  if (!userBioContainer) {
    user.textContent = " ";
    return;
  }

  if (!showReposFollowers) {
    user.textContent = " ";
    return;
  }

  if (!userInfoFooter) {
    user.textContent = " ";
    return;
  }

  userCardHeader(user);
  userBioContainer(user);
  showReposFollowers(user);
  userInfoFooter(user);
};

const userCardHeader = (user) => {
  const userAvatarImage = document.getElementById("user-card-img");
  const userName = document.getElementById("user-name");
  const userEmail = document.getElementById("user-email");
  const dateJoined = document.getElementById("user-date");

  if (!user.name) {
    userName.textContent = user.login;
    return;
  }
  userAvatarImage.src = user.avatar_url;

  userName.textContent = user.name;

  userEmail.textContent = `@${user.login}`;

  dateJoined.textContent = user.created_at;
};

const userBioContainer = (user) => {
  const userBio = document.getElementById("user-notes");

  if (!user.bio) {
    userBio.textContent = "No bio";
    return;
  }

  userBio.textContent = user.bio;
};

const showReposFollowers = (user) => {
  const repos = document.getElementById("repos");
  const followers = document.getElementById("followers");
  const following = document.getElementById("following");

  if (!user) {
    alert("no data");
    return;
  }

  repos.textContent = user.public_repos;

  followers.textContent = user.followers;

  following.textContent = user.following;
};

const userInfoFooter = (user) => {
  const location = document.getElementById("location");
  const twitter = document.getElementById("twitter");
  const blog = document.getElementById("blog");
  const company = document.getElementById("company");

  !user.company
    ? (company.textContent = "Not Available")
    : (company.textContent = user.company);

  !user.location
    ? (location.textContent = "Not Available")
    : (location.textContent = user.location);

  !user.twitter_username
    ? (twitter.textContent = "Not Available")
    : (twitter.textContent = user.twitter_username);

  !user.blog
    ? (blog.textContent = "Not Available")
    : (blog.textContent = user.blog);
};

fetchUserApi("diego773");
form.addEventListener("submit", formSubmitHandler);
