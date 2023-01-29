import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../services/authService";

const ProtectedComponent = ({ path, component: Component, ...rest }) => {
    return (
        <Route
            path={path}
            {...rest}
            render={(props) => {
                if (auth.getCurrentUser()) return <Component {...props} />;
                return (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: {
                                from: props.location,
                            },
                        }}
                    />
                );
            }}
        />
    );
};

export default ProtectedComponent;
