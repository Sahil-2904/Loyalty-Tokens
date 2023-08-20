import React from "react";
import {InfinitySpin} from "react-loader-spinner";
const Loader = () => {
    return(
        <div className="flex justify-center p-96 bg-white">
            <InfinitySpin width='200' color="blue"/>
        </div>
    )
}
export default Loader;
