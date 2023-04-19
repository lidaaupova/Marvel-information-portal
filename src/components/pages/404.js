import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

import ErrorMessage from "../errorMessage/ErrorMessage";

const Page404 = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    return (
        <div>
            <Helmet>
                <meta
                    name="description"
                    content="Page with error 404"
                />
                <title>Error 404</title>
            </Helmet>
            <ErrorMessage/>
            <p style={{textAlign: 'center', fontWeight: 'bold', fontSize: 24}}>Page doesn't exist</p>
            <button
                className="button button__main button__long"
                style={{margin: '20px auto 0', display: 'block'}}
                onClick={goBack}>
                <div className="inner">Go back</div>
            </button>
            <Link 
                style={{display: 'block', textAlign: 'center', fontWeight: 'bold', fontSize: 24, marginTop: 30, color: '#9f0013'}}
                to="/">
                Back to main page
            </Link>
        </div>
    )
}

export default Page404;