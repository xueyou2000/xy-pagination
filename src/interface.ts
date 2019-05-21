export type PageItemType = "prev" | "next" | "page";

export interface PaginationProps {
    /**
     * 附加类名
     */
    prefixCls?: string;
    /**
     * 根节点的附加类名
     */
    className?: string;
    /**
     * 内联样式
     */
    style?: React.CSSProperties;
    /**
     * 当前页数
     */
    current?: number;
    /**
     * 默认当前页数
     */
    defaultCurrent?: number;
    /**
     * 页码改变事件
     */
    onChange?: (page: number, pageSize: number) => void;
    /**
     * 每页条数
     */
    pageSize?: number;
    /**
     * 默认每页条数
     * @description 默认10
     */
    defaultPageSize?: number;
    /**
     * 每页条数改变
     */
    onPageSizeChange?: (pageSize: number) => void;
    /**
     * 每页可以显示多少条
     * @description 默认 [10, 20, 30, 40, 50]
     */
    pageSizeOptions?: number[];
    /**
     * 总页数
     * @description 默认0
     */
    total?: number;
    /**
     * 显示快速跳转输入框
     */
    showQuickJumper?: boolean;
    /**
     * 显示更改每页条数下拉列表
     */
    showSizeChanger?: boolean;
    /**
     * 是否精简模式
     */
    simple?: boolean;
    /**
     * 自定义渲染
     */
    itemRender?: (current: number, page: PageItemType, originalElement: React.ReactNode) => React.ReactNode;
}

export interface PagerProps extends SimplePageProps {
    /**
     * 自定义渲染
     */
    itemRender?: (current: number, page: PageItemType, originalElement: React.ReactNode) => React.ReactNode;
}

export interface SimplePageProps {
    /**
     * 附加类名
     */
    prefixCls?: string;
    /**
     * 当前页码
     */
    current?: number;
    /**
     * 总页数
     */
    pageCount?: number;
    /**
     * 页码改变回调
     */
    onChange?: (page: number) => void;
}
