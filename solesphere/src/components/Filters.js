import React, { useState } from "react";
import { Checkbox, Radio } from "antd";
const Filters = (props ) => {
  const [view, setView] = useState(false);
  const [showMore, setShowMore] = useState(false);
  return (
    <div>
      <h4 className="text-center mt-4">
        <button
          onClick={() => {
            setView(!view);
          }}
        >
          {props.desc}
        </button>
      </h4>
      {(
        <div className={`flex flex-col ms-4 dropdown_mobile_filter ${view?'open':""} `}>
          {props.category.map(
            (c, i) =>
              // Check if index is less than 5 or showMore is true
              (i < 5 || showMore) && (
                <Checkbox
                  key={c._id}
                  onChange={(e) => {
                    props.handleFilter(e.target.checked, c._id);
                  }}
                >
                  {c.name}
                </Checkbox>
              )
          )}

          {props.category.length > 5 && !showMore && (
            <button className="text-red-500 self-end" onClick={() => setShowMore(true)}>
              Show more
            </button>
          )}
          {props.category.length > 5 && showMore && (
            <button className="text-red-500 self-end" onClick={() => setShowMore(false)}>
              Show less
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Filters;
