import { useRouter } from "next/router";
import React, { useState } from "react";
import PincodeForm from "../../components/PincodeForm";
import axios from "axios";
import { getProducts } from "../../utils/api";
import Head from "next/head";

const Slug = ({ addToCart, product, buyNow }) => {
  const [service, setService] = useState(null);

  const router = useRouter();
  const { slug } = router.query;
  const [color, setColor] = useState(product.color[0]);
  const [size, setSize] = useState(product.size[0]);

  return (
    <div>
      <Head>
        <title>{product.title}</title>
        <meta name="description" content={product.desc} />
        <link rel="icon" href={product.img} />
      </Head>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-16 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto px-12 object-cover object-top rounded"
              src={product.img}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                Codeswear
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.title}
              </h1>

              <p className="leading-relaxed">{product.desc}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">
                    {product.color.length > 0 && <span>Color</span>}
                  </span>
                  {product.color.length > 0 &&
                    product.color.map((clr, index) => {
                      return (
                        <button
                          key={index}
                          className={`border-2 mx-1 ${
                            clr === color ? " border-black" : "border-gray-200"
                          } rounded-full w-6 h-6 focus:outline-none bg-${clr}`}
                          onClick={() => setColor(clr)}
                        ></button>
                      );
                    })}
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">
                    {product.size.length > 0 && <span>Size</span>}
                  </span>
                  <div className="relative">
                    {product.size.length > 0 && (
                      <select
                        className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-3 pr-10"
                        onChange={(e) => setSize(e.target.value)}
                      >
                        {product.size.map((size, index) => {
                          return <option key={index}>{size}</option>;
                        })}
                      </select>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  Rs {product.price}
                </span>
                <button
                  disabled={product.availableQty < 1 ? true : false}
                  className="flex ml-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded disabled:opacity-50"
                  onClick={() =>
                    buyNow(slug, 1, product.price, product.title, size, color)
                  }
                >
                  Buy Now
                </button>
                <button
                  disabled={product.availableQty < 1 ? true : false}
                  className="flex ml-4 text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded disabled:opacity-50"
                  onClick={() =>
                    addToCart(
                      slug,
                      1,
                      product.price,
                      product.title,
                      size,
                      color
                    )
                  }
                >
                  Add To Cart
                </button>
              </div>
              <div className="mb-4">
                <PincodeForm setService={setService} />
              </div>
              {!service && service != null && (
                <div className="text-red-700">
                  Sorry :( We Donot Deliver To This ZIP Code
                </div>
              )}
              {service && service != null && (
                <div className="text-green-700">
                  Yay! We Can Deliver To This ZIP Code
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export async function getServerSideProps(context) {
  let product = [];
  try {
    const { data } = await axios.put(getProducts + context.query.slug);
    if (data.error === false) {
      product = data.product[0];
    }
  } catch (error) {
    console.log(error);
  }
  return {
    props: { product }, // will be passed to the page component as props
  };
}

export default Slug;
