import ErrorLayout from "./error-layout";

export default function Custom500() {
    return (
        <ErrorLayout
            statusCode={500}
            title="Internal Server Error"
            description="We're sorry, but something went wrong on our end. Please try again later or contact support if the problem persists."
        />
    );
}

