import React, { useState } from "react";
import Pagination from "../src";

export default function() {
    const [index, setIndex] = useState(1);

    function handleChaneg(page: number) {
        console.log("change page", page);
        setIndex(page);
    }

    return (
        <div>
            <Pagination current={index} total={51} onChange={handleChaneg} />
        </div>
    );
}
