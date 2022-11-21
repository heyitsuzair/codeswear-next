import React, { useState } from "react";
import axios from "axios";
import { fetchPincodes } from "../utils/api";
import { toast } from "react-toastify";

const PincodeForm = ({ setService }) => {
  const [pin, setPin] = useState("");
  const checkPincode = async () => {
    if (pin) {
      try {
        const { data } = await axios.get(fetchPincodes);

        if (data.includes(parseInt(pin))) {
          setService(true);
          toast.success("Your Pincode Is Servicable!");
        } else {
          setService(false);
          toast.error("Sorry! Pincode Is Not Servicable!");
        }
      } catch (error) {
        console.warn(error);
      }
    } else {
      toast("Please Enter Pincode");
    }
  };
  return (
    <div className="pin mt-6 flex space-x-2 text-sm">
      <input
        type="text"
        className="px-2 border-2 border-gray-400 outline-none rounded-md"
        name="pincode"
        id="pincode"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        placeholder="Enter Your City Zip Code"
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            checkPincode();
          }
        }}
      />
      <button
        className="flex ml-16 text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded"
        onClick={checkPincode}
      >
        Check
      </button>
    </div>
  );
};

export default PincodeForm;
