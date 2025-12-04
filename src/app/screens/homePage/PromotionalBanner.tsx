import React from "react";
import { Box } from "@mui/material";
import { useHistory } from "react-router-dom";

export default function PromotionalBanner() {
  const history = useHistory();

  const handleWomensClick = () => {
    history.push("/products?gender=FEMALE");
  };

  const handleMensClick = () => {
    history.push("/products?gender=MALE");
  };

  return (
    <div className="promotional-banner-frame">
      <Box className={"banner-container"}>
        {/* Women's Section */}
        <Box className={"banner-section women"} onClick={handleWomensClick}>
          <img
            src="/img/woman.jpg"
            alt="Women's Collection"
            className={"banner-image"}
          />
          <Box className={"banner-overlay"}>
            <Box className={"banner-content"}>
              <Box className={"banner-title"}>Women's Collection</Box>
              <Box className={"banner-subtitle"}>
                Discover the latest trends
              </Box>
              <button className={"banner-btn"}>Shop Women's</button>
            </Box>
          </Box>
        </Box>

        {/* Men's Section */}
        <Box className={"banner-section men"} onClick={handleMensClick}>
          <img
            src="/img/man4.jpg"
            alt="Men's Collection"
            className={"banner-image"}
          />
          <Box className={"banner-overlay"}>
            <Box className={"banner-content"}>
              <Box className={"banner-title"}>Men's Collection</Box>
              <Box className={"banner-subtitle"}>Elevate your wardrobe</Box>
              <button className={"banner-btn"}>Shop Men's</button>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
