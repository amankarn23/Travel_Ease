import React, { useEffect, useRef, useState } from "react";
import SearchPageLocationInputContainer from "../SearchContentComponent/SearchPageLocationInputContainer";
import { useFlightBookingDetailsContext } from "../../provider/FlightBookingDetailsProvider";
import SearchPageCalendarInputContainer from "../SearchContentComponent/SearchPageCalendarInputContainer";
import getFlightList from "../../utils/getFlightList";
import { useFlightListContext } from "../../provider/FlightListProvider";
import getAirportShortName from "../../utils/airportNames";
import FlightTravellerModal from "../../Modals/FlightTravellerModal";
import { createPortal } from "react-dom";

function SearchPageHeaderForFlight({
  flightSourceRef,
  flightDestinationRef,
  setLoading,
}) {
  const { flightBookingState, dispatchFlightBookingState } =
    useFlightBookingDetailsContext();
  const { setFlightList } = useFlightListContext();
  const [portal, setPortal] = useState(false);
  const [showPortal, setShowPortal] = useState(false);
  const portalRef = useRef();
  function handlePortalOnResize() {
    if (window.innerWidth <= 1025) {
      setPortal(true);
    } else {
      setPortal(false);
      setShowPortal(false);
    }
  }
  useEffect(() => {
    getFlightList(
      getAirportShortName(flightBookingState.fromCity),
      getAirportShortName(flightBookingState.toCity),
      flightBookingState.travelDate.day.substring(0, 3),
      setFlightList,
      setLoading
    );
    window.addEventListener("resize", handlePortalOnResize);
    if (window.innerWidth <= 1025) {
      setPortal(true);
    }
    return () => {
      window.removeEventListener("resize", handlePortalOnResize);
    };
  }, []);
  return (
    <>
      <div className="searchPage-header-container">
        {!portal ? (
          <div className="makeFlex">
            <section className="searchPage-booking-details-container">
              <SearchPageLocationInputContainer
                key={0}
                inputId={"fromCity"}
                spanHeading={"From"}
                value={flightBookingState.fromCity}
                dispatch={dispatchFlightBookingState}
                type={"flightFromCity"}
                modal={"flight"}
              ></SearchPageLocationInputContainer>
              <div
                onClick={() => {
                  dispatchFlightBookingState({ type: "swap" });
                }}
              >
                <div className="swap-icon"></div>
              </div>
              <SearchPageLocationInputContainer
                key={1}
                inputId={"toCity"}
                spanHeading={"To"}
                value={flightBookingState.toCity}
                dispatch={dispatchFlightBookingState}
                type={"flightToCity"}
                modal={"flight"}
              />
              <SearchPageCalendarInputContainer
                labelFor={"travelDate"}
                spanHeading={"Depart"}
                value={flightBookingState.travelDate}
                dispatch={dispatchFlightBookingState}
                type={"flightTravelDate"}
              />
              <SearchPageTravellerInput
                value={flightBookingState}
                dispatch={dispatchFlightBookingState}
              />
            </section>
            <section>
              <p className="makeFlex make-justify-center">
                <button
                  onClick={() => {
                    const source = getAirportShortName(
                      flightBookingState.fromCity
                    );
                    const destination = getAirportShortName(
                      flightBookingState.toCity
                    );
                    setLoading(true);
                    getFlightList(
                      source,
                      destination,
                      flightBookingState.travelDate.day.substring(0, 3),
                      setFlightList,
                      setLoading
                    );
                    flightSourceRef.current = flightBookingState.fromCity;
                    flightDestinationRef.current = flightBookingState.toCity;
                  }}
                  className="primaryBtn widgetSearchBtn bold-text"
                >
                  SEARCH
                </button>
              </p>
            </section>
          </div>
        ) : (
          <div ref={portalRef} className="responsive-search-bar">
            <div>
              <p>
                {flightBookingState.fromCity} - {flightBookingState.toCity}
              </p>
              <p>
                {flightBookingState.travelDate.date}{" "}
                {flightBookingState.travelDate.month} |{" "}
                {flightBookingState.travellers.adults +
                  flightBookingState.travellers.children +
                  flightBookingState.travellers.infant}{" "}
                Traveller(s) | {flightBookingState.ticketClass}
              </p>
            </div>
            <div
              onClick={() => {
                setShowPortal(true);
              }}
            >
              <img
                src="https://imgak.mmtcdn.com/flights/assets/media/mobile/common/xhdpi/edit_icon.png"
                alt=""
              />
              <span>Edit</span>
            </div>
          </div>
        )}
        {showPortal && (
          <SearchPortal
            portalRef={portalRef}
            setShowPortal={setShowPortal}
            setLoading={setLoading}
            flightSourceRef={flightSourceRef}
            flightDestinationRef={flightDestinationRef}
          />
        )}
      </div>
    </>
  );
}

