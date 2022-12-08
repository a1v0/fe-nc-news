import React from "react";

export default function NotFound({ missingPiece }) {
    return (
        <main className="NotFound">
            <h1>Whoopsie! We couldn't find that {missingPiece}!</h1>
            <p>
                Sorry to be a flat tyre, but you've got yourself a good
                ol'-fashioned 404.
            </p>
            <p>
                Check for typos in the URL. If in doubt, shout at the person who
                made the site or sent you the link!
            </p>
            <p>
                Perhaps one day you will find a way to forgive this humble news
                website for its inability to retrieve the page you so desire.
            </p>
            <p className="emoji">😳</p>
        </main>
    );
}
