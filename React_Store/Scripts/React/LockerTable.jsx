import React, { Component } from 'react'
import ReactDOM from "react-dom"
import { Button, Header, Icon, Modal, Label, Table, Menu, Popup, Message } from "semantic-ui-react"
import 'semantic-ui-css/semantic.min.css'

class LockerTable extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {

        return (
            <Table celled selectable fixed >
                <Table.Header >
                    <Table.Row active>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Action(Edit)</Table.HeaderCell>
                        <Table.HeaderCell>Action(Delete)</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body >

                    {this.props.datas.map((datas, index) => (

                        <Table.Row key={index}>
                            <Table.Cell>{datas.Name}</Table.Cell>
                            <Table.Cell>
                                <Button color='yellow' id="btnEdit" onClick={this.props.show} id={datas.ID} value='Edit'>
                                    <i aria-hidden='true' className='pencil icon' />Edit
                                 </Button>
                            </Table.Cell>
                            <Table.Cell>
                                <Button color='red' id="btnDelete" onClick={() => {
                                    this.props.delete(index, datas.ID)
                                }} id={datas.ID} value='Delete' icon='trash'>
                                    <i aria-hidden='true' className='trash icon' /> Delete
                                 </Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        );
    }
}

export default LockerTable;