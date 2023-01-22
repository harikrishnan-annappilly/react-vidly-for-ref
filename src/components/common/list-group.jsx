import React from "react";

const ListGroup = (props) => {
    const { items, textInput, valueInput, onSelectGenre, selectedGenre } =
        props;
    return (
        <ul className="list-group">
            {items.map((item) => {
                return (
                    <li
                        key={item[valueInput] + item[textInput]}
                        onClick={() => onSelectGenre(item)}
                        className={
                            item === selectedGenre
                                ? "list-group-item active"
                                : "list-group-item"
                        }
                    >
                        {item[textInput]}
                    </li>
                );
            })}
        </ul>
    );
};

ListGroup.defaultProps = {
    textInput: "name",
    valueInput: "_id",
};

export default ListGroup;
