import React from "react";
import "./PageWrapper.css";
import { PageContextProvider } from "./usePageContext";
import { Link } from "./Link";

export { PageWrapper };

function PageWrapper({ pageContext, children }) {
  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <Sidebar>
          <div className="container col-sm-6 d-flex col align-items-center">
            <h4 className="me-auto">Numerical Analysis</h4>
            <div>
              <Link className="navitem" href="/">
                Home
              </Link>
              <Link className="navitem" href="/about">
                About
              </Link>
            </div>
          </div>
        </Sidebar>
        <Layout>
          <Content>{children}</Content>
        </Layout>
      </PageContextProvider>
    </React.StrictMode>
  );
}

function Layout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        maxWidth: 900,
        margin: "auto",
        flexDirection: "column",
      }}
    >
      {children}
    </div>
  );
}

function Sidebar({ children }) {
  return (
    <div
      style={{
        padding: 10,
        alignItems: "center",
        lineHeight: "1.8em",
        textAlign: "center",
        background: "#565652",
        color: "#e5e5e5",
      }}
    >
      {children}
    </div>
  );
}

function Content({ children }) {
  return (
    <div
      style={{
        padding: 20,
        paddingBottom: 50,
        minHeight: "100vh",
      }}
    >
      {children}
    </div>
  );
}

function Logo() {
  return (
    <div
      style={{
        marginTop: 20,
        marginBottom: 10,
      }}
    >
      <a href="/">
        <img src={logo} height={64} width={64} alt="logo" />
      </a>
    </div>
  );
}
