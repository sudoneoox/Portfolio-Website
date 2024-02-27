import React from "react";
// import { TextGenerator, Icon, TextWrapper } from "./components/ui/TextGenerator.tsx";
// import { DotBackgroundDemo } from './components/ui/grid-background.tsx';
import { ParentComponent} from "./components/ParentComponent.tsx";
import './output.css'

export function App() {
  return (
    // <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-screen w-full">
    <>
    {/* <TextGenerator/> */}
    {/* <TextWrapper/> */}
    {/* <DotBackgroundDemo/> */}
    <ParentComponent/>
    </>
    // </div>
   
   
    
    
  );
}

export default App;