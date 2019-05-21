import clamp from "lodash-es/clamp";
import React, { useEffect, useState } from "react";
import { SimplePageProps } from "./interface";

function PageInput(props: SimplePageProps) {
    const { current = 1, pageCount = 1, onChange } = props;
    const isControll = "current" in props;
    const [currentInputValue, setCurrentInputValue] = useState(current + "");

    // 受控时候由外部更新输入框的值
    useEffect(() => {
        if (isControll) {
            setCurrentInputValue(props.current + "");
        }
    }, [isControll ? props.current : 1]);

    function isValid(page: string | number) {
        const num = parseInt(page + "");
        return !isNaN(num) && num >= 1 && num <= pageCount;
    }

    function jump(page: number) {
        if (isNaN(page)) {
            return;
        }
        const num = clamp(page, 1, pageCount);
        if (onChange) {
            onChange(num);
        }
    }

    function keyDownHandle(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.keyCode === 38 || e.keyCode === 40) {
            e.preventDefault();
        }
    }

    function keyUpHandle(e: any) {
        const inputValue = (e.target as any).value;
        let value = inputValue;
        if (isNaN(Number(inputValue))) {
            value = currentInputValue;
        }

        let page = Number(value);
        switch (e.keyCode) {
            // Enter
            case 13:
                jump(page);
                break;
            // Up
            case 38:
                if (page + 1 <= pageCount) {
                    value = page += 1;
                }
                break;
            // Down
            case 40:
                if (page - 1 >= 1) {
                    value = page -= 1;
                }
                break;
        }

        setCurrentInputValue(value);
    }

    function blurHandle(e: React.FocusEvent<HTMLInputElement>) {
        const val = e.target.value;
        if (!isValid(val)) {
            setCurrentInputValue(current + "");
        }
    }

    return <input type="text" value={currentInputValue} onChange={keyUpHandle} onKeyDown={keyDownHandle} onKeyUp={keyUpHandle} onBlur={blurHandle} />;
}

export default React.memo(PageInput);
