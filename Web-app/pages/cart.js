import { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { MdOutlineCancel } from "react-icons/md";
import Navbar from "../components/Navbar/Navbar";
import styles from "../styles/cart.module.css";
import { useSelector, useDispatch } from "react-redux";
import { removeProduct, changeQty, reset } from "../Redux/cartSlice";
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
  HStack,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";
import Swal from "sweetalert2";

const Cart = () => {
  // =============== internal State Managment =============================
  const [total, setTotal] = useState();
  const [qty, setQty] = useState();
  const [payment, setPayment] = useState(false);
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [singleProduct, setSingleProduct] = useState();

  // ===========================================================

  // ==============  To bring out the stripe and paypal image on payment click ===================================
  const payClick = () => {
    setPayment(!payment);
  };

  // ========================================================================

  // =========================== To make false Payment and reset the state in redux ====================
  const finalPayment = () => {
    dispatch(reset());
    onClose();
    Swal.fire("Created", "Payment successful", "success");
  };

  // =====================================================================

  const numberWithCommas = (x) => {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const size = Object.keys(cart).length;

  const PF = "http://127.0.0.1:8000/";

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.amount) * curr.qty, 0)
    );
    setQty(cart.reduce((acc, curr) => acc + Number(curr.qty), 0));
  }, [cart]);
  return (
    <section className={styles.container}>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <h2 className={styles.modelTitle}>
            {singleProduct ? singleProduct.name : null}
          </h2>
          <ModalCloseButton />
          <ModalBody>
            <h3 className={styles.paymentHead}>Enter Payment Details</h3>
            <form className={styles.form}>
              <div>
                <h3>Account Name</h3>
                <input type="text" />
              </div>
              <h3>Pin</h3>
              <HStack>
                <PinInput>
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </HStack>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                finalPayment();
              }}
            >
              Pay
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Navbar cat={true} />
      <div className={styles.cartContainer}>
        <div className={styles.productInfo}>
          <TableContainer>
            <Table variant="simple">
              <TableCaption>Shopping Details</TableCaption>
              <Thead>
                <Tr>
                  <Th>Image</Th>
                  <Th>Amount</Th>
                  <Th>Quantity</Th>
                  <Th>Total</Th>
                  <Th>Remove</Th>
                </Tr>
              </Thead>

              {cart.map((c) => (
                <Tbody key={c.id}>
                  <Tr>
                    <Td>
                      <img src={PF + c.image} alt={cart.name} />
                    </Td>
                    <Td> &#8358;{numberWithCommas(c.amount)}</Td>
                    <Td>
                      <select
                        name={c.quantity}
                        id={c.quantity}
                        value={c.qty}
                        className={styles.select}
                        onChange={(e) => {
                          dispatch(
                            changeQty({ id: c.id, qty: e.target.value })
                          );
                        }}
                      >
                        {[...Array(c.quantity).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </Td>
                    <Td>&#8358;{numberWithCommas(c.amount * c.qty)}</Td>
                    <Td>
                      <button
                        className={styles.remove}
                        onClick={() => dispatch(removeProduct(c))}
                      >
                        <MdOutlineCancel size={35} />
                      </button>
                    </Td>
                  </Tr>
                </Tbody>
              ))}
            </Table>
          </TableContainer>
        </div>
        <div className={styles.cart}>
          <h3>Product Summary</h3>
          <hr />
          <br />
          <h4>
            Total Product : <span>{size}</span>
          </h4>
          <h4>
            Total Quantity: <span>{qty}</span>
          </h4>
          <h4>
            Discount: <span>0</span>
          </h4>
          <h4>
            Total price : <span>&#8358; {numberWithCommas(total)}</span>
          </h4>
          {size > 0 ? (
            <>
              <button onClick={() => payClick()}>Pay</button>
              {payment ? (
                <>
                  <div className={styles.payment}>
                    <img
                      src="Stripe.png"
                      alt="stripe"
                      onClick={() => onOpen()}
                    />
                    <img
                      src="Paypal.png"
                      alt="paypal"
                      onClick={() => onOpen()}
                    />
                  </div>
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <>
              <button className={styles.empty}> Cart is Empty</button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Cart;
