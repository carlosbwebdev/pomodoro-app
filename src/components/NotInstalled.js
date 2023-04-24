import React, { useState, useEffect } from "react";

const NotInstalled = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center relative bg-white">
      <h1 className=" text-6xl mb-6">Please Install the app first!</h1>
      <p className=" text-xl ">
        This is an PWA app, you need to install it first!{" "}
      </p>
      <div className="arrow">
        <p>↑</p>
        <p>Install</p>
      </div>
    </div>
  );
};

export default NotInstalled;