export default SearchPageHeaderForFlight;

function SearchPageTravellerInput({ value, dispatch }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setShowModal((n) => !n);
      }}
      className="searchPage-booking-input"
    >
      <label htmlFor="class" className="searchPage-booking-inputBox">
        <span className="dropdown">PASSENGERS & CLASS</span>
        <div>
          <span>
            {value.travellers.adults +
              value.travellers.children +
              value.travellers.infant}
            {" Traveller, "}
          </span>
          <span>{value.ticketClass}</span>
        </div>
      </label>
      {showModal && (
        <FlightTravellerModal
          setShowModal={setShowModal}
          value={value}
          dispatch={dispatch}
          search={true}
        />
      )}
    </div>
  );
}

function SearchPortal({
  portalRef,
  setShowPortal,
  flightSourceRef,
  flightDestinationRef,
  setLoading,
}) {
  const { flightBookingState, dispatchFlightBookingState } =
    useFlightBookingDetailsContext();
  const { setFlightList } = useFlightListContext();

  const myElementRef = useRef();

  function handlePortal(e) {
    if (
      !portalRef.current?.contains(e.target) &&
      !myElementRef.current?.contains(e.target) &&
      !e.target.classList.contains("airports")
    ) {
      setShowPortal(false);
    }
  }
  useEffect(() => {
    document.body.addEventListener("click", handlePortal);
    return () => {
      document.body.removeEventListener("click", handlePortal);
    };
  }, []);
  return (
    <>
      {createPortal(
        <div
          style={{
            position: "fixed",
            zIndex: "1000",
            width: "100vw",
            height: "100vh",
            backdropFilter: "blur(5px)",
            left: "0",
            top: "0",
          }}
        >
          <div ref={myElementRef} className="search-bar-portal-flight">
            <section className="searchPage-booking-details-container">
              <SearchPageLocationInputContainer
                key={0}
                inputId={"fromCity"}
                spanHeading={"From"}
                value={flightBookingState.fromCity}
                dispatch={dispatchFlightBookingState}
                type={"flightFromCity"}
                modal={"flight"}
              ></SearchPageLocationInputContainer>
              <div
                onClick={() => {
                  dispatchFlightBookingState({ type: "swap" });
                }}
              >
                <div className="swap-icon"></div>
              </div>
              <SearchPageLocationInputContainer
                key={1}
                inputId={"toCity"}
                spanHeading={"To"}
                value={flightBookingState.toCity}
                dispatch={dispatchFlightBookingState}
                type={"flightToCity"}
                modal={"flight"}
              />
              <SearchPageCalendarInputContainer
                labelFor={"travelDate"}
                spanHeading={"Depart"}
                value={flightBookingState.travelDate}
                dispatch={dispatchFlightBookingState}
                type={"flightTravelDate"}
              />
              <SearchPageTravellerInput
                value={flightBookingState}
                dispatch={dispatchFlightBookingState}
              />
            </section>
            <section>
              <p className="makeFlex make-justify-center">
                <button
                  onClick={() => {
                    const source = getAirportShortName(
                      flightBookingState.fromCity
                    );
                    const destination = getAirportShortName(
                      flightBookingState.toCity
                    );
                    setShowPortal(false);
                    setLoading(true);
                    getFlightList(
                      source,
                      destination,
                      flightBookingState.travelDate.day.substring(0, 3),
                      setFlightList,
                      setLoading
                    );
                    flightSourceRef.current = flightBookingState.fromCity;
                    flightDestinationRef.current = flightBookingState.toCity;
                  }}
                  className="primaryBtn widgetSearchBtn bold-text"
                >
                  SEARCH
                </button>
              </p>
            </section>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
