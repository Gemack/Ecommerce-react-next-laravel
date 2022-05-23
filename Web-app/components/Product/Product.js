import { useState } from "react";
import styles from "./Product.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProduct } from "../../Redux/cartSlice";
import { BsFillCartCheckFill, BsFillCartXFill } from "react-icons/bs";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
const Product = ({ data, head }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [singleProduct, setSingleProduct] = useState();
  const PF = "http://127.0.0.1:8000/";
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const single = (x) => {
    return x;
  };

  const model = (d) => {
    onOpen();
    setSingleProduct(single(d));
  };

  console.log(singleProduct);

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <h2 className={styles.modelTitle}>
            {singleProduct ? singleProduct.name : null}
          </h2>
          <ModalCloseButton />
          <ModalBody>
            <img src={singleProduct ? PF + singleProduct.image : null} />
            <p className={styles.desc}>
              {singleProduct ? singleProduct.description : null}
            </p>
            <hr />
            <div className={styles.info}>
              <span className={styles.price}>
                Amount &#8358;{" "}
                {singleProduct ? numberWithCommas(singleProduct.amount) : null}
              </span>
              <span className={styles.quantity}>
                Quantity Available{" "}
                {singleProduct ? singleProduct.quantity : null}
              </span>
            </div>
            <hr />
            <div className={styles.cart}>
              {singleProduct ? (
                cart.products.some((c) => c.id === singleProduct.id) ? (
                  <>
                    <button disabled className={styles.disabled}>
                      <BsFillCartCheckFill size={45} color="lime" />
                    </button>
                    <button
                      onClick={() => dispatch(removeProduct(singleProduct))}
                    >
                      <BsFillCartXFill size={45} color="red" />
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => dispatch(addProduct(singleProduct))}>
                      <BsFillCartCheckFill size={45} color="lime" />
                    </button>
                    <button disabled className={styles.disabled}>
                      <BsFillCartXFill size={45} color="red" />
                    </button>
                  </>
                )
              ) : null}
            </div>
            <hr />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <div className={styles.container}>
        <h1>{head}</h1>
        <div className={styles.ProductContainer}>
          {data.map((d) => (
            <div className={styles.ProductCard} key={d.id}>
              <div className={styles.ProductCardImg}>
                <img src={PF + d.image} />
              </div>
              <hr />
              <h3>{d.name}</h3>
              <hr />
              <hr />
              <div className={styles.cart}>
                <button className={styles.shop} onClick={() => model(d)}>
                  shop
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Product;
