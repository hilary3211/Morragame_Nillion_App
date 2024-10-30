import { WelcomeContent } from "./components/WelcomeContent";
import { Login } from "./components/Login";

import { StoreProgram } from "./components/StoreProgram";
import { Compute } from "./components/Compute";
import { ComputeOutput } from "./components/ComputeOutput";
import MorragameInfo from "./components/MorragameInfo"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full flex flex-col items-center font-mono text-sm">
        <WelcomeContent />
        <Login />
        <MorragameInfo/>
        <div className="flex flex-col gap-4 max-w-4xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-0 gap-4 justify-items-center">
          <StoreProgram />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-0 gap-4 justify-items-center">
            <Compute />
            <ComputeOutput />
          </div>
        </div>
      </div>
    </main>
  );
}
