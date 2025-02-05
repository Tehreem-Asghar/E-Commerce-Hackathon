import { type SchemaTypeDefinition } from "sanity";

import shopexOffer from "./shopexOffer";
import DiscountOffer from "./discountOffer";

import herosec from "./herosection";
import subscrib from "./subscribLatestUpdate";
import blogs from "./blogs";

import recentblogs from "./recentPost";
import saleProduct from "./saleProduct";

import clientSayes from "./clientSayes";

import product from "./product";
import order from "./order";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    
    
 
    shopexOffer,
    DiscountOffer,
    order,
    herosec,
    subscrib,
    blogs,
    recentblogs,
    saleProduct,
    product,
    clientSayes,
    
  ],
};


