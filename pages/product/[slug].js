import { useRouter } from "next/router";
import React from "react";

const Slug = () => {
  const router = useRouter();
  const { slug } = router.query;
  return <div>Slug:{slug}</div>;
};

export default Slug;
