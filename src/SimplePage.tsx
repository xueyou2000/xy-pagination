import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import clamp from "lodash-es/clamp";
import React from "react";
import { SimplePageProps } from "./interface";
import PageInput from "./PageInput";

function SimplePage(props: SimplePageProps) {
    const { prefixCls = "xy-page", current = 1, pageCount = 1, onChange } = props;
    function jump(page: number) {
        const num = clamp(page, 1, pageCount);
        if (onChange) {
            onChange(num);
        }
    }

    return (
        <React.Fragment>
            <a className={classNames(`${prefixCls}-simple-link`, { disabled: current <= 1 })} onClick={() => jump(current - 1)}>
                <FontAwesomeIcon icon={faAngleLeft} />
            </a>
            <span className={`${prefixCls}-simple-jump`}>
                <PageInput current={current} pageCount={pageCount} onChange={onChange} />
                <span className={`${prefixCls}-slash`}>／</span>
                {pageCount}
            </span>
            <a className={classNames(`${prefixCls}-simple-link`, { disabled: current === pageCount })} onClick={() => jump(current + 1)}>
                <FontAwesomeIcon icon={faAngleRight} />
            </a>
        </React.Fragment>
    );
}

export default React.memo(SimplePage);
