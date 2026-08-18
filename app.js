const SUPABASE_URL = "https://pnfyyjufupcpphzfxgim.supabase.co";

const SUPABASE_KEY = "sb_publishable_dfSstSml6StUx2BuFG0XBA_NnxKrQ_P";

const { createClient } = supabase;

const supabaseClient = createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);


let authMode = "signup";


function toggleMenu() {
  const menu = document.getElementById("navMenu");
  menu.classList.toggle("active");
}


function showAuth(mode) {

  authMode = mode;

  document.getElementById("authSection").scrollIntoView({
    behavior: "smooth"
  });

  updateAuthForm();
}


function switchAuthMode() {

  authMode = authMode === "signup"
    ? "login"
    : "signup";

  updateAuthForm();
}


function updateAuthForm() {

  const signup = authMode === "signup";

  document.getElementById("authTitle").textContent =
    signup
      ? "Create your WorkHub account"
      : "Login to WorkHub";

  document.getElementById("authMessage").textContent =
    signup
      ? "Join WorkHub for free."
      : "Welcome back.";

  document.getElementById("nameField").style.display =
    signup ? "block" : "none";

  document.getElementById("roleField").style.display =
    signup ? "block" : "none";

  document.getElementById("authButton").textContent =
    signup ? "Create Account" : "Login";

  document.getElementById("switchButton").textContent =
    signup
      ? "Already have an account? Login"
      : "Don't have an account? Sign up";

  document.getElementById("authResult").textContent = "";
}


document.getElementById("authForm").addEventListener(
  "submit",
  async function(event) {

    event.preventDefault();

    const email =
      document.getElementById("email").value.trim();

    const password =
      document.getElementById("password").value;

    const result =
      document.getElementById("authResult");

    result.textContent = "Please wait...";


    if (authMode === "signup") {

      const fullName =
        document.getElementById("fullName").value.trim();

      const role =
        document.getElementById("role").value;


      const { data, error } =
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
          "Error: " + error.message;

        return;
      }


      if (data.user) {

        const { error: profileError } =
          await supabaseClient
            .from("profiles")
            .insert({

              id: data.user.id,

              full_name: fullName,

              role: role

            });


        if (profileError) {

          result.textContent =
            "Account created, but profile setup failed: "
            + profileError.message;

          return;
        }

        result.textContent =
          "Account created successfully! Check your email if confirmation is required.";

      }

    } else {

      const { data, error } =
        await supabaseClient.auth.signInWithPassword({

          email: email,

          password: password

        });


      if (error) {

        result.textContent =
          "Login failed: " + error.message;

        return;
      }


      result.textContent =
        "Login successful! Welcome to WorkHub.";

    }

  }
);


async function searchPlatform() {

  const search =
    document.getElementById("searchInput").value;

  const location =
    document.getElementById("location").value;


  let query =
    supabaseClient
      .from("jobs")
      .select("*")
      .eq("status", "open");


  if (search) {

    query = query.ilike(
      "title",
      "%" + search + "%"
    );

  }


  if (location) {

    query = query.ilike(
      "location",
      "%" + location + "%"
    );

  }


  const { data, error } =
    await query;


  if (error) {

    alert(
      "Search error: " + error.message
    );

    return;
  }


  if (!data.length) {

    alert("No matching jobs found yet.");

    return;
  }


  alert(
    data.length +
    " job(s) found."
  );

}
