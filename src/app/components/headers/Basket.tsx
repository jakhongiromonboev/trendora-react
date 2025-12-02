import React from "react";
import { Box, Button, Stack, Drawer } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import { useHistory } from "react-router-dom";
import type { CartItem } from "../../../lib/types/search";
import { Messages, serverApi } from "../../../lib/config";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";
// import OrderService from "../../services/OrderService";

interface BasketProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
}

export default function Basket(props: BasketProps) {
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  const history = useHistory();
  const itemsPrice: number = cartItems.reduce(
    (a: number, c: CartItem) => a + c.quantity * c.price,
    0
  );
  const totalPrice = itemsPrice.toFixed(2);

  const [open, setOpen] = React.useState(false);

  /** HANDLERS **/

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const proceedOrderHandler = async () => {
    try {
      handleClose();
      if (!authMember) throw new Error(Messages.error2);

      //   const order = new OrderService();
      //   await order.createOrder(cartItems);

      onDeleteAll();

      setOrderBuilder(new Date());
      history.push("/orders");
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <>
      <Box className={"hover-line"}>
        <IconButton aria-label="cart" onClick={handleOpen}>
          <Badge badgeContent={cartItems.length} color="secondary">
            <ShoppingCartIcon sx={{ color: "#000000" }} />
          </Badge>
        </IconButton>
      </Box>

      <Drawer
        anchor="right"
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 480,
            backgroundColor: "#ffffff",
          },
        }}
      >
        <Stack className={"basket-drawer"}>
          {/* Header */}
          <Box className={"basket-drawer-header"}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ShoppingCartIcon sx={{ fontSize: 24 }} />
              <span className="basket-title">
                Shopping Cart ({cartItems.length})
              </span>
            </Box>
            <IconButton onClick={handleClose} sx={{ color: "#666666" }}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Products */}
          <Box className={"basket-drawer-content"}>
            {cartItems.length === 0 ? (
              <Box className="empty-basket">
                <ShoppingCartIcon
                  sx={{ fontSize: 64, color: "#cccccc", mb: 2 }}
                />
                <p>Your cart is empty</p>
              </Box>
            ) : (
              <Box className={"orders-wrapper"}>
                {cartItems.map((item: CartItem) => {
                  const imagePath = `${serverApi}/${item.image}`;
                  return (
                    <Box className={"basket-info-box"} key={item._id}>
                      <img
                        src={imagePath}
                        className={"product-img"}
                        alt="Product"
                      />
                      <Box className="product-details">
                        <span className={"product-name"}>{item.name}</span>
                        <p className={"product-price"}>
                          ${item.price} × {item.quantity}
                        </p>
                      </Box>
                      <Box className="product-actions">
                        <div className="col-2">
                          <button
                            onClick={() => onRemove(item)}
                            className="remove"
                          >
                            −
                          </button>
                          <span className="quantity">{item.quantity}</span>
                          <button onClick={() => onAdd(item)} className="add">
                            +
                          </button>
                        </div>
                        <IconButton
                          onClick={() => onDelete(item)}
                          sx={{
                            padding: 0.5,
                            "&:hover": {
                              color: "#d32f2f",
                              transform: "rotate(90deg)",
                              transition: "all 0.3s ease",
                            },
                          }}
                        >
                          <CancelIcon sx={{ fontSize: 20, color: "#999999" }} />
                        </IconButton>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            )}
          </Box>

          {/* Footer */}
          {cartItems.length !== 0 && (
            <Box className={"basket-drawer-footer"}>
              <Button
                onClick={() => onDeleteAll()}
                variant="text"
                startIcon={<DeleteForeverIcon />}
                sx={{
                  color: "#666666",
                  textTransform: "none",
                  "&:hover": {
                    color: "#d32f2f",
                    backgroundColor: "rgba(211, 47, 47, 0.04)",
                  },
                }}
              >
                Clear Cart
              </Button>
              <Box className="total-section">
                <span className="total-label">Total:</span>
                <span className="total-price">${totalPrice}</span>
              </Box>
              <Button
                onClick={proceedOrderHandler}
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "#000000",
                  color: "#ffffff",
                  textTransform: "none",
                  fontWeight: 600,
                  padding: "14px",
                  fontSize: "15px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  "&:hover": {
                    backgroundColor: "#1a1a1a",
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
                  },
                }}
              >
                Checkout • ${totalPrice}
              </Button>
            </Box>
          )}
        </Stack>
      </Drawer>
    </>
  );
}
