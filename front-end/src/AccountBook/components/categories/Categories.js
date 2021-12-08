import { Link } from "react-router-dom"
import { Button } from "semantic-ui-react"

function Color(type) {
    if(type == 'housing') return 'orange';
    else if(type == 'transportation') return 'green';
    else if(type == 'food') return 'blue';
    else if(type == 'health') return 'violet';
    else if(type == 'utilities') return 'pink';
    else if(type == 'miscellaneous') return 'brown';
};

//capitalize first letter
function displayType(type){
    return type.charAt(0).toUpperCase() + type.slice(1);
}

function Categories(props){
    return(
        <>
            <Button color={Color(props.type)} as={Link} to={"/account_book/"+props.type} content={displayType(props.type)}/>
        </>
    )
}

export default Categories;