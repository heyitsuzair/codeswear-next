import Link from "next/link";
import React from "react";
import Head from "next/head";
import axios from "axios";
import { getProducts } from "../utils/api";

const Stickers = ({ products }) => {
  return (
    <div>
      <Head>
        <title>Stickers</title>
        <meta name="description" content="Codeswear Stickers Collection" />
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
                        className="h-[30vh] m-auto md:h-[45vh]"
                        src={`${product.img}`}
                      />
                    </div>
                    <div className="mt-4 text-center md:text-left">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        {product.title}
                      </h3>

                      <p className="mt-1">Rs {product.price}</p>
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
    const { data } = await axios.get(getProducts + "stickers");
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

export default Stickers;
