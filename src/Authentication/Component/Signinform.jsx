import { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";

export default function Signinform() {
  const [signinData, setSigninData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { setUser } = useContext(AppContext);

  const handleSubmit = async (e) => {
    // if called from a form submit, prevent default
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    try {
      // validate all fields (trim to avoid only-space input)
      if (
        signinData.username.trim() === "" ||
        signinData.email.trim() === "" ||
        signinData.password.trim() === ""
      ) {
        alert("Please fill out all fields");
        return;
      }

      const res = await fetch("http://localhost:5000/shoplite/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signinData),
      });

      // log status and attempt to parse JSON body only when present
      console.log("signin response status:", res.status);
      let data = null;
      try {
        const contentType = res.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          data = await res.json();
          console.log("signin response json:", data);
        } else {
          console.log("signin response has no json body");
        }
      } catch (jsonErr) {
        console.log("failed to parse json response:", jsonErr);
      }

      if (!res.ok) {
        const msg = data?.message || `Sign-in failed (status ${res.status})`;
        alert(msg);
        return; // don't clear inputs on failure
      }

      // success — clear inputs and proceed (e.g. redirect or set auth)
      alert(data?.message || "Signed in successfully");

      // store token if provided and update context
      if (data?.token) {
        localStorage.setItem("token", data.token);
        setUser({ token: data.token });
      }

      setSigninData({ username: "", email: "", password: "" });
    } catch (error) {
      console.error("Network or unexpected error:", error);
      alert("Network error — please try again");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Welcome Back 👋
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-slate-300">Username</label>
            <input
              value={signinData.username}
              onChange={(e) =>
                setSigninData({ ...signinData, username: e.target.value })
              }
              className="bg-slate-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              type="text"
              placeholder="your username"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-slate-300">Email</label>
            <input
              value={signinData.email}
              onChange={(e) =>
                setSigninData({ ...signinData, email: e.target.value })
              }
              className="bg-slate-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              type="email"
              placeholder="you@example.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-slate-300">Password</label>
            <input
              value={signinData.password}
              onChange={(e) =>
                setSigninData({ ...signinData, password: e.target.value })
              }
              className="bg-slate-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              type="password"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-green-500 hover:bg-green-600 transition-all text-white font-semibold py-3 rounded-lg"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
