function showIosInstall() {
  let iosPrompt = document.querySelector(".ios-prompt");
  iosPrompt.style.display = "block";
  iosPrompt.addEventListener("click", () => {
    iosPrompt.style.display = "none";
  });
}

const isIos = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  console.log(userAgent);
  return /iphone|ipad|ipod/.test(userAgent);
};
const isInStandaloneMode = () =>
  "standalone" in window.navigator && window.navigator.standalone;
if (isIos() && !isInStandaloneMode()) {
  showIosInstall();
}
