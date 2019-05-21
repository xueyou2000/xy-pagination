import React from "react";
import Pagination from "../src";

export default function() {
    return (
        <div>
            <Pagination total={500} showSizeChanger={true} />
        </div>
    );
}
