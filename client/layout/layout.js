import React, { useEffect } from "react";
import Footer from "../components/footer";
import { useRouter } from "next/router";


function Layout(props) {
  const router = useRouter();
  // if (typeof window !== "undefined" && window.localStorage) {
  //   if (!localStorage.token) {
  //     router.push("/");
  //   }
  // }
  // useEffect(() => {
  //   if (!localStorage.token) {
  //     router.push("/");
  //   }
    
  // });
  return (
    <div>
      {props.children}
      <Footer />
    </div>
  );
}

export default Layout;
