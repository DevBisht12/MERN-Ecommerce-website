import React, { useState, useEffect } from "react";
import Alert from "@mui/joy/Alert";
import ProductCard from "../components/ProductCard.jsx";
import IconButton from "@mui/joy/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { useGetProductByIdQuery } from "../Redux/Services/fetchProducts.js";
import { useParams } from "react-router-dom";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import ErrorIcon from "@mui/icons-material/Error";
import { Link } from "react-router-dom";
import Skeleton from "@mui/joy/Skeleton";
import Stack from "@mui/joy/Stack";
import Rating from "@mui/material/Rating";
import "../style/ProductDetails.css";
import Breadcrumb from "../components/Breadcrumbs.jsx";
import { useDispatch, useSelector } from "react-redux";
import { addtoCart } from "../Redux/features/addtoCartSlice.js";
import { FaStar } from "react-icons/fa";
import { IoMdStar } from "react-icons/io";
import ImageSlider from "../components/MobileImgSlider.jsx";
import {addReview} from '../Redux/features/addReview.js'
import { useGetProductsQuery } from "../Redux/Services/fetchProducts.js";

const ProductDetails = () => {
  const { data, isLoading1, error } = useGetProductsQuery(1);
  const { id } = useParams();
  const { data: productInfo, isLoading, isError } = useGetProductByIdQuery(id);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItem);
  const cartItemsIds = cartItems.map((item) => item.product);
  const [successAlert, setSuccessAlert] = useState(false);
  const [selectSizeAlert, setSelectSizeAlert] = useState(false);
  const [alreadyAddedAlert, setAlreadyAddedAlert] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [shuffledProducts, setshuffledProducts] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);


  const shuffleingProducts = (Data) => {
    let dataCopy = [...Data];
    for (let i = dataCopy.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [dataCopy[i], dataCopy[j]] = [dataCopy[j], dataCopy[i]];
    }
    setshuffledProducts(dataCopy.slice(0, 4));
  };

  useEffect(() => {
    if (!isLoading1 && data) {
      shuffleingProducts(data.allProducts);
    }
  }, [data, isLoading1]);

  const handleAddToCart = (options) => {
    if (selectedSize === null) {
      setSelectSizeAlert(true);
      setTimeout(() => {
        setSelectSizeAlert(false);
      }, 3000);
      return;
    }
    if (cartItemsIds.includes(options.product)) {
      setAlreadyAddedAlert(true);
      setTimeout(() => {
        setAlreadyAddedAlert(false);
      }, 3000);
      return;
    }

    setSuccessAlert(true);
    setTimeout(() => {
      setSuccessAlert(false);
    }, 3000);
    dispatch(addtoCart(options));
  };

  const closeAlert = () => {
    setSuccessAlert(false);
  };
  const closeSizeAlert = () => {
    setSelectSizeAlert(false);
  };
  const closeAlreadyAddedAlert = () => {
    setAlreadyAddedAlert(false);
  };

  const getColor = () => {
    if (productInfo && productInfo.product.ratings >= 4.5) {
      return "green";
    } else if (productInfo && productInfo.product.ratings >= 3.5) {
      return "#ff9f00";
    } else {
      return "#ff6161";
    }
  };
  const coustomerReviewColor = (rating) => {
    if (rating >= 4.5) {
      return "green";
    } else if (rating >= 3.5) {
      return "#ff9f00";
    } else {
      return "#ff6161";
    }
  };
  const setReview = (review) => {
    if (review == 5) return "Excellent Product";
    else if (review == 4) return "Value for Money";
    else if (review == 3) return "Good Product";
    else if (review == 2) return "Not Good";
    else if (review == 1) return "Poor Product";
    else return "No Review";
  };
  const handleReview = () => {
    const Review={
      productId:id,
      rating:rating,
      comment:comment
    }
    dispatch(addReview(Review))
  };

  return (
    <>
      <div className="ProductDetails">
        {data && productInfo ? (
          <>
            <div className="productDetails">
              {selectSizeAlert && (
                <Alert
                  variant="outlined"
                  style={{ transition: "0.5s" }}
                  color="neutral"
                  sx={{
                    position: "fixed",
                    top: 10,
                    right: 5,
                    zIndex: 100,
                    transition: "1s",
                  }}
                  startDecorator={<ErrorIcon />}
                  endDecorator={
                    <IconButton variant="plain" size="sm" color="neutral">
                      <CloseRoundedIcon onClick={closeSizeAlert} />
                    </IconButton>
                  }
                >
                  Please select size.
                </Alert>
              )}

              {successAlert && (
                <Alert
                  style={{ transition: "0.5s"  }}
                  variant="outlined"
                  className="alertBox"
                  endDecorator={
                    <IconButton variant="plain" size="sm" color="neutral">
                      <CloseRoundedIcon onClick={closeAlert} />
                    </IconButton>
                  }
                  color="neutral"
                  size="sm"
                  sx={{
                    position: "fixed",
                    top: 10,
                    right: 5,
                    display: "flex",
                    zIndex: 100,
                    transition: "1s",
                    justifyContent: "space-evenly",
                    width: "fit-content",
                  }}
                >
                  <div className="img_section">
                    <img
                      src={productInfo.product.imgSrc1}
                      style={{
                        width: "60px",
                        boxShadow:
                          "box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;",
                        margin: "0 1rem",
                      }}
                      alt=""
                    />
                  </div>
                  <div
                    className="product_details"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "fit-content",
                    }}
                  >
                    <strong>
                      <p>{productInfo.product.name}</p>
                    </strong>
                    <p>Successfully Added to Cart</p>
                  </div>
                </Alert>
              )}

              {alreadyAddedAlert && (
                <Alert
                  style={{ transition: "0.5s" }}
                  variant="outlined"
                  color="neutral"
                  sx={{
                    position: "fixed",
                    top: 10,
                    right: 5,
                    transition: "1s",
                    zIndex: 100,
                  }}
                  startDecorator={<ErrorIcon />}
                  endDecorator={
                    <IconButton variant="plain" size="sm" color="neutral">
                      <CloseRoundedIcon onClick={closeAlreadyAddedAlert} />
                    </IconButton>
                  }
                >
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <strong>{productInfo.product.name}</strong>
                    <p>This item is already in your cart.</p>
                  </Box>
                </Alert>
              )}
              <div className="imgSection">
                {isLoading ? (
                  <ImageSkeleton />
                ) : productInfo ? (
                  <>
                    <img src={productInfo.product.imgSrc1} alt="" />
                    <img src={productInfo.product.imgSrc2} alt="" />
                    <img src={productInfo.product.imgSrc3} alt="" />
                  </>
                ) : (
                  <h1>Product Not Found</h1>
                )}
              </div>
              <div className="mobileImg_Section">
                {isLoading ? (
                  <ImageSkeleton />
                ) : productInfo ? (
                  <ImageSlider
                    imgSrc1={productInfo.product.imgSrc1}
                    imgSrc2={productInfo.product.imgSrc2}
                    imgSrc3={productInfo.product.imgSrc3}
                  />
                ) : (
                  <h1>Product Not Found</h1>
                )}
              </div>

              <div className="productDetails_Section">
                <Breadcrumb />
                <p>
                  <strong>
                    {productInfo ? productInfo.product.name : Name}
                  </strong>
                </p>
                <span>MRP inclusive of all taxes</span>
                <div>
                  <span
                    id="ratings"
                    style={{ backgroundColor: getColor() || "green" }}
                  >
                    {productInfo ? productInfo.product.ratings : 0}{" "}
                    <FaStar style={{ color: "white" }} />
                  </span>{" "}
                  <span style={{ width: "fit-content" }}>
                    {productInfo ? productInfo.product.reviews.length : 0}{" "}
                    Ratings
                  </span>
                </div>
                <p>
                  <strong>
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                    }).format(productInfo ? productInfo.product.price : 0)}
                  </strong>
                </p>
                <div className="color">
                  <span>Color</span>
                  <div className="color_main">
                    <p style={{ backgroundColor: "black" }}></p>
                    <p style={{ backgroundColor: "#e3e3e3" }}></p>
                    <p style={{ backgroundColor: "#FFF8E3" }}></p>
                    <p style={{ backgroundColor: "#527853" }}></p>
                    <p style={{ backgroundColor: "#BFEA7C" }}></p>
                  </div>
                </div>
                <div className="size">
                  <div className="size">
                    <span>Size</span>
                    <div className="size_main">
                      <p
                        className={selectedSize === "S" ? "selected_size" : ""}
                        onClick={() => setSelectedSize("S")}
                      >
                        S
                      </p>
                      <p
                        className={selectedSize === "M" ? "selected_size" : ""}
                        onClick={() => setSelectedSize("M")}
                      >
                        M
                      </p>
                      <p
                        className={selectedSize === "L" ? "selected_size" : ""}
                        onClick={() => setSelectedSize("L")}
                      >
                        L
                      </p>
                      <p
                        className={selectedSize === "XL" ? "selected_size" : ""}
                        onClick={() => setSelectedSize("XL")}
                      >
                        XL
                      </p>
                      <p
                        className={
                          selectedSize === "XXL" ? "selected_size" : ""
                        }
                        onClick={() => setSelectedSize("XXL")}
                      >
                        XXL
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() =>
                    handleAddToCart({
                      product: productInfo.product._id,
                      size: selectedSize,
                      name: productInfo.product.name,
                      price: productInfo.product.price,
                      image: productInfo.product.imgSrc1,
                      quantity: 1,
                    })
                  }
                >
                  Add
                </button>
                <span style={{ padding: "1rem 0rem" }}>
                  <AiOutlineExclamationCircle /> Delivery Time : 2-7 days
                </span>
                <p style={{ marginBottom: "1rem" }}>Delivery and Payment</p>
                <hr />
                <details className="product_summary">
                  <summary>Description</summary>
                  <p>
                    Regular-fit cargo trousers in cotton twill with sewn-in
                    pleats at the knees. Covered elastication at the back of the
                    waist, zip fly and a press-stud. Welt side pockets with a
                    press-stud, bellows leg pockets with press-studs and welt
                    back pockets.
                  </p>
                </details>
                <hr />
                <details className="product_summary">
                  <summary>Materials</summary>
                  <p>
                    <strong>Shell</strong>: Cotton 98%, Elastane 2% <br />
                    <strong>Pocket lining</strong>: Cotton 100% <br />
                    <strong>Waist</strong>: Polyester 96%, Elastane 4% <br />
                    <strong>Waist</strong>: Cotton 100% <br />
                  </p>
                </details>
              </div>
            </div>
            <div className="RatingSection">
              <h2>Ratings & Reviews</h2>
              <div className="RatingSection_main" >
                <div className="leftSection_Rating">
                  <div className="leftSection_main">
                    <h2>
                      {productInfo ? productInfo.product.ratings : 0}
                      <IoMdStar style={{ fontSize: "2 rem" }} />
                    </h2>
                    <span>
                      {productInfo ? productInfo.product.reviews.length : 0}
                      Ratings & Reviews
                    </span>
                  </div>
                  <div className="progress_secion">
                    <span>
                      5 <IoMdStar style={{ fontSize: "13px" }} />{" "}
                      <progress value="10" max="100"></progress>
                    </span>
                    <span>
                      4 <IoMdStar style={{ fontSize: "13px" }} />{" "}
                      <progress value="60" max="100"></progress>
                    </span>
                    <span>
                      3 <IoMdStar style={{ fontSize: "13px" }} />{" "}
                      <progress value="30" max="100"></progress>
                    </span>
                    <span>
                      2 <IoMdStar style={{ fontSize: "13px" }} />{" "}
                      <progress value="20" max="100"></progress>
                    </span>
                    <span>
                      1 <IoMdStar style={{ fontSize: "13px" }} />{" "}
                      <progress value="10" max="100"></progress>
                    </span>
                  </div>
                </div>
                <div className="rateProduct">
                  <div className="rateProduct_main">
                    
                    <div className="rateProduct_rating">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <p> Rate this product</p>
                      <Box
                        sx={{
                          "& > legend": { mt: 2 },
                        }}
                      >
                        <Rating
                          name="simple-controlled"
                          value={rating} 
                          onChange={(event, newValue) => {
                            setRating(newValue);
                          }}
                        />
                      </Box>
                    </div>
                      <textarea
                        style={{ padding: "1rem" }}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        name="message"
                        placeholder="Write your review here"
                      ></textarea>
                      <button onClick={handleReview}>Submit</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {productInfo && productInfo.product.reviews.length > 0 ? (
              <div className="customer_review">
                <h2>Customer reviews</h2>
                <div className="customer_review_main">
                  {productInfo.product.reviews.map((review, index) => (
                    <div className="review_Box" key={index}>
                      <div className="customer_review_img">
                        <img
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "100%",
                          }}
                          src="https://www.utm.utoronto.ca/health/sites/files/health/styles/square/public/2023-09/Blank%20Avatar.png?h=93fa4828"
                          alt=""
                        />
                      </div>
                      <div className="customer_review_text">
                        <span>{review ? review.name : user}</span>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            width: "100%",
                          }}
                        >
                          <span
                            id="ratings"
                            style={{
                              backgroundColor:
                                coustomerReviewColor(
                                  review ? review.rating : 0
                                ) || "green",
                              fontSize: "10px",
                            }}
                          >
                            {review ? review.rating : 0}
                            <FaStar style={{ color: "white" }} />
                          </span>
                          <span style={{ marginLeft: "5px" }}>
                            <strong>
                              {setReview(review ? review.rating : 0) || "Good1"}
                            </strong>
                          </span>
                        </div>
                        <p>{review ? review.comment : null}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            {shuffledProducts.length > 0 && data && data.allProducts ? (
              <div className="suggested_products">
                <h3>Frequently bought together</h3>
                <div className="suggested_products_main">
                  {shuffledProducts.map((product) => (
                    <Link to={`/view-all-products/${product._id}`}>
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
                  ))}
                </div>
                <Link to="/view-all-products">
                  <button>See all products</button>
                </Link>
              </div>
            ) : null}
          </>
        ) : (
          <div className="Skeleton">
            <h1>Loading...</h1>
          </div>
        )}
      </div>
    </>
  );
};

function ImageSkeleton() {
  const [loading, setLoading] = React.useState(true);
  return (
    <Stack spacing={2} useFlexGap sx={{ alignItems: "center" }}>
      <Box sx={{ m: "auto" }}>
        <AspectRatio variant="plain" sx={{ width: 200 }}>
          <Skeleton loading={loading}>
            <img
              src={
                loading
                  ? "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                  : "https://images.unsplash.com/photo-1686548812883-9d3777f4c137?h=400&fit=crop&auto=format&dpr=2"
              }
              alt=""
            />
          </Skeleton>
        </AspectRatio>
      </Box>
    </Stack>
  );
}
export default ProductDetails;
