import React, { Component } from "react";

class TableHeaders extends Component {
    raiseSort = (path) => {
        const sortColumn = { ...this.props.sortColumn };
        if (sortColumn.path === path)
            sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
        else {
            sortColumn.path = path;
            sortColumn.order = "asc";
        }
        this.props.onSort(sortColumn);
    };

    renderSortIcon = (column) => {
        if (column.path !== this.props.sortColumn.path) return null;
        let classes = "fa fa-sort-desc";
        if (this.props.sortColumn.order === "asc") classes = "fa fa-sort-asc";
        return <i className={classes}></i>;
    };

    render() {
        const { columns, sortColumn } = this.props;
        return (
            <thead>
                <tr>
                    {columns.map((column) => {
                        return (
                            <th
                                key={column.path || column.key}
                                onClick={() => this.raiseSort(column.path)}
                            >
                                {column.label} {this.renderSortIcon(column)}
                            </th>
                        );
                    })}
                </tr>
            </thead>
        );
    }
}

export default TableHeaders;
