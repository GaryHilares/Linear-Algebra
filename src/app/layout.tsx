import "./global.css";

function GoogleFontsLoader() {
    return (
        <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
                rel="preconnect"
                href="https://fonts.gstatic.com"
                crossOrigin="true"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Crete+Round&family=Fragment+Mono&family=Slabo+13px&display=swap"
                rel="stylesheet"
            />
        </>
    );
}

function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <title>Linear Algebra solver</title>
                <GoogleFontsLoader />
            </head>
            <body>{children}</body>
        </html>
    );
}

export default RootLayout;
