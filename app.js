const SUPABASE_URL = "https://pnfyyjufupcpphzfxgim.supabase.co";
const SUPABASE_KEY = "sb_publishable_dfSstSml6StUx2BuFG0XBA_NnxKrQ_P";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

let authMode = "signup";


function toggleMenu() {
  const menu = document.getElementById("navMenu");

  if (menu) {
    menu.classList.toggle("active");
  }
}


function showAuth(mode) {

  authMode = mode;

  const section =
    document.getElementById("authSection");

  if (section) {
    section.scrollIntoView({
      behavior: "smooth"
    });
  }

  updateAuthForm();
}


function switchAuthMode() {

  authMode =
    authMode === "signup"
      ? "login"
      : "signup";

  updateAuthForm();
}


function updateAuthForm() {

  const signup = authMode === "signup";

  const title =
    document.getElementById("authTitle");

  const message =
    document.getElementById("authMessage");

  const nameField =
    document.getElementById("nameField");

  const roleField =
    document.getElementById("roleField");

  const button =
    document.getElementById("authButton");

  const switchButton =
    document.getElementById("switchButton");

  if (title) {
    title.textContent =
      signup
        ? "Create your WorkHub account"
        : "Login to WorkHub";
  }

  if (message) {
    message.textContent =
      signup
        ? "Join WorkHub for free."
        : "Welcome back.";
  }

  if (nameField) {
    nameField.style.display =
      signup ? "block" : "none";
  }

  if (roleField) {
    roleField.style.display =
      signup ? "block" : "none";
  }

  if (button) {
    button.textContent =
      signup ? "Create Account" : "Login";
  }

  if (switchButton) {
    switchButton.textContent =
      signup
        ? "Already have an account? Login"
        : "Don't have an account? Sign up";
  }
}


const authForm =
  document.getElementById("authForm");


if (authForm) {

  authForm.addEventListener(
    "submit",
    async function(event) {

      event.preventDefault();

      const result =
        document.getElementById("authResult");

      result.textContent =
        "Please wait...";


      const email =
        document.getElementById("email")
          .value
          .trim();

      const password =
        document.getElementById("password")
          .value;


      /* SIGN UP */

      if (authMode === "signup") {

        const fullName =
          document.getElementById("fullName")
            .value
            .trim();

        const role =
          document.getElementById("role")
            .value;


        const response =
          await supabaseClient.auth.signUp({

            email: email,

            password: password,

            options: {
              data: {
                full_name: fullName,
                role: role
              }
            }

          });


        if (response.error) {

          result.textContent =
            "Signup error: " +
            response.error.message;

          return;
        }


        result.textContent =
          "Account created successfully!";

      }


      /* LOGIN */

      else {

        const response =
          await supabaseClient.auth
            .signInWithPassword({

              email: email,

              password: password

            });


        if (response.error) {

          result.textContent =
            "Login error: " +
            response.error.message;

          return;
        }


        result.textContent =
          "Login successful!";


        setTimeout(function() {

          window.location.href =
            "dashboard.html";

        }, 800);

      }

    }
  );

}


function searchPlatform() {

  alert(
    "Job search is coming next!"
  );

}


updateAuthForm();
