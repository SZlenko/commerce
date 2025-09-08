import React from "react";
import SpecialOffers from "../../components/home/SpecialOffers/SpecialOffers";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const Offer = () => {
  return (
    <div className="max-w-container mx-auto">
      <Breadcrumbs title="Special Offers" />
      <div className="pb-10">
        <SpecialOffers />
      </div>
    </div>
  );
};

export default Offer;
