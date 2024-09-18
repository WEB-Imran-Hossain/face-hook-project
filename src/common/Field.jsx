import React from "react";

const Field = ({ label, children, htmlFor, error }) => {
  // Determine the id for the label, prioritizing `htmlFor` prop or child's id
  const id = htmlFor || getChildId(children);

  return (
    <div className="form-control">
      {/* Render label if provided */}
      {label && (
        <label htmlFor={id} className="auth-label">
          {label}
        </label>
      )}

      {/* Render child elements */}
      {children}

      {/* Display error message if present */}
      {!!error && (
        <div role="alert" className="text-red-500">
          {error.message}
        </div>
      )}
    </div>
  );
};

const getChildId = (children) => {
  const child = React.Children.only(children);
  return child?.props?.id || null;
};

export default Field;
