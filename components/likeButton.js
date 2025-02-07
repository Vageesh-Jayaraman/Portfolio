"use client";
import { Provider, ClapButton } from "@lyket/react";

export default function Clap() {
  return (
    <div className="m-10 p-4 absolute top-12 right-12 font-extrabold w-fit" >
      <Provider
        apiKey={process.env.NEXT_PUBLIC_API_KEY}
        theme={{
          colors: {
            primary: "black", 
            background: "black", 
            text: "#000000",
            icon: "white", 
            highlight: "orange"
          },
          fonts: {
            body: "monospace" 
          }
        }}
      >
        <ClapButton 
        id="portfolio-claps" 
        namespace="post" 
        component={ClapButton.templates.Twitter}/>
      </Provider>
    </div>
  );
}



