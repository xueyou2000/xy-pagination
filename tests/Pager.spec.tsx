import React from "react";
import { fireEvent, render } from "react-testing-library";
import Pager from "../src/Pager";

describe("Pager", () => {
    test("render", () => {
        let current = 1;
        const fn = jest.fn((page: number) => (current = page));
        const wrapper = render(<Pager current={current} pageCount={5} onChange={fn} />);
        const items = wrapper.container.querySelectorAll(".xy-page-item") as NodeListOf<HTMLElement>;

        expect([].map.call(items, (x: HTMLElement) => x.textContent)).toEqual(["1", "2", "3", "4", "5"]);

        fireEvent.click(items[0]);
        wrapper.rerender(<Pager current={current} pageCount={5} onChange={fn} />);
        expect(items[0].classList.contains("xy-page-active")).toBeTruthy();
        expect(fn.mock.calls[0][0]).toBe(1);

        fireEvent.click(items[1]);
        wrapper.rerender(<Pager current={current} pageCount={5} onChange={fn} />);
        expect(items[1].classList.contains("xy-page-active")).toBeTruthy();
        expect(fn.mock.calls[1][0]).toBe(2);

        fireEvent.click(items[2]);
        wrapper.rerender(<Pager current={current} pageCount={5} onChange={fn} />);
        expect(items[2].classList.contains("xy-page-active")).toBeTruthy();
        expect(fn.mock.calls[2][0]).toBe(3);

        fireEvent.click(items[3]);
        wrapper.rerender(<Pager current={current} pageCount={5} onChange={fn} />);
        expect(items[3].classList.contains("xy-page-active")).toBeTruthy();
        expect(fn.mock.calls[3][0]).toBe(4);

        fireEvent.click(items[4]);
        wrapper.rerender(<Pager current={current} pageCount={5} onChange={fn} />);
        expect(items[4].classList.contains("xy-page-active")).toBeTruthy();
        expect(fn.mock.calls[4][0]).toBe(5);
    });

    test("when pageCount less 0, show one btn", () => {
        const fn = jest.fn();
        const wrapper = render(<Pager onChange={fn} />);
        const items = wrapper.container.querySelectorAll(".xy-page-item") as NodeListOf<HTMLElement>;
        const first = items[0];
        expect([].map.call(items, (x: HTMLElement) => x.textContent)).toEqual(["1"]);
        expect(first.classList.contains("xy-page-active")).toBeTruthy();

        fireEvent.click(first);
        expect(fn.mock.calls.length).toBe(1);

        const prevBtn = wrapper.container.querySelector(".xy-page-prev");
        fireEvent.click(prevBtn);
        expect(fn.mock.calls.length).toBe(2);

        const nextBtn = wrapper.container.querySelector(".xy-page-prev");
        fireEvent.click(nextBtn);
        expect(fn.mock.calls.length).toBe(3);
    });

    test("prev btn", () => {
        let current = 2;
        const fn = jest.fn((page: number) => (current = page));
        const wrapper = render(<Pager current={current} pageCount={5} onChange={fn} />);
        const prevBtn = wrapper.container.querySelector(".xy-page-prev");

        fireEvent.click(prevBtn);
        wrapper.rerender(<Pager current={current} pageCount={5} onChange={fn} />);
        expect(prevBtn.classList.contains("xy-page-disabled")).toBeTruthy();
        expect(current).toBe(1);
    });

    test("next btn", () => {
        let current = 4;
        const fn = jest.fn((page: number) => (current = page));
        const wrapper = render(<Pager current={current} pageCount={5} onChange={fn} />);
        const nextBtn = wrapper.container.querySelector(".xy-page-next");

        fireEvent.click(nextBtn);
        wrapper.rerender(<Pager current={current} pageCount={5} onChange={fn} />);
        expect(nextBtn.classList.contains("xy-page-disabled")).toBeTruthy();
        expect(current).toBe(5);
    });

    test("show ellipsis", () => {
        let current = 1;
        const fn = jest.fn((page: number) => (current = page));
        const wrapper = render(<Pager current={current} pageCount={15} onChange={fn} />);

        fireEvent.click(wrapper.getByTitle("向后5页"));
        wrapper.rerender(<Pager current={current} pageCount={15} onChange={fn} />);
        expect(current).toBe(6);

        fireEvent.click(wrapper.getByTitle("向前5页"));
        wrapper.rerender(<Pager current={current} pageCount={15} onChange={fn} />);
        expect(current).toBe(1);
    });
});
