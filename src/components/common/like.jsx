const Like = (props) => {
    let classes = "fa fa-heart";
    if (!props.liked) classes += "-o";
    else classes += " text-danger";
    return (
        <i
            onClick={props.onClick}
            className={classes}
            style={{ cursor: "pointer" }}
            aria-hidden="true"
        ></i>
    );
};

export default Like;
