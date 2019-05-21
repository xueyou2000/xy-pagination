import { faAngleDoubleLeft, faAngleDoubleRight, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React from "react";
import { PageItemType, PagerProps } from "./interface";
import clamp from "lodash-es/clamp";

// 大于等于多少页时显示省略符号
const MaxEllipsisNumber: number = 7;
// 省略号相隔边界多个少元素
const EllipsisBoundDist: number = 2;

function Pager(props: PagerProps) {
    const { prefixCls = "xy-page", current = 1, pageCount = 0, onChange, itemRender } = props;

    function jump(page: number) {
        const num = clamp(page, 1, pageCount);
        if (onChange) {
            onChange(num);
        }
    }

    function getPages() {
        let showPrevMore = false;
        let showNextMore = false;
        const array = [];

        if (pageCount === 0) {
            return [1];
        }

        // 总页数大于 MaxEllipsisNumber 则可以显示省略
        if (pageCount > MaxEllipsisNumber) {
            if (current > MaxEllipsisNumber - EllipsisBoundDist) {
                showPrevMore = true;
            }
            if (current < pageCount - EllipsisBoundDist) {
                showNextMore = true;
            }
        }

        if (showPrevMore && !showNextMore) {
            const startPage = pageCount - (MaxEllipsisNumber - EllipsisBoundDist);
            for (let i = startPage; i < pageCount; ++i) {
                array.push(i);
            }
        } else if (!showPrevMore && showNextMore) {
            for (let i = EllipsisBoundDist; i < MaxEllipsisNumber; ++i) {
                array.push(i);
            }
        } else if (showPrevMore && showNextMore) {
            const offset = Math.floor(MaxEllipsisNumber / EllipsisBoundDist) - 1;
            for (let i = current - offset; i <= current + offset; ++i) {
                array.push(i);
            }
        } else {
            for (let i = EllipsisBoundDist; i < pageCount; ++i) {
                array.push(i);
            }
        }
        return array;
    }

    function createPageItem(current: number, type: PageItemType, content: React.ReactNode) {
        if (itemRender) {
            return itemRender(current, type, content);
        } else {
            return content;
        }
    }

    function firstPageItem() {
        if (pageCount >= 1) {
            return (
                <li className={classNames(`${prefixCls}-item`, { [`${prefixCls}-active`]: current === 1 })} onClick={() => jump(1)} title="1">
                    {createPageItem(1, "page", <a>1</a>)}
                </li>
            );
        } else {
            return null;
        }
    }

    function lastPageItem() {
        if (pageCount > 1) {
            return (
                <li className={classNames(`${prefixCls}-item`, { [`${prefixCls}-active`]: current === pageCount })} onClick={() => jump(pageCount)} title={`${pageCount}`}>
                    {createPageItem(pageCount, "page", <a>{pageCount}</a>)}
                </li>
            );
        } else {
            return null;
        }
    }

    function prevMoreItem() {
        if (pageCount > MaxEllipsisNumber && current > MaxEllipsisNumber - EllipsisBoundDist) {
            return (
                <li className={`${prefixCls}-more`} title="向前5页" onClick={() => jump(current - 5)}>
                    <a>
                        <div className={`${prefixCls}-item-container`}>
                            <FontAwesomeIcon icon={faAngleDoubleLeft} />
                            <span className={`${prefixCls}-item-ellipsis`}>•••</span>
                        </div>
                    </a>
                </li>
            );
        } else {
            return null;
        }
    }

    function nextMoreItem() {
        if (pageCount > MaxEllipsisNumber && current < pageCount - EllipsisBoundDist) {
            return (
                <li className={`${prefixCls}-more`} title="向后5页" onClick={() => jump(current + 5)}>
                    <a>
                        <div className={`${prefixCls}-item-container`}>
                            <FontAwesomeIcon icon={faAngleDoubleRight} />
                            <span className={`${prefixCls}-item-ellipsis`}>•••</span>
                        </div>
                    </a>
                </li>
            );
        } else {
            return null;
        }
    }

    return (
        <ul className={`${prefixCls}-pager`}>
            <li className={classNames(`${prefixCls}-prev`, { [`${prefixCls}-disabled`]: current <= 1 })} onClick={() => jump(current - 1)} title="上一页">
                {createPageItem(
                    null,
                    "prev",
                    <a className={`${prefixCls}-item-link`}>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </a>
                )}
            </li>
            {firstPageItem()}
            {prevMoreItem()}

            {getPages().map((page) => (
                <li key={page} onClick={() => jump(page)} className={classNames(`${prefixCls}-item`, { [`${prefixCls}-active`]: current === page })} title={page}>
                    {createPageItem(page, "page", <a>{page}</a>)}
                </li>
            ))}

            {nextMoreItem()}
            {lastPageItem()}
            <li className={classNames(`${prefixCls}-next`, { [`${prefixCls}-disabled`]: current >= pageCount })} onClick={() => jump(current + 1)} title="下一页">
                {createPageItem(
                    null,
                    "next",
                    <a className={`${prefixCls}-item-link`}>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </a>
                )}
            </li>
        </ul>
    );
}

export default React.memo(Pager);
