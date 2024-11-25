import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const UserProtectedRoute = ({ children }) => {
    const { user } = useSelector(store => store.auth);

    const navigate = useNavigate();

    useEffect(() => {
        if (user === null) {
            navigate("/login");
        }
    }, [navigate, user]);

    return (
        <>
            {children}
        </>
    );
};


UserProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default UserProtectedRoute;
