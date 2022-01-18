import React, { useState } from "react";
import { useRouter } from "next/router";

const Onedate = () => {
  const router = useRouter();

  const { id } = router.query;
  console.log(id);
  return (
    <div>
      <h1>agend id</h1>
    </div>
  );
};

export default Onedate;
