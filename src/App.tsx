import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Dashboard } from "./view/Dashboard";
import SidebarWithHeader from "./components/Sidebar";

function App() {
  return (
    <ChakraProvider>
      <SidebarWithHeader>
        <Dashboard />
      </SidebarWithHeader>
    </ChakraProvider>
  );
}

export default App;
