import { Link, useNavigate } from 'react-router-dom';

import './singleCharacterLayout.scss';

const SingleCharacterLayout = ({data}) => {

    const {name, description, thumbnail} = data;

    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={name} className="single-comic__char-img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
            <Link onClick={goBack} to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleCharacterLayout;