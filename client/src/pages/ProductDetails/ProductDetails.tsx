import React from "react";
type Tparams = {
  id: string;
  image: string;
  description: string;
};

export default function ProductDetail({ id, description, image }: Tparams) {
  return <div>ProductDetail</div>;
}
