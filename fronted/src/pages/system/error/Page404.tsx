import ErrorLayout from "./error-layout";

export default function Custom404() {
    return (
        <ErrorLayout
            statusCode={404}
            title="Page Not Found"
            description="Oops! The page you're looking for doesn't exist. It might have been moved or deleted."
        />
    );
}

