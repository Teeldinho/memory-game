import React from "react";

const PageDecoration = () => {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* DESKTOP DECORATION */}

      {/* top right decoration */}
      <div className="absolute -top-64 -right-40 hidden h-[44rem] w-[44rem] rounded-full bg-white bg-gradient-decorator-circle blur-2xl lg:block"></div>
      {/* top left decoration */}
      <div className="absolute -top-44 -left-20 hidden h-[36rem] w-[36rem] rounded-full bg-white bg-gradient-decorator-circle blur-2xl lg:block"></div>
      {/* bottom right decoration */}
      <div className="absolute -bottom-56 -right-36 hidden h-[40rem] w-[40rem] rounded-full bg-white bg-gradient-decorator-circle blur-2xl lg:block"></div>

      {/* MOBILE DECORATION */}
      {/* left decoration */}
      <div className="absolute -top-24 -left-20 block h-[18rem] w-[18rem] rounded-full bg-gradient-mobile-radial-l blur-xl lg:hidden"></div>

      {/* right decoration */}
      <div className="absolute -top-20 -right-20 block h-[20rem] w-[20rem] rounded-full bg-gradient-mobile-radial-r blur-xl lg:hidden"></div>
    </div>
  );
};

export default PageDecoration;
