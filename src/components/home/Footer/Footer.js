import React, { useState } from "react";
import { motion } from "framer-motion";
// import { FaFacebook, FaYoutube, FaLinkedin, FaGithub, FaInstagram, FaTiktok } from "react-icons/fa";
import FooterListTitle from "./FooterListTitle";
import { paymentCard } from "../../../assets/images";
import Image from "../../designLayouts/Image";

const Footer = () => {
  const [emailInfo, setEmailInfo] = useState("");
  const [subscription, setSubscription] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const emailValidation = () => {
    return String(emailInfo)
      .toLocaleLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };

  const handleSubscription = () => {
    if (emailInfo === "") {
      setErrMsg("Please provide an Email !");
    } else if (!emailValidation(emailInfo)) {
      setErrMsg("Please give a valid Email!");
    } else {
      setSubscription(true);
      setErrMsg("");
      setEmailInfo("");
    }
  };
  return (
    <div className="w-full bg-[#317248] py-3">
      <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-2  xl:grid-cols-6 px-3 gap-3">


        <div className="col-span-2 flex flex-col items-left w-full">
          {/* <FooterListTitle title="Contact on Whatsapp: 03211949184" /> */}
          <div className="w-full">
            <h5 className="text-left mb-0 text-[#f9cc1f]">
              <div style={{ display: "flex", justifyContent: "left", alignItems: "center", gap: "10px" }}>
                For Payment Use Easy Paisa, SadaPay and MCB <br />
              </div>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
