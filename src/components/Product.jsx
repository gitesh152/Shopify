import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/actions";
import { useParams } from "react-router";
import Skeleton from "react-loading-skeleton";
import { NavLink } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

//Product Component
function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts();

  const dispatch = useDispatch();
  const addProduct = (p) => {
    dispatch(addCart(p));
    addToast("Successfully Added product to cart", {
      appearance: "success",
    });
  };
  const editProduct = () => {
    document.getElementById("title").style.display = "none";
    document.getElementById("category").style.display = "none";
    document.getElementById("input-title").style.display = "block";
    document.getElementById("input-cat").style.display = "block";
    document.getElementById("save").style.display = "inline-block";
    document.getElementById("cancel").style.display = "inline-block";
    document.getElementById("addcart").style.display = "none";
    document.getElementById("gocart").style.display = "none";
  };

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      setProduct(await response.json());
      setLoading(false);
    };
    getProduct();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-md-6" style={{ lineHeight: 6 }}>
          <Skeleton height={400} />
        </div>
        <div className="col-md-6">
          <Skeleton height={50} width={300} />
          <Skeleton height={75} />
          <Skeleton height={25} width={150} />
          <Skeleton height={50} />
          <Skeleton height={150} />
          <Skeleton height={50} width={100} />
          <Skeleton height={50} width={100} style={{ marginLeft: 6 }} />
        </div>
      </>
    );
  };

  const ShowProduct = () => {
    return (
      <>
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.title}
            height="400px"
            width="400px"
          />
        </div>
        <div className="col-md-6" style={{ marginTop: "-6%" }}>
          <img
            style={{ marginLeft: "80%" }}
            src="https://img.icons8.com/bubbles/50/000000/edit.png"
            onClick={() => editProduct()}
            alt="edit"
          />
          <h4 className="text-uppercase text-black-50">
            {" "}
            <input
              className="text-uppercase text-black-50"
              style={{ display: "none" }}
              id="input-cat"
              value={product.category}
              type="text"
              name="title"
            />{" "}
          </h4>
          <h4 id="category" className="text-uppercase text-black-50">
            {product.category}
          </h4>

          <h1 className="display-5">
            {" "}
            <input
              id="input-title"
              className="display-5"
              style={{ display: "none" }}
              value={product.title}
              type="text"
              name="title"
            />
          </h1>
          <h1 id="title" className="display-5">
            {product.title}
          </h1>
          <p className="lead">
            Rating {product.rating && product.rating.rate}
            <i className="fa fa-star"></i>
          </p>
          <h3 className="display-6 fw-blod my-4">$ {product.price}</h3>
          <p className="lead">{product.description}</p>
          <NavLink
            to=""
            id="cancel"
            className="btn btn-outline-dark px-4 py-2"
            style={{ display: "none" }}
            onClick={() => {
              addToast("Canceled Editing product", {
                appearance: "warning",
              });
            }}
          >
            Cancel
          </NavLink>
          <NavLink
            to=""
            id="save"
            style={{ display: "none" }}
            onClick={() => {
              addToast("Dummy save button", {
                appearance: "success",
              });
            }}
            className="btn btn-dark ms-2 px-3 py-2"
          >
            Save
          </NavLink>
          <button
            id="addcart"
            className="btn btn-outline-dark px-4 py-2"
            onClick={() => addProduct(product)}
          >
            Add to Cart
          </button>
          <NavLink
            to="/cart"
            id="gocart"
            className="btn btn-dark ms-2 px-3 py-2"
          >
            Go to Cart
          </NavLink>
        </div>
      </>
    );
  };
  return (
    <div className="container py-5">
      <div className="row py-5">{loading ? <Loading /> : <ShowProduct />}</div>
    </div>
  );
}

export default Product;
