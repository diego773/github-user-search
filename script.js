const searchButton = document.getElementById("search-button");
const form = document.getElementById("form");
const searchInput = document.getElementById("search-input");

const formSubmitHandler = (e) => {
  e.preventDefault();

  const username = searchInput.value.trim();

  if (!username) {
    alert("Please enter a GitHub username");
  } else {
    getUserApi(username);
    searchInput.value = "";
  }
};

const getUserApi = async (username) => {
  const apiUrl = "https://api.github.com/users/" + username;
  try {
    const response = await fetch(apiUrl);
    if (response.status !== 200) {
      console.log("Server error", response);
    }
    const data = await response.json();
    console.log(data);
    displayUserInfo(data);
  } catch (error) {
    console.log("Error", error);
  }
};

const displayUserInfo = (user) => {
  if (!user) {
    alert("No Data");
  }
  userContainerInfo(user);
};

const userContainerInfo = (user) => {
  if (!user) {
    alert("Not available");
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

  const userDate = new Date(user.created_at);

  const dateCreatedAt = userDate.toLocaleDateString("en-gb", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  if (!user.name) {
    userName.textContent = user.login;
  }
  userAvatarImage.src = user.avatar_url;
  userName.textContent = user.name;
  userEmail.textContent = `@${user.login}`;
  dateJoined.textContent = `Joined ${dateCreatedAt}`;
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

  if (!user.public_repos || !user.followers || !user.following) {
    repos.textContent = "No repos";
    followers.textContent = "No followers";
    following.textContent = "No Following";
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
  const userWebsite = document.querySelector(".user-website-url");

  if (!user.location) {
    location.textContent = "";
  } else {
    location.textContent = user.location;
  }

  if (!user.company) {
    company.textContent = "";
  } else {
    company.textContent = user.company;
  }

  if (!user.twitter_username) {
    twitter.textContent = "";
  } else {
    twitter.textContent = user.twitter_username;
  }

  if (!user.blog) {
    blog.textContent = "";
  } else {
    userWebsite.textContent = user.blog;
    userWebsite.href = user.blog;
  }
};

getUserApi("diego773");
searchButton.addEventListener("click", formSubmitHandler);
