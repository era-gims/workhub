const SUPABASE_URL = "https://pnfyyjufupcpphzfxgim.supabase.co";

const SUPABASE_KEY = "sb_publishable_dfSstSml6StUx2BuFG0XBA_NnxKrQ_P";

const { createClient } = supabase;

const supabaseClient = createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);


let authMode = "signup";


/* =========================
   MOBILE MENU
========================= */

function toggleMenu() {

  const menu = document.getElementById("navMenu");

  if (menu) {
    menu.classList.toggle("active");
  }

}


/* =========================
   OPEN LOGIN / SIGNUP
========================= */

function showAuth(mode) {

  authMode = mode;

  const authSection =
    document.getElementById("authSection");

  if (authSection) {

    authSection.scrollIntoView({
      behavior: "smooth"
    });

  }

  updateAuthForm();

}


/* =========================
   SWITCH LOGIN / SIGNUP
========================= */

function switchAuthMode() {

  authMode =
    authMode === "signup"
      ? "login"
      : "signup";

  updateAuthForm();

}


/* =========================
   UPDATE AUTH FORM
========================= */

function updateAuthForm() {

  const signup =
    authMode === "signup";


  const authTitle =
    document.getElementById("authTitle");

  const authMessage =
    document.getElementById("authMessage");

  const nameField =
    document.getElementById("nameField");

  const roleField =
    document.getElementById("roleField");

  const authButton =
    document.getElementById("authButton");

  const switchButton =
    document.getElementById("switchButton");

  const authResult =
    document.getElementById("authResult");


  if (authTitle) {

    authTitle.textContent =
      signup
        ? "Create your WorkHub account"
        : "Login to WorkHub";

  }


  if (authMessage) {

    authMessage.textContent =
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


  if (authButton) {

    authButton.textContent =
      signup
        ? "Create Account"
        : "Login";

  }


  if (switchButton) {

    switchButton.textContent =
      signup
        ? "Already have an account? Login"
        : "Don't have an account? Sign up";

  }


  if (authResult) {

    authResult.textContent = "";

  }

}


/* =========================
   AUTHENTICATION FORM
========================= */

const authForm =
  document.getElementById("authForm");


if (authForm) {

  authForm.addEventListener(
    "submit",
    async function(event) {

      event.preventDefault();


      const email =
        document.getElementById("email")
          .value
          .trim();


      const password =
        document.getElementById("password")
          .value;


      const result =
        document.getElementById("authResult");


      result.textContent =
        "Please wait...";


      /* =====================
         SIGN UP
      ===================== */

      if (authMode === "signup") {


        const fullName =
          document
            .getElementById("fullName")
            .value
            .trim();


        const role =
          document
            .getElementById("role")
            .value;


        if (!fullName) {

          result.textContent =
            "Please enter your full name.";

          return;

        }


        const {
          data,
          error
        } =
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


        if (error) {

          result.textContent =
            "Error: " +
            error.message;

          return;

        }


        if (data.user) {


          /*
             Create the user's profile.
          */

          const {
            error: profileError
          } =
            await supabaseClient
              .from("profiles")
              .insert({

                id: data.user.id,

                full_name: fullName,

                role: role

              });


          if (profileError) {

            /*
              The account was created even if
              the profile insert failed.
            */

            result.textContent =
              "Account created, but profile setup failed: " +
              profileError.message;

            return;

          }


          result.textContent =
            "Account created successfully!";


          /*
             Since email confirmation is disabled,
             take the user directly to dashboard.
          */

          setTimeout(function() {

            window.location.href =
              "dashboard.html";

          }, 1000);

        }

      }


      /* =====================
         LOGIN
      ===================== */

      else {


        const {
          data,
          error
        } =
          await supabaseClient.auth
            .signInWithPassword({

              email: email,

              password: password

            });


        if (error) {

          result.textContent =
            "Login failed: " +
            error.message;

          return;

        }


        if (data.user) {

          result.textContent =
            "Login successful! Opening your dashboard...";


          setTimeout(function() {

            window.location.href =
              "dashboard.html";

          }, 800);

        }

      }

    }
  );

}


/* =========================
   SEARCH JOBS
========================= */

async function searchPlatform() {


  const searchInput =
    document.getElementById("searchInput");


  const locationInput =
    document.getElementById("location");


  const search =
    searchInput
      ? searchInput.value.trim()
      : "";


  const location =
    locationInput
      ? locationInput.value
      : "";


  let query =
    supabaseClient
      .from("jobs")
      .select("*")
      .eq("status", "open");


  if (search) {

    query =
      query.ilike(
        "title",
        "%" + search + "%"
      );

  }


  if (location) {

    query =
      query.ilike(
        "location",
        "%" + location + "%"
      );

  }


  const {
    data,
    error
  } =
    await query;


  if (error) {

    alert(
      "Search error: " +
      error.message
    );

    return;

  }


  if (!data || data.length === 0) {

    alert(
      "No matching jobs found yet."
    );

    return;

  }


  alert(
    data.length +
    " job(s) found."
  );

}


/* =========================
   INITIAL FORM STATE
========================= */

updateAuthForm();
