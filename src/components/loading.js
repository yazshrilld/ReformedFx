import React from "react";

const Loader = (props) => {
  return (
    <div
      style={{
        width: "100%",
        height: "150%",
        background: "rgba(0,0,0,.5)",
        position: "absolute",
        zIndex: "9999999",
        overflowY: "hidden",
        overflowX: "hidden",
        top: 0,
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        left: 0,
        right: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <svg width="80px" viewBox="0 0 30 25" version="1.1" className="mx-auto">
          <g
            id="Progiving-final-design"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
          >
            <g
              id="iPhone-8-Plus"
              transform="translate(-227.000000, -73.000000)"
              fill="#F5A623"
              fillRule="nonzero"
            >
              <g id="Group-7" transform="translate(227.000000, 73.000000)">
                <g id="Group">
                  <polygon
                    className="l1"
                    points="8.55614973 4.08562073e-14 22.4741533 4.08562073e-14 24.2994652 3.40909091 6.73083779 3.40909091"
                  ></polygon>
                  <polygon
                    className="l2"
                    points="5.81818182 4.77272727 25.2121212 4.77272727 27.0374332 8.18181818 3.99286988 8.18181818"
                  ></polygon>
                  <polygon
                    className="l3"
                    points="3.53654189 9.54545455 27.9500891 9.54545455 29.0909091 11.1363636 27.9500891 12.9545455 5.13368984 12.9545455 3.76470588 15.4545455 4.13891144e-13 15.4545455"
                  ></polygon>
                  <polygon
                    className="l4"
                    points="6.04634581 14.3181818 27.0374332 14.3181818 25.2121212 17.7272727 7.87165775 17.7272727 6.5026738 20.2272727 2.50980392 20.2272727"
                  ></polygon>
                  <polygon
                    className="l5"
                    points="8.78431373 19.0909091 24.2994652 19.0909091 22.4741533 22.5 10.6096257 22.5 9.24064171 25 5.24777184 25"
                  ></polygon>
                </g>
              </g>
            </g>
          </g>
        </svg>
        <p className="mx-auto text-white mt-1 font-weight-bold">{props.text}</p>
      </div>
    </div>
  );
};

export default Loader;
