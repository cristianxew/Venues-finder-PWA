import React from "react";

import "./options.styles.scss";

const Options = (props) => {
  const categories = [
    "topPicks",
    "food",
    "drinks",
    "coffee",
    "shops",
    "arts",
    "outdoors",
    "sights",
  ];

  return (
    <div className="Option-container">
      <h2 ref={props.element} className="categories">
        --Choose a Category--
      </h2>
      <ul className="list-categories">
        {categories.map((category) => {
          return (
            <li key={category}>
              <button
                className={`option-bottom ${
                  category === props.category ? "active" : ""
                }`}
                value={category}
                onClick={props.handler}
              >
                {category}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Options;
