import "../style/AllProducts.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import Breadcrumb from "../components/Breadcrumbs.jsx";
import BasicSkeleton from "../components/Skeleton.jsx";
import TuneIcon from "@mui/icons-material/Tune";
import Dropdown from "@mui/joy/Dropdown";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import { useGetProductsQuery } from "../Redux/Services/fetchProducts.js";

const AllProducts = () => {
  const [products, setProducts] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCategory, setCurrentCategory] = useState();
  const [sortProducts, setSortProducts] = useState();

  const {
    data: productsData,
    isLoading: productsLoading,
    error: productsError,
  } = useGetProductsQuery({
    page: currentPage,
    sort: sortProducts,
    categoryName: currentCategory,
  });

  useEffect(() => {
    if (productsData && productsData.allProducts) {
      setProducts(productsData.allProducts);
    }
  }, [productsData]);

  if (productsLoading) {
    return (
      <div
        className="loading"
        style={{
          display: "flex",
          height: "90vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>Loading...</h1>
      </div>
    );
  }



  return (
    <div className="allproduct">
      <div className="allproduct_sideMenu">
        <div className="newArrivals">
          <strong>
            <p id="heading">New Arriavls</p>
          </strong>
          <p>Clothes</p>
        </div>
        <div className="trendingNow">
          <strong>
            <p id="heading">Trending Now</p>
          </strong>
          <p>Trending Now</p>
        </div>
        <div className="Shop_by_Product">
          <strong>
            <p id="heading">Shop by Product</p>
          </strong>
          <p onClick={() => setCurrentCategory("Mens Tshirts and Tops")}>
            T-shirts & Tops
          </p>
          <p onClick={() => setCurrentCategory("Mens Hoodies and Sweatshirts")}>
            Hoodies & Sweatshirts
          </p>
          <p>Shirts</p>
          <p>Jeans</p>
          <p>Blazers & Suits</p>
          <p>Sportswear</p>
          <p>Sale</p>
        </div>
      </div>
      <div className="allproduct_main">
        <div className="breadCrumb" >
          <Breadcrumb />
        </div>

        <div className="filter">
          <div className="filter_left_section">
            <Dropdown>
              <MenuButton
                sx={{
                  cursor: "pointer",
                  border: "none",
                  padding: "5px",
                  margin: 0,
                }}
              >
                <TuneIcon />
              </MenuButton>
              <Menu>
                <MenuItem onClick={() => setSortProducts("asc")}>
                  Price: Low to High
                </MenuItem>
                <MenuItem onClick={() => setSortProducts("desc")}>
                  Price: High to Low
                </MenuItem>
                <MenuItem>
                  <p
                    onClick={() => setCurrentCategory("Mens Tshirts and Tops")}
                  >
                    T-shirts & Tops
                  </p>
                </MenuItem>
                <MenuItem>
                  <p
                    onClick={() =>
                      setCurrentCategory("Mens Hoodies and Sweatshirts")
                    }
                  >
                    Hoodies & Sweatshirts
                  </p>
                </MenuItem>
                <MenuItem>Newest Arrivals</MenuItem>
              </Menu>
            </Dropdown>
            <p>FILTER & SORT</p>
          </div>
        </div>
        <div className="allproduct_display">
          {productsLoading
            ? products.map((product) => (
                <div key={product.id}>
                  <BasicSkeleton />
                </div>
              ))
            : products &&
              products.map((product) => (
                <Link to={`/view-all-products/${product._id}`}>
                  <ProductCard
                    key={product._id}
                    id={product._id}
                    imgSrc1={product.imgSrc1}
                    name={product.name}
                    price={new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                    }).format(product.price)}
                    category={product.category}
                  />
                </Link>
              ))}
        </div>
        {/* {isMobile ? <TabsBottomNavExample /> : null} */}
        <div className="Pagination">
          <button onClick={() => setCurrentPage(currentPage - 1)}>Pre</button>
          <p>{currentPage}</p>
          <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
