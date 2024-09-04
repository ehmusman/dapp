import React, { useContext, useEffect } from "react";
import UserContext from "../context/user/context";

const WithAuth = (WrappedComponent: React.ComponentType) => {
  const WithAuthComponent = (props: any) => {
    const context = useContext(UserContext);

    useEffect(() => {
      context?.getUserProfile();
    }, []);

    if (!context?.state.email) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-secondary">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary border-solid border-t-secondary"></div>
            <p className="mt-4 text-primary text-lg font-semibold">
              Authenticating
            </p>
          </div>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  // Set a display name for debugging purposes
  WithAuthComponent.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`;

  return WithAuthComponent;
};

// Utility function to get display name
function getDisplayName(WrappedComponent: React.ComponentType) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export default WithAuth;
