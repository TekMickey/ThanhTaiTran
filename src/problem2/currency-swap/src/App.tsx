import React from "react";
import SwapForm from "./components/SwapForm";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Currency Swap</h1>
        </header>
        <SwapForm />
      </div>
    </div>
  );
}

export default App;
