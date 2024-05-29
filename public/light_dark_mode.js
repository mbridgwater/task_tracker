export default class LightDarkMode {
  constructor() {

    const localStorageTheme = localStorage.getItem("theme");
    const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

    let currentThemeSetting = this.calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });
    // let currentThemeSetting = "light";


    const darkLightModeButton = document.querySelector("[data-theme-toggle]");
    const darkLightModeButtonImg = darkLightModeButton.getElementsByTagName("img")[0];
    darkLightModeButton.addEventListener("click", () => {
      const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
      
      // update the button text
      const newSvg = newTheme === "light" ? "icons/dark-mode.svg" : "icons/light-mode.svg";
      darkLightModeButtonImg.src = newSvg;  
      // use an aria-label if you are omitting text on the button and using sun/moon icons, for example
      darkLightModeButtonImg.setAttribute("aria-label", newTheme);
      // update theme attribute on HTML to switch theme in CSS
      document.querySelector("html").setAttribute("data-theme", newTheme);
      // update in local storage
      localStorage.setItem("theme", newTheme);
      // update the currentThemeSetting in memory
      currentThemeSetting = newTheme;
    });
  }

  calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }) {
    if (localStorageTheme !== null) {
      return localStorageTheme;
    }
  
    if (systemSettingDark.matches) {
      return "dark";
    }
  
    return "light";
  }
}