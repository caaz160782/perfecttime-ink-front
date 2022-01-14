import React, { useState } from "react";
import { useRouter } from "next/router";

const oneDate = () => {
  //const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <h1>agend id</h1>
    </div>
  );
};

export default oneDate;
