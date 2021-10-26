import React from 'react';
import { Row, Col, Tab, Nav, TabContainer } from "react-bootstrap";
import './DiaryTabs.css'

const DiaryTabs = () => {
    return (
            <TabContainer className="tabContainer" defaultActiveKey="first">
             <Row>
                <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="first">Tab 1</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="second">Tab 2</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                            hi
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                            hi
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
             </Row>
            </TabContainer>
    )
}
export default DiaryTabs;