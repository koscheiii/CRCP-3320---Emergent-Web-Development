import { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("Welcome to Do Together!");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-100 text-gray-800 text-center p-6">
      <h1 className="text-4xl font-bold mb-4">{message}</h1>
      <p className="text-lg mb-8">
        A place to discover fun ideas for couples, solo self-care, and friends.
      </p>
      <button
        className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-lg transition"
        onClick={() => setMessage("Hello World from Do Together!")}
      >
        Explore Activities
      </button>
    </div>
  );
}

export default App;