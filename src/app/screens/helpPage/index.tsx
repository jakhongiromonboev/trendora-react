import React, { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import { useLocation, useHistory } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import AssignmentReturnOutlinedIcon from "@mui/icons-material/AssignmentReturnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

import { faq } from "../../../lib/data/faq";
import { terms } from "../../../lib/data/terms";
import { privacy } from "../../../lib/data/privacy";
import { shipping } from "../../../lib/data/shipping";

import "../../../css/help.css";

export default function Help() {
  const location = useLocation();
  const history = useHistory();

  const getTabFromUrl = () => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    switch (tab) {
      case "faq":
        return "1";
      case "terms":
        return "2";
      case "privacy":
        return "3";
      case "shipping":
        return "4";
      default:
        return "1";
    }
  };

  const [value, setValue] = useState(getTabFromUrl());

  /** SYNC TAB WITH URL **/
  useEffect(() => {
    setValue(getTabFromUrl());
  }, [location.search]);

  /** HANDLERS **/
  const handleChange = (e: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    const tabNames: { [key: string]: string } = {
      "1": "faq",
      "2": "terms",
      "3": "privacy",
      "4": "shipping",
    };
    history.push(`/help?tab=${tabNames[newValue]}`);
  };

  return (
    <div className="help">
      <Box className="help-hero">
        <h1 className="help-title">Help Center</h1>
        <p className="help-subtitle">How can we help you?</p>
      </Box>

      <Container className="help-container">
        {/* TABS */}
        <Box className="help-tabs">
          <Tabs
            value={value}
            onChange={handleChange}
            centered
            TabIndicatorProps={{
              style: { backgroundColor: "#000000", height: "2px" },
            }}
          >
            <Tab label="FAQ" value="1" />
            <Tab label="Terms" value="2" />
            <Tab label="Privacy" value="3" />
            <Tab label="Shipping" value="4" />
          </Tabs>
        </Box>

        <Box className="help-content">
          {/* FAQ TAB */}
          {value === "1" && (
            <Box className="faq-section">
              <h2 className="section-title">Frequently Asked Questions</h2>
              <Box className="faq-list">
                {faq?.map((item, index) => (
                  <Accordion key={index} className="faq-accordion">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      className="faq-question"
                    >
                      {item?.question}
                    </AccordionSummary>
                    <AccordionDetails className="faq-answer">
                      {item?.answer}
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            </Box>
          )}

          {/* TERMS TAB */}
          {value === "2" && (
            <Box className="terms-section">
              <h2 className="section-title">Terms & Conditions</h2>
              <Box className="terms-content">
                {terms?.map((item, index) => (
                  <Box key={index} className="terms-item">
                    <h3 className="terms-item-title">{item?.title}</h3>
                    <p className="terms-item-content">{item?.content}</p>
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {/* PRIVACY TAB */}
          {value === "3" && (
            <Box className="privacy-section">
              <h2 className="section-title">Privacy Policy</h2>
              <Box className="privacy-content">
                {privacy?.map((item, index) => (
                  <Box key={index} className="privacy-item">
                    <h3 className="privacy-item-title">{item?.title}</h3>
                    <p className="privacy-item-content">{item?.content}</p>
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {/* SHIPPING TAB */}
          {value === "4" && (
            <Box className="shipping-section">
              <h2 className="section-title">Shipping & Returns</h2>

              <Box className="shipping-block">
                <h3 className="block-title">
                  <LocalShippingOutlinedIcon />
                  Delivery Options
                </h3>
                <Box className="delivery-cards">
                  {shipping?.delivery?.map((item, index) => (
                    <Box key={index} className="delivery-card">
                      <Box className="delivery-title">{item?.title}</Box>
                      <Box className="delivery-price">{item?.price}</Box>
                      <Box className="delivery-time">{item?.time}</Box>
                      <Box className="delivery-note">{item?.note}</Box>
                    </Box>
                  ))}
                </Box>
              </Box>

              <Box className="shipping-block">
                <h3 className="block-title">
                  <AccessTimeOutlinedIcon />
                  Processing Time
                </h3>
                <p className="block-content">{shipping?.processing}</p>
              </Box>

              <Box className="shipping-block">
                <h3 className="block-title">
                  <AssignmentReturnOutlinedIcon />
                  Returns Policy
                </h3>
                <p className="block-content">
                  Free returns within{" "}
                  <strong>{shipping?.returns?.timeframe}</strong>
                </p>
                <ul className="returns-conditions">
                  {shipping?.returns?.conditions?.map((condition, index) => (
                    <li key={index}>{condition}</li>
                  ))}
                </ul>
              </Box>

              <Box className="shipping-block">
                <h3 className="block-title">How to Return</h3>
                <ol className="return-steps">
                  {shipping?.howToReturn?.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </Box>

              <Box className="shipping-block">
                <h3 className="block-title">Refunds</h3>
                <p className="block-content">{shipping?.refunds}</p>
              </Box>
            </Box>
          )}
        </Box>
      </Container>
    </div>
  );
}
