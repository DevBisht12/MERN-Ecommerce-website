import React from "react";
import {Link} from 'react-router-dom';
import CategoryCard from "../components/CategoryCard.jsx";
import '../style/Home.css'
import ProductCard from "../components/ProductCard.jsx";
import { useGetProductsQuery } from "../Redux/Services/fetchProducts.js";


const Home = () => {


  const { data, error, isLoading } = useGetProductsQuery(1);



  const shuffleingProducts = (Data) => {
    let dataCopy = [...Data]; 
    for(let i = dataCopy.length - 1; i >= 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [dataCopy[i], dataCopy[j]] = [dataCopy[j], dataCopy[i]];
    }
    return dataCopy.slice(0, 4);
  }

  const shuffledProducts = data ? shuffleingProducts(data.allProducts) : [];

  return (
    <div className="home">
      <div className="hero">
        <div className="hero_top_section">
          <span>
            DIVE INTO A W
            <span>
              <img
                className="heading_img"
                src="https://i.postimg.cc/wxSbh5B0/peach-woolen-round-modern-women-hand-bags-with-handles-for-daily-use-528-removebg-preview.png"
                alt=""
              />
            </span>
            RLD OF ENDLESS FASHION POSSIBILITIES{" "}
          </span>
          <p id="sub_heading">
            Elevate Your Wardrobe with our Fashion Finds.
            <br />
            Discover Your Signature Style at Fashion Avenue.
          </p>
        </div>
        <div className="hero_bottom_section"></div>
        <div className="hero_bottom_section">
          <div className="three_section three_left">
            <img
              src="https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F9d%2F77%2F9d778784724e4da0942a21dbff916a1fabdf5bd5.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]"
              alt=""
            />
          </div>
          <div className="three_section mid">
            <div className="button_section">
              <button className="btn1">
                SHOP NOW
                <span id="arrowIcon"> &#10230; </span>
              </button>
              <button className="btn2" style={{color:'black'}} >
                EXPLORE MORE PRODUCTS <span id="arrowIcon"> &#10230;</span>
              </button>
            </div>
            <img
              id="mid_img"
              src="https://i.postimg.cc/Y211K7tf/hmgoepprod.jpg"
              alt=""
            />
          </div>
          <div className="three_section three_right">
            <img src="https://i.postimg.cc/Wpq2b1kk/hmgoepprod-3.jpg" alt="" />
          </div>
        </div>
      </div>
      <div className="category_section">
        <h2>All Categories</h2>
        <div className="category_main">
          <Link to="/view-all-products">
          <CategoryCard
            imgSrc="https://lp2.hm.com/hmgoepprod?set=source[/c8/ef/c8efe7078231ea7e2614154294a354d5b975a010.jpg],origin[dam],category[],type[LOOKBOOK],res[z],hmver[1]&call=url[file:/product/main]"
            name="Men"
          />
          </Link>
          <CategoryCard
            imgSrc="https://lp2.hm.com/hmgoepprod?set=source[/af/9e/af9efdfc33a89b3ff24351ec0b00941682d838fc.jpg],origin[dam],category[],type[LOOKBOOK],res[z],hmver[1]&call=url[file:/product/main]"
            name="Women"
          />
          <CategoryCard
            imgSrc="https://lp2.hm.com/hmgoepprod?set=source[/84/ef/84ef464a891db1b3d213ad1fd4869c016d1c125c.jpg],origin[dam],category[],type[LOOKBOOK],res[z],hmver[1]&call=url[file:/product/main]"
            name="Kids"
          />
          <CategoryCard
            imgSrc="https://lp2.hm.com/hmgoepprod?set=source[/57/22/5722530d9338667f2d37daf7e034e33883a30c76.jpg],origin[dam],category[],type[LOOKBOOK],res[z],hmver[2]&call=url[file:/product/main]"
            name="Sports"
          />
          <CategoryCard
            imgSrc="//lp2.hm.com/hmgoepprod?set=source[/19/b8/19b8daa899aa0424592df54a2c814c943549c0e8.jpg],origin[dam],category[],type[LOOKBOOK],res[z],hmver[1]&call=url[file:/product/main]"
            name="New Arrivals"
          />
        </div>
      </div>
      <div className="explore_section">
        <span>
          YOUR STYLE{" "}
          <img
            id="exploreImg"
            src="https://i.postimg.cc/25Hntf0M/1519-AA-3x2.jpg]"
            alt=""
          />
          <br />
          <img
            id="exploreImg"
            src="//lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F70%2F7d%2F707d99c2ed3be1d4c896f6ec3b8e638715644ae6.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/fullscreen]"
            alt=""
          />
          <span>
            YOUR RULES <br />
            <span>EMPOWER YOUR FASHION</span>
          </span>
        </span>
        <button>Explore Now</button>
      </div>
      <div className="New_Arrivals_section">
        <h2 className="newArrival_H2">New Arrivals</h2>
        <div className="main_arrival_main">
        {shuffledProducts.map((product) => (
          <div id="product_card">
            <Link to={`/view-all-products/${product._id}`}
            >
              <ProductCard
                key={product.id}
                id={product.id}
                imgSrc1={product.imgSrc1}
                name={product.name}
                price={new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(product.price)}
                category={product.category}
              />
            </Link>
          </div>
          ))
          }
        </div>
      </div>
      <div id="partner" >
      <div className="partner_section"  >
        <div className="partner_Sec_main">
          <img src="https://i.postimg.cc/43tgGxsq/Zara-Logo-PNG5.png" alt="" />
          <img src="https://i.postimg.cc/ZYW1zqHc/H-M-Logo-PNG5.png" alt="" />
          <img
            src="https://i.postimg.cc/t4krx0DJ/Louis-Vuitton-Logo-PNG8.png"
            alt=""
          />
          <img src="https://i.postimg.cc/D0zf73CG/Nike-Logo-PNG11.png" alt="" />
          <img
            src="https://i.postimg.cc/Dzy7rTTM/Under-Armour-Logo-PNG9.png"
            alt=""
          />
          <img
            src="https://i.postimg.cc/HkmMCVw8/Air-Jordan-Logo-PNG-2.png"
            alt=""
          />
        </div>
      </div>
      </div >
      <div className="newsletter_section">
        <h2>Newsletter sign up</h2>
        <p>
          SIGN UP NOW AND GET Exclusive offers! The latest fashion news!
          Inspiration and style tips!
        </p>
        <input type="text" placeholder="Enter your Email" />
        <button>Yes, sign me up!</button>
      </div>
    </div>
  );
};

export default Home;

