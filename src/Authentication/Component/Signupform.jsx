import { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";

export default function SignupForm() {
  const { setUser } = useContext(AppContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [show, setShow] = useState(false);

  const handleSubmit = async (e) => {
    // if called from a form submit, prevent default
    if (e && typeof e.preventDefault === "function") e.preventDefault();

    try {
      // validate all fields (trim to avoid only-space input)
      if (
        formData.username.trim() === "" ||
        formData.email.trim() === "" ||
        formData.password.trim() === ""
      ) {
        alert("Please fill out all fields");
        return;
      }

      const res = await fetch("http://localhost:5000/shoplite/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      //taking jwt from backend and stored in local storage
      // const tokenData = await res.json();

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Signup failed");
        return;
      }

      if (data?.token) {
        localStorage.setItem("token", data.token);
        console.log("JWT:", data.token);
        // update app context so UI responds immediately
        setUser({ token: data.token });
      }

      // log status and body (if any)
      console.log("signup response status:", res.status);
      try {
        // const data = await res.json();
        console.log("signup response json:", data);
      } catch (jsonErr) {
        console.log("no json response or failed to parse json", jsonErr);
      }
    } catch (error) {
      console.log("tere se galti huwa he tera galti", error);
    }

    // clearing input

    setFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  const togglePassword = () => {
    setShow(!show);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-slate-800 text-center mb-8">
          Create Account 🚀
        </h1>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-600">
              Username
            </label>
            <input
              className="bg-slate-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-600">Email</label>
            <input
              className="bg-slate-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-600">
              Password
            </label>
            <div className="flex items-center bg-slate-100 rounded-lg px-4">
              <input
                className="flex-1 bg-transparent py-3 focus:outline-none"
                type={show ? "text" : "password"}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                onClick={togglePassword}
                className="text-sm text-green-600 font-medium"
              >
                {show ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="mt-4 bg-green-500 hover:bg-green-600 transition-all text-white font-semibold py-3 rounded-lg"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
