import classNames from "classnames";
import clamp from "lodash-es/clamp";
import React, { useEffect } from "react";
import { useControll } from "utils-hooks";
import { Option, Select } from "xy-select";
import "xy-select/assets/index.css";
import { PaginationProps, SimplePageProps } from "./interface";
import { getLocal } from "./local";
import PageInput from "./PageInput";
import Pager from "./Pager";
import SimplePage from "./SimplePage";

const DefaultPageSizeOptions = [10, 20, 30, 40, 50];

export function Pagination(props: PaginationProps) {
    const { prefixCls = "xy-pagination", className, style, pageSizeOptions = DefaultPageSizeOptions, total = 0, showQuickJumper = false, showSizeChanger = false, simple = false, itemRender, onChange, onPageSizeChange } = props;
    const [current, setCurrent, isControll] = useControll<number>(props, "current", "defaultCurrent", 1);
    const [pageSize, setPageSize, isPageSizeControll] = useControll<number>(props, "pageSize", "defaultPageSize", 10);
    const pageProps: SimplePageProps = { current, pageCount: getPageCount(), onChange: changeCurrent };

    function changeCurrent(num: number) {
        const pageNum = clamp(num, 1, total);

        if (!isControll) {
            setCurrent(pageNum);
        }

        if (onChange) {
            onChange(pageNum, pageSize);
        }
    }

    function changePageSize(size: number) {
        if (!isPageSizeControll) {
            setPageSize(size);
        }

        if (onPageSizeChange) {
            onPageSizeChange(size);
        }
    }

    function getPageCount() {
        return Math.ceil(total / pageSize);
    }

    useEffect(() => {
        const pageCount = getPageCount();
        if (current > getPageCount() && pageCount !== 0) {
            changeCurrent(getPageCount());
        }
    }, [pageSize]);

    function renderPager() {
        return (
            <React.Fragment>
                <Pager {...pageProps} itemRender={itemRender} />
                {showSizeChanger && (
                    <Select className={`${prefixCls}-select`} value={pageSize} onChange={changePageSize}>
                        {pageSizeOptions.map((x) => (
                            <Option key={x} value={x} label={`${x} ${getLocal().Pagination.pageNum}`}>
                                {x} ${getLocal().Pagination.pageNum}
                            </Option>
                        ))}
                    </Select>
                )}
                {showQuickJumper && (
                    <span className={`${prefixCls}-jump`}>
                        {getLocal().Pagination.jump}
                        <PageInput {...pageProps} />
                        {getLocal().Pagination.page}
                    </span>
                )}
            </React.Fragment>
        );
    }

    return (
        <div className={classNames(prefixCls, className)} style={style}>
            {simple ? <SimplePage {...pageProps} /> : renderPager()}
        </div>
    );
}

export default React.memo(Pagination);
