import React from "react";
import { render, fireEvent } from "react-testing-library";
import PageInput from "../src/PageInput";

describe("PageInput", () => {
    test("render", () => {
        const wrapper = render(<PageInput />);
        const input = wrapper.container.querySelector("input") as HTMLInputElement;
        expect(input.value).toBe("1");
    });

    test("input change value", () => {
        const wrapper = render(<PageInput pageCount={5} />);
        const input = wrapper.container.querySelector("input") as HTMLInputElement;

        // 输入下边界
        fireEvent.change(input, { target: { value: "1" } });
        expect(input.value).toBe("1");

        // 输入上边界
        fireEvent.change(input, { target: { value: "5" } });
        expect(input.value).toBe("5");

        // 输入无效字符
        fireEvent.change(input, { target: { value: "5as" } });
        expect(input.value).toBe("5");
    });

    test("if input invalid, will revert to the current on the onBlur event", () => {
        const wrapper = render(<PageInput current={3} pageCount={5} />);
        const input = wrapper.container.querySelector("input") as HTMLInputElement;

        fireEvent.change(input, { target: { value: "412" } });
        expect(input.value).toBe("412");

        fireEvent.blur(input);
        expect(input.value).toBe("3");
    });

    test("input enter to jump page", () => {
        const fn = jest.fn();
        const wrapper = render(<PageInput current={3} pageCount={5} onChange={fn} />);
        const input = wrapper.container.querySelector("input") as HTMLInputElement;

        fireEvent.keyUp(input, { keyCode: 13, target: { value: "4" } });
        expect(fn).toBeCalled();
        expect(fn.mock.calls[0][0]).toBe(4);
    });

    test("up/down arrow key", () => {
        const wrapper = render(<PageInput current={3} pageCount={5} />);
        const input = wrapper.container.querySelector("input") as HTMLInputElement;

        fireEvent.keyUp(input, { keyCode: 38, target: { value: "3" } });
        expect(input.value).toBe("4");

        fireEvent.keyUp(input, { keyCode: 38, target: { value: "4" } });
        expect(input.value).toBe("5");

        fireEvent.keyUp(input, { keyCode: 38, target: { value: "5" } });
        expect(input.value).toBe("5");

        fireEvent.keyUp(input, { keyCode: 40, target: { value: "5" } });
        expect(input.value).toBe("4");

        fireEvent.keyUp(input, { keyCode: 40, target: { value: "4" } });
        expect(input.value).toBe("3");

        fireEvent.keyUp(input, { keyCode: 40, target: { value: "2" } });
        expect(input.value).toBe("1");

        fireEvent.keyUp(input, { keyCode: 40, target: { value: "1" } });
        expect(input.value).toBe("1");
    });
});
