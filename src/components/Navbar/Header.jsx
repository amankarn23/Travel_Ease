import React from "react";
// import allLogo from './assets/images/allLogos.png'
import mmtLogo from "../../assets/images/mmtLogoWhite.png";
import Profile from "../Profile";
import LoginModalProvider, {
  useLoginModalContext,
} from "../../provider/LoginModalProvider";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../provider/AuthProvider";

function Header() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { setIsLoginModalVisible } = useLoginModalContext();
  function handleNavigate() {
    if (isLoggedIn) {
      navigate("/mytrips");
    } else {
      setIsLoginModalVisible(true);
    }
  }
  return (
    <div className="makeFlex make-justify-center">
      <div className="responsive-header makeFlex make-align-center make-justify-space gap-140 padding-t-5 padding-b-50">
        <div style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          <img className="mainLogo" src={mmtLogo} />
        </div>
        <div>
          <ul className="header-userLists makeFlex">
            <li
              style={{ cursor: "not-allowed" }}
              key={0}
              className="header-userList-item makeFlex makeCenter"
            >
              <span className="headerOfferIcon-container">
                <span className="headerOfferIcon-text">%</span>
                <span className="headerOfferIcon-logo chSprite"></span>
              </span>
              <div>
                <p className="font12 whiteText strongBold-text">Super Offers</p>
                <p className="font10 margin-y-3 grayText ">
                  Explore great deals & offers
                </p>
              </div>
            </li>
            <li
              style={{ cursor: "not-allowed" }}
              key={1}
              className="header-userList-item makeFlex makeCenter"
            >
              <span className="myBizIcon landingSprite"></span>
              <div className="margin-r-5">
                <p className="font16 whiteText bold-text">Introducing myBiz</p>
                <p className="font10 margin-y-3 whiteText">
                  Bussiness Travel Solution
                </p>
              </div>
            </li>
            {/* Protected Route */}
            <li
              onClick={handleNavigate}
              key={2}
              className="header-userList-item makeFlex makeCenter"
            >
              <span className="myTripIcon landingSprite"></span>
              <div className="margin-r-5">
                <p className="font12 whiteText bold-text">My Trips</p>
                <p className="font10 margin-y-3 grayText">
                  Manage your bookings
                </p>
              </div>
            </li>
            <Profile key={3} />
            <li
              key={4}
              className="header-userList-item makeFlex make-align-center geoSwitcher"
            >
              <div>
                <div className="whiteText makeFlex makeCenter langSlct">
                  <span className="flags flagSprite margin-r-5 ind"></span>
                  <span className="bold-text capText font12">
                    <span>IN</span>
                    {" |"}
                    <span> eng</span>
                    {" |"}
                    <span> inr</span>
                  </span>
                  <span className="switcherDownArrow margin-l-10"></span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
