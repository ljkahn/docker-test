import React from "react";

import binkle from "../assets/binkle2.jpg";
import yann from "../assets/yann.jpg";
import both from "../assets/both.jpeg";

function Home() {
  return (
    <div>
      <div style={{ textAlign: "center", marginTop: 20 }}>
        BINX & YANN
        <p>@the_small_oreos</p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: 20,
        }}
      >
        <img
          src={binkle}
          alt="Description of image 1"
          style={{ width: "30%", objectFit: "cover" }}
        />
        <img
          src={both}
          alt="Description of image 2"
          style={{ width: "30%", objectFit: "cover" }}
        />
        <img
          src={yann}
          alt="Description of image 3"
          style={{ width: "30%", objectFit: "cover" }}
        />
      </div>
    </div>
  );
}

export default Home;
