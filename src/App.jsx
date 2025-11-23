import React, { useRef } from "react";
import Sidebar from "./components/Sidebar";
import ConeGraphic from "./components/ConeGraphic";

const App = () => {
  const graphicRef = useRef(null);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-[260px_1fr] gap-6">
        <aside className="bg-gray-800 rounded-xl p-5 shadow-xl h-fit">
          <Sidebar />
        </aside>

        <main className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-xl shadow-xl p-6 flex items-center justify-center">
          <div
            ref={graphicRef}
            className="flex justify-center items-center w-full"
          >
            <ConeGraphic />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
