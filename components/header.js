"use client";
import { Provider, ClapButton } from "@lyket/react";

export default function Header() {
  return (
    <div className="relative mx-4 mt-6 mb-0 md:mx-20 md:mt-20 h-40 md:h-64 bg-gradient-to-r from-[#ffa71f] to-[#ffed51] flex justify-center items-center shadow-lg">
      <div className="absolute top-2 right-2 md:top-4 md:right-4 z-10 font-bold">
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
            component={ClapButton.templates.Twitter}
          />
        </Provider>
      </div>

      <p className="text-center font-mono text-3xl md:text-7xl text-white">
        Vageesh Jayaraman
      </p>
    </div>
  );
}
