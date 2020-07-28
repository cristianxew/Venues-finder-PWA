import React from "react";

import { ReactComponent as Svg } from "../img/empty.svg";

import "./venues.styles.scss";

const Venue = (props) => {
  if (props.venues.length === 0) {
    return (
      <React.Fragment>
        <h3 className="if-empty">Sorry, there is nothing here yet</h3>
        <Svg className="empty-img" />
      </React.Fragment>
    );
  } else {
    const places = props.venues.map((venue) => {
      return (
        <div key={venue.id} className="venue-container">
          <h4 className="venue-title">{venue.name}</h4>
          <img
            className="venue-img"
            alt=""
            src={
              venue === {} ? "" : `${venue.categories[0].icon.prefix}bg_64.png`
            }
          />
          <a
            className="venue-address"
            href={`https://www.google.com/maps/search/?api=1&query=${venue.location.lat},${venue.location.lng}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            {venue.location.address ? (
              <p>{venue.location.address}</p>
            ) : (
              <i className="fas fa-search-location"></i>
            )}
          </a>
          <p className="venue-info">{venue.categories[0].name}</p>
        </div>
      );
    });
    return places;
  }
};

export default Venue;
