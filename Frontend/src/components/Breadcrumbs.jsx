import { Link, useLocation,useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../Redux/Services/fetchProducts.js";
import "../style/Breadcrumbs.css";

const Breadcrumb = () => {
  const { pathname } = useLocation();
  const{ id } = useParams();
  
  

  const pathNames = pathname.split("/").filter((x) => x);

  const { data } = useGetProductByIdQuery(id);
  

  return (
    <div className="Breadcrumbs">
      <Link to="/">Home</Link>
      {pathNames.map((name, index) => {
        const isLast = index === pathNames.length - 1;
        const breadcrumbPath = `/${pathNames.slice(0, index + 1).join("/")}`;

        return isLast ? (
          <span key={index}>
            &gt;{" "}
            {name === "view-all-products"
              ? "Men>   All Products"
              : data && data.product.name}
          </span>
        ) : (
          <Link key={index} to={breadcrumbPath}>
            &gt; {name === "view-all-products" ? "Men>   All Products" : name}
          </Link>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
