import React from "react";

const PageDecoration = () => {
  return (
    <>
      {/* top right decoration */}
      <div className="absolute -top-72 -right-48 -z-10 hidden h-[915px] w-[915px] rounded-full bg-white bg-gradient-decorator-circle blur-2xl lg:block"></div>
      {/* top left decoration */}
      <div className="absolute -top-40 -left-24 -z-10 hidden h-[637px] w-[637px] rounded-full bg-white bg-gradient-decorator-circle blur-2xl lg:block"></div>
      {/* bottom right decoration */}
      <div className="absolute top-[688px] -right-48 -z-10 hidden h-[664px] w-[664px] rounded-full bg-white bg-gradient-decorator-circle blur-2xl lg:block"></div>
    </>
  );
};

export default PageDecoration;
