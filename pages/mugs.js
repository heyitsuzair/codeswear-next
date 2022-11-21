import Link from "next/link";
import React from "react";
import Head from "next/head";
import { getProducts } from "../utils/api";
import axios from "axios";

const Mugs = ({ products }) => {
  return (
    <div>
      <Head>
        <title>Mugs</title>
        <meta name="description" content="Codeswear Mugs Collection" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap justify-center -m-4">
            {products.map((product) => {
              return (
                <Link key={product._id} href={`/product/${product.slug}`}>
                  <div className="p-4 w-full cursor-pointer shadow-lg m-1 rounded-md">
                    <div className="block relative rounded overflow-hidden">
                      <img
                        alt="ecommerce"
                        className="h-[30vh] m-auto md:h-[35vh]"
                        src={product.img}
                      />
                    </div>
                    <div className="mt-4 text-center md:text-left">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        {product.title}
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        {product.desc}
                      </h2>
                      <p className="mt-1">Rs {product.price}</p>
                      <div className="sizes flex justify-start gap-1 mt-2">
                        {product.size.length > 0 &&
                          product.size.map((productSize, index) => {
                            return product.size.length !== index + 1 ? (
                              <p
                                key={index}
                                className="mt-1 border border-gray-300 px-5"
                              >
                                {productSize}
                              </p>
                            ) : (
                              <p
                                key={index}
                                className="mt-1 border border-gray-300 px-5"
                              >
                                {productSize}
                              </p>
                            );
                          })}
                      </div>
                      <div className="colors flex justify-start gap-1 mt-2">
                        {product.color.map((productColor, index) => {
                          return (
                            <button
                              key={index}
                              className={`border-2 border-gray-300 ml-1 bg-${productColor} rounded-full w-6 h-6 focus:outline-none`}
                            ></button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
export async function getServerSideProps(context) {
  let products = [];
  try {
    const { data } = await axios.get(getProducts + "mug");

    if (data.error === false) {
      products = data.products;
    }
  } catch (error) {
    console.log(error);
  }
  return {
    props: { products }, // will be passed to the page component as props
  };
}

export default Mugs;
