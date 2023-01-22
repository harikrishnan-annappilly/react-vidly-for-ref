import React, { Component } from "react";
import TableHeaders from "./table-headers";
import TableBody from "./table-body";

class Table extends Component {
    state = {};
    render() {
        const { columns, data, onSort, sortColumn } = this.props;
        return (
            <table className="table table-hover table-stripped">
                <TableHeaders
                    columns={columns}
                    onSort={onSort}
                    sortColumn={sortColumn}
                />
                <TableBody data={data} columns={columns} />
            </table>
        );
    }
}

export default Table;
