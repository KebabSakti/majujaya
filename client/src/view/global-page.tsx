import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./component/nav-bar";
import { CounterContext } from "./provider";
import DBC from "./component/dbc";

export default function GlobalPage() {
  const [counter, setCounter] = useState(0);

  return (
    <>
      <CounterContext.Provider value={{ counter, setCounter }}>
        <NavBar />
        <Outlet />
        <DBC />
      </CounterContext.Provider>
    </>
  );
}
