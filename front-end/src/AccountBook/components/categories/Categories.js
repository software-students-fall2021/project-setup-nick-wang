import { Link } from "react-router-dom"
import { Button } from "semantic-ui-react"

//capitalize first letter
const displayType = (type) => {
    if(type == null) return null;
    return type.charAt(0).toUpperCase() + type.slice(1);
}

function Categories(props){
    return(
        <>
            <Button color={props.color} as={Link} to={"/account_book/"+props.type} content={displayType(props.type)}/>
        </>
    )
}

export default Categories;