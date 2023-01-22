import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
    state = {};
    render() {
        // return null;
        const { data, columns } = this.props;
        return (
            <tbody>
                {data.map((row) => (
                    <tr key={row._id}>
                        {columns.map((column) => (
                            <td key={row._id + (column.path || column.key)}>
                                {column.content
                                    ? column.content(row)
                                    : _.get(row, column.path)}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        );
    }
}

export default TableBody;
