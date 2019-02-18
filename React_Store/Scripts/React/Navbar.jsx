import React from "react"
import ReactDOM from "react-dom"
import { Menu, Segment } from "semantic-ui-react"
import 'semantic-ui-css/semantic.min.css'


class Nav extends React.Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <Segment inverted >
                <Menu inverted secondary size='large' >
                    <Menu.Item style={{ color: 'yellow' }}name='Locker Stores' />
                </Menu>
            </Segment>
        )
    }
}

ReactDOM.render(
    <Nav />,
    document.getElementById('nav_root')
);
  