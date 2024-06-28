import React from "react";

// styles
import "./styles/index.css";

// layouts
import MainLayout from "./layouts/MainLayout";

// pages
import AccountsListPage from "./pages/AccountListPage";

const App = () => {
  return (
    <MainLayout>
      <AccountsListPage />
    </MainLayout>
  );
};

export default App;
