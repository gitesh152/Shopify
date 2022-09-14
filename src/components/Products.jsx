import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/actions";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { NavLink } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

//Products Component
function Products() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const addProduct = (p) => {
    dispatch(addCart(p));
    addToast("Successfully Added product to cart", {
      appearance: "success",
    });
  };

  let componentMounted = true;

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products");
      if (componentMounted) {
        setData(await response.clone().json());
        setFilter(await response.json());
        setLoading(false);
        console.log(filter);
      }

      return () => {
        componentMounted = false;
      };
    };
    getProducts();
  }, []);
  const Loading = () => {
    return (
      <>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
      </>
    );
  };
  const filterProduct = (cat) => {
    if (cat === "sort") {
      const updatedList = data.filter((x) => x.price !== 0);
      updatedList.sort(function (a, b) {
        return a.price - b.price;
      });
      setFilter(updatedList);
      addToast("Sorted products by price ", {
        appearance: "success",
      });
      return;
    }
    if (typeof cat === "number") {
      console.log(cat, typeof cat);
      const updatedList = filter.filter((x) => x.id !== cat);
      setFilter(updatedList);
      addToast("Deleted the product successfully", {
        appearance: "success",
      });
      return;
    }
    const updatedList = data.filter((x) => x.category === cat);
    setFilter(updatedList);
  };
  const ShowProducts = () => {
    return (
      <>
        <div className="buttons d-flex justify-content-center mb-5 pb-5">
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => setFilter(data)}
          >
            {" "}
            All
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("men's clothing")}
          >
            {" "}
            Men's Clothing
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("women's clothing")}
          >
            {" "}
            Women's Clothing
          </button>

          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("electronics")}
          >
            {" "}
            Electronics{" "}
          </button>
          <button
            className="btn btn-outline-dark me-2"
            style={{ marginLeft: "35%" }}
            onClick={() => filterProduct("sort")}
          >
            {" "}
            Sort By Price{" "}
          </button>
          <img
            src="https://img.icons8.com/color/48/000000/delete-sign--v1.png"
            onClick={() => {
              setFilter(data);
              addToast("Sorting is removed", {
                appearance: "warning",
              });
            }}
            alt="X"
          />
        </div>
        {filter.map((product) => {
          return (
            <>
              <div className="col-md-3 mb-4">
                <div className="card h-100 text-center p-4" key={product.id}>
                  <div style={{ marginLeft: "90%", fontSize: "2rem" }}>
                    <i
                      class="fa fa-trash"
                      onClick={() => filterProduct(product.id)}
                    ></i>
                  </div>
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.title}
                    height="250px"
                  />

                  <div className="card-body">
                    <h5 className="card-title mb-0">
                      {product.title.substring(0, 12)}
                    </h5>
                    ...{" "}
                    <p className="card-text lead fw-bold">${product.price}</p>
                    <NavLink
                      to={`/products/${product.id}`}
                      className="btn btn-outline-dark"
                    >
                      Buy Now
                    </NavLink>
                    <br />
                    <button
                      className="btn btn-outline-dark px-4 py-2"
                      onClick={() => addProduct(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };
  return (
    <div>
      <div className="container my-5 py-5 ">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 fw-bolder text-center">Latest Products</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </div>
  );
}

export default Products;
