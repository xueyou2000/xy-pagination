import React from "react";
import Pagination from "../src";
import { PageItemType } from "../src/interface";

function itemRender(current: number, type: PageItemType, originalElement: React.ReactNode) {
    if (type === "prev") {
        return <a>Previous</a>;
    }
    if (type === "next") {
        return <a>Next</a>;
    }
    return originalElement;
}

export default function() {
    return (
        <div>
            <Pagination total={51} itemRender={itemRender} />
        </div>
    );
}
