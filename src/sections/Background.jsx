import React from "react";
import Vendor from '../assets/background.jpeg'


export default function Background(){
    return (<>
    <body className="fixed top-0 z-0 w-full h-screen "
          style={{
            background : `url(${Vendor})`,
            backgroundSize : "cover",
            backgroundPosition : "center"
            }}>
    </body>
    </>)
}
