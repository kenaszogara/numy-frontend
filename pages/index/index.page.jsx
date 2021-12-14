import React from "react";

export { Page };
export { onBeforeRender };

function Page() {
  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="col-sm-9">
          <h4 className="fw-bolder">Hey there! 👋</h4>
          <p>
            This app provide a solver for Numerical Analysis. You can try these
            links that can help you understand how each method works, along with
            some data visualization for you to understand better.
          </p>
          <ul>
            <li>
              <a href="/secant">Secant Method</a>
            </li>
            <li>
              <a href="/newton">Newton's Method</a>
            </li>
            <li>
              <a href="/falsePosition">False Position Method</a>
            </li>
            <li>
              <a href="/bisection">Bisection Method</a>
            </li>
            <li>
              <a href="/fixedPosition">Fixed Position Method</a>
            </li>
            <li>
              <a href="/bracket">Bracket Method</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

function onBeforeRender() {
  const documentProps = {
    title: "Home",
    description: "Home Page",
  };
  return {
    pageContext: {
      documentProps,
    },
  };
}
