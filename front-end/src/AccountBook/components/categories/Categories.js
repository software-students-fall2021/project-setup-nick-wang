import { Link } from "react-router-dom"
import { Header , Button, Container, Grid, Segment } from "semantic-ui-react"


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

            <Button color='blue' as={Link} to="/account_book/Food">
            Food
            </Button>

            <Button color='violet' as={Link} to="/account_book/Health">
            Health
            </Button>

            <Button color='pink' as={Link} to="/account_book/Utilities">
            Utilities    
            </Button>

            <Button color='brown' as={Link} to="/account_book/miscellaneous">
            Miscellaneous
            </Button>

        </Segment>
    )
}

export default Categories;