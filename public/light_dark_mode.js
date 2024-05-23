export default class LightDarkMode {
  constructor() {

    const localStorageTheme = localStorage.getItem("theme");
    const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

    let currentThemeSetting = this.calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });


    const darkLightModeButton = document.querySelector("[data-theme-toggle]");
    console.log("darkLightModeButton")
    console.log(darkLightModeButton);
    const darkLightModeButtonImg = darkLightModeButton.getElementsByTagName("img")[0];
    darkLightModeButton.addEventListener("click", () => {
      const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
      // update the button text
      const newCta = newTheme === "dark" ? "icons/dark-mode.svg" : "icons/light-mode.svg";
      darkLightModeButtonImg.src = newCta;  
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


// /**
// * Utility function to calculate the current theme setting.
// * Look for a local storage value.
// * Fall back to system setting.
// * Fall back to light mode.
// */
// function calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }) {
//     if (localStorageTheme !== null) {
//       return localStorageTheme;
//     }
//     if (systemSettingDark.matches) {
//       return "dark";
//     }
  
//     return "light";
//   }
  
//   /**
//   * Utility function to update the button text and aria-label.
//   */
//   function updateButton({ buttonEl, isDark }) {
//     const newCta = isDark ? "Change to light theme" : "Change to dark theme";
//     // use an aria-label if you are omitting text on the button
//     // and using a sun/moon icon, for example
//     buttonEl.setAttribute("aria-label", newCta);
//     buttonEl.innerText = newCta;
//   }
  
//   /**
//   * Utility function to update the theme setting on the html tag
//   */
//   function updateThemeOnHtmlEl({ theme }) {
//     document.querySelector("html").setAttribute("data-theme", theme);
//   }
  
//   /** On page load: **/
  
//   /**
//   * 1. Grab what we need from the DOM and system settings on page load
//   */
//   const button = document.querySelector("[data-theme-toggle]");
//   const localStorageTheme = localStorage.getItem("theme");
//   const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
  
//   /**
//   * 2. Work out the current site settings
//   */
//   let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });
  
//   /**
//   * 3. Update the theme setting and button text accoridng to current settings
//   */
//   updateButton({ buttonEl: button, isDark: currentThemeSetting === "dark" });
//   updateThemeOnHtmlEl({ theme: currentThemeSetting });
  
//   /**
//   * 4. Add an event listener to toggle the theme
//   */
//   button.addEventListener("click", (event) => {
//     const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
  
//     localStorage.setItem("theme", newTheme);
//     updateButton({ buttonEl: button, isDark: newTheme === "dark" });
//     updateThemeOnHtmlEl({ theme: newTheme });
  
//     currentThemeSetting = newTheme;
//   }); 