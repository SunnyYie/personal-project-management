import ErrorLayout from "./error-layout";

export default function Custom403() {
    return (
        <ErrorLayout
            statusCode={403}
            title="Access Forbidden"
            description="Sorry, you don't have permission to access this page. Please check your credentials or contact the administrator."
        />
    );
}

