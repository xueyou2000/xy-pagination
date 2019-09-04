import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Pagination from "../src";

describe("Pagination", () => {
    test("render", () => {
        const wrapper = render(<Pagination total={50} />);
        const items = wrapper.container.querySelectorAll(".xy-page-item") as NodeListOf<HTMLElement>;
        expect([].map.call(items, (x: HTMLElement) => x.textContent)).toEqual(["1", "2", "3", "4", "5"]);
    });

    test("size change", () => {
        const fn = jest.fn();
        const currentChange = jest.fn();
        const wrapper = render(<Pagination defaultCurrent={5} onChange={currentChange} total={50} pageSize={30} onPageSizeChange={fn} />);

        expect(currentChange.mock.calls[0][0]).toBe(2);
        const items = wrapper.container.querySelectorAll(".xy-page-item") as NodeListOf<HTMLElement>;
        expect([].map.call(items, (x: HTMLElement) => x.textContent)).toEqual(["1", "2"]);
    });
});
