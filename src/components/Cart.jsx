import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { useDispatch } from "react-redux";
import { addCart, delCart } from "../redux/actions";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";

//Cart component
function Cart() {
  const state = useSelector((state) => state.handleCart);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false);

  let componentMounted = true;
  const dispatch = useDispatch();
  const addProduct = (p) => {
    //dispatching add product
    dispatch(addCart(p));
    addToast("Successfully Added product to cart", {
      appearance: "success",
    });
  };
  const delProduct = (p) => {
    //dispatching remove product
    dispatch(delCart(p));
    addToast("Successfully removed product from cart", {
      appearance: "warning",
    });
  };
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);

      if (componentMounted) {
        setData(state);
        setFilter(state);
        setLoading(false);
        console.log(filter);
      }

      return () => {
        componentMounted = false;
      };
    };
    getProducts();
  }, [state]);
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
  console.log(state);
  const ShowProducts = () => {
    return (
      <>
        {filter.map((product) => {
          return (
            <>
              <div style={{ marginBottom: "2%" }}>
                <div
                  className="row"
                  style={{ width: "80%", marginLeft: "15%" }}
                >
                  <div className="col-md-4">
                    <img
                      src={product.image}
                      alt={product.title}
                      height="200px"
                      width="180px"
                    />
                  </div>
                  <div className="col-md-4">
                    <h3>{product.title}</h3>
                    <p className="lead fw-bold">
                      {product.qty} X ${product.price} = ${" "}
                      {product.price * product.qty}
                    </p>
                  </div>
                  <button
                    className="btn btn-outline-dark me-4"
                    style={{ width: "5%", height: "5%" }}
                    onClick={() => delProduct(product)}
                  >
                    <i className="fa fa-minus"></i>
                  </button>
                  <button
                    className="btn btn-outline-dark me-4"
                    style={{ width: "5%", height: "5%" }}
                    onClick={() => addProduct(product)}
                  >
                    <i className="fa fa-plus"></i>
                  </button>
                </div>
              </div>
              <hr />
            </>
          );
        })}
      </>
    );
  };
  return (
    <div>
      <h1 className="display-6 fw-bolder text-center">Cart items</h1>
      <hr />

      <div className="row justify-content-center">
        {loading ? <Loading /> : <ShowProducts />} //loader
      </div>
    </div>
  );
}

export default Cart;
