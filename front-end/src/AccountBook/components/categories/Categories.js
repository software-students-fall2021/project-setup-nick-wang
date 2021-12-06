import { Link } from "react-router-dom"
import { Header , Button, Segment } from "semantic-ui-react"


function Categories(props){
    return(
        <Segment>
            <Header>Categories</Header>
        
            <Button color='orange' as={Link} to="/account_book/housing">
            Housing
            </Button>

            <Button color='green' as={Link} to="/account_book/transportation">
            Transportation
            </Button>

            <Button color='blue' as={Link} to="/account_book/food">
            Food
            </Button>

            <Button color='violet' as={Link} to="/account_book/health">
            Health
            </Button>

            <Button color='pink' as={Link} to="/account_book/utilities">
            Utilities    
            </Button>

            <Button color='brown' as={Link} to="/account_book/miscellaneous">
            Miscellaneous
            </Button>

        </Segment>
    )
}

export default Categories;