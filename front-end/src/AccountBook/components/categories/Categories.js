import { Link } from "react-router-dom"


function Categories(props){
    return(
        <>
            <h2>Categories</h2>
        
            <div className="typeRow">
            <Link className="type" to="/account_book/housing">
            Housing
            </Link>
            <Link className="type" to="/account_book/transportation">
            Transportation
            </Link>
            </div>

            <div className="typeRow">
            <Link className="type" to="/account_book/food">
                Food
            </Link>
            <Link className="type" to="/account_book/health">
                Health
            </Link>
            </div>

            <div className="typeRow">
            <Link className="type" to="/account_book/utilities">
            Utilities    
            </Link>
            <Link className="type" to="/account_book/miscellaneous">
            Miscellaneous
            </Link>
            </div>
        </>
    )
}

export default Categories;