import React from "react"
import ReactDOM from "react-dom"
import { Button, Header, Icon, Modal, Label, Table, Menu, Popup, Message, Form, Dropdown, Pagination } from "semantic-ui-react"
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios';



class Locker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            LocationId: '', LockerBankId: '', LockerId: '', datas: [], Locations: [], LockerBanks: [], Lockers: [], title: 'Locker Details', m_title: '', open: false, openDelete: false, customerdata: [], size: 'small', Id: '', lockerName: '', locationName: '', lockerBankName: '',  locationNameError: '', lockerBankNameError: '', lockerNameError: '',
            modalTitle: '', Id: '', Name: '', LocationName:''
            
        };
        this.delete = this.delete.bind(this);
        this.show = this.show.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        axios.get('/Locker/GetAllLockerList')
            .then(res => {
                this.setState({ datas: JSON.parse(res.data) }); 
            });

    }//no need to use location.reload()

    componentDidMount(prevProps, prevState) {
        axios.get('/Locker/GetAllLockerList')
            .then(res => {
                console.log(res.data);
                this.setState({ datas: JSON.parse(res.data) });
            });
    }
   
 
    show(event) {
        
        var Id = event.target.id;
        event.preventDefault();
        this.setState({ Id: event.target.id });
        let add_edit;
        axios.get('/Locker/GetAllLocations')
            .then(res => {
                const Locations = res.data;

                this.setState({ Locations });
            })
       

        if (event.target.value === '') {
            add_edit = 'Create New Record';
            this.setState({
                Id: '',
                LocationId: '',
                LockerBankId: '',
                LockerId: '',
                open: true,
                m_title: add_edit,
                locationNameError: '',
                lockerBankNameError: '',
                lockerNameError: '',
            
            });
        }
        else if (event.target.value=="Location"){
           
            this.setState({
                Id: '',
                LocationName:'',
                openLocation: true,
                m_title: "Add Location",
                locationNameError: '',
            });
        }
        else {

            add_edit = event.target.value;  
            axios.get('/Locker/GetLockerList/' + Id)
                .then(res => {
                    const Id = res.data.ID;
                    const LocationId = res.data.LocationID;
                    const LockerBankId = res.data.LockerBankID;
                    const LockerId = res.data.LockerID;
                    this.setState({
                        Id,
                        LocationId,
                        LockerBankId,
                        LockerId,
                        open: true,
                        m_title: add_edit,
                        locationNameError: '',
                        lockerBankNameError: '',
                        lockerNameError: '',
                        
                    });
                })

        }


    }
   
    handleChangeLocation = (event, data) => {
     
        this.setState({ LocationId: data.value }, () => axios.get('/Locker/GetAllLockerBanks/' + this.state.LocationId)
            .then(res => {
                const LockerBanks = res.data;

                this.setState({ LockerBanks });
            }));
    }
    handleChangeLockerBank = (event, data) => {

        this.setState({ LockerBankId: data.value }, () => axios.get('/Locker/GetAllLockers/' + this.state.LockerBankId)
            .then(res => {
                const Lockers = res.data;

                this.setState({ Lockers });
            }));
    }
    handleChangeLocker = (event, data) => {

        this.setState({ LockerId: data.value });
    }

    delete(event) {
     
        this.setState({
            Id: event.target.id,
            m_title: 'Delete',
            openDelete: true,
        });
    }
    submit() {

        this.setState(state => ({
            Id:'',
            locationNameError: '',
            lockerBankNameError: '',
            lockerNameError: '',
           

        }));
        if (this.state.LocationId != '' && this.state.LockerBankId != '' && this.state.LockerId != '' && this.state.m_title === 'Create New Record') {
           
            axios({
                method: 'post',
                url: '/Locker/Create/',
                data: {
                   
                    LocationID: this.state.LocationId,
                    LockerBanksID: this.state.LockerBankId,
                    LockersID: this.state.LockerId
                } 

            });

          
            this.setState({ open: false });

          

           
        }
        else if (this.state.LocationId != '' && this.state.LockerBankId != '' && this.state.LockerId != '' && this.state.LocationId != undefined && this.state.LockerBankId != undefined && this.state.LockerId != undefined && this.state.m_title === 'Edit')
        {
            
            axios({
                method: 'post',
                url: '/Locker/Edit/',
                data: {
                    ID: this.state.Id,
                    LocationID: this.state.LocationId,
                    LockerBanksID: this.state.LockerBankId,
                    LockersID: this.state.LockerId
                }
            });
            this.setState({ open: false })
        }
        else if (this.state.m_title === 'Delete') {     
            axios({
                method: 'post',
                url: '/Locker/Delete/',
                data: {
                    ID: this.state.Id
                }
            });
            this.setState({ openDelete: false })
        }

        else {
            alert("Please fill all the Locker Details.");
            if (this.state.LocationId === '' || this.state.LocationId === undefined) {
                this.setState({ locationNameError: 'Please select Location' })
            }
            if (this.state.LockerBankId === '' || this.state.LockerBankId === undefined) {
                this.setState({ lockerBankNameError: 'Please select Locker Bank' })
            }
            if (this.state.LockerId === '' || this.state.LockerId === undefined) {
                this.setState({ lockerNameError: 'Please select Locker' })
            }
          
        }

    }

    close = () => this.setState({ open: false, openDelete: false})



    render() {
        const { open, openDelete,size, datas, Locations, LockerBanks, Lockers } = this.state


        return (

          
            <div>

                <h2 style={{ color: 'red' }} textAlign='center'>     {this.state.title}</h2>
                <br />
               
                <Table celled selectable size='large'  >
                    <Table.Header>
                        <Table.Row active textAlign='center'>
                   
                            <Table.HeaderCell>Location</Table.HeaderCell>
                            <Table.HeaderCell>Locker Bank</Table.HeaderCell>
                            <Table.HeaderCell>Locker Number</Table.HeaderCell>
                            <Table.HeaderCell>Action</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body >
                        {datas.map((datas, index) => (
                            <Table.Row key={index} textAlign='center' positive >
                                <Table.Cell>{datas.Location.Name}</Table.Cell>
                                <Table.Cell>{datas.LockerBank.Name}</Table.Cell>
                                <Table.Cell>{datas.Locker.Name}</Table.Cell>
                               
                                <Table.Cell>
                                    <Button color='yellow' id="btnEdit" onClick={
                                        this.show} id={datas.ID} value='Edit'>
                                        <i aria-hidden='true' className='pencil icon' />Modify
                                 </Button> 
                                 
                                    <Button color='red' id="btnDelete" onClick={this.delete} id={datas.ID} value='Delete' >
                                        <i aria-hidden='true' className='trash icon' /> Delete
                                 </Button>
                                  
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                  
                    <Table.Footer >
                        <Table.Row>
                            <Table.HeaderCell colspan='4'>
                                <Button floated='left' icon labelPosition='left' primary id="btnCreate" onClick={
                                    this.show}>
                                    <i aria-hidden='true' className='plus icon' /> Add Locker
                                </Button>
                               
                            </Table.HeaderCell>
                           
                
                            </Table.Row>
                 
                    </Table.Footer>
                </Table>
        

                <Modal size="small" open={open} onClose={this.close} closeIcon>
                    <Modal.Header>{this.state.m_title}</Modal.Header>
                    <Modal.Content id="Add_Edit">

                        <Form key={this.state.Id}>
                            <input id="m_title" value={this.state.m_title} hidden />
                            <input type='text' id="Id" defaultValue={this.state.Id} hidden />


                            <Form.Field>
                                <label>Location Name</label>
                                <div ><font color="red">{this.state.locationNameError}</font></div>
                                <Dropdown placeholder='Select Location' onChange={this.handleChangeLocation} fluid search selection options={Locations.map(location => ({
                                    key: location.ID,
                                    value: location.ID,
                                    text: location.Name,
                                }))} defaultValue={this.state.LocationId} />

                            </Form.Field>

                            <Form.Field>
                                <label>Locker Bank Name</label>
                                <div ><font color="red">{this.state.lockerBankNameError}</font></div>
                                <Dropdown placeholder='Select Locker Bank' onChange={this.handleChangeLockerBank} fluid search selection options={LockerBanks.map(lockerbank => ({
                                    key: lockerbank.ID,
                                    value: lockerbank.ID,
                                    text: lockerbank.Name,
                                }))} defaultValue={this.state.LockerBankId} />
                            </Form.Field>

                            <Form.Field>
                                <label>Locker Number</label>
                                <div ><font color="red">{this.state.lockerNameError}</font></div>
                                <Dropdown placeholder='Select Locker' onChange={this.handleChangeLocker} fluid search selection options={Lockers.map(locker => ({
                                    key: locker.ID,
                                    value: locker.ID,
                                    text: locker.Name,
                                }))} defaultValue={this.state.LockerId} />
                            </Form.Field>

                         
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='blue' type='submit' id="btnSubmit" onClick={() => {
                            this.submit()
                        }}>Submit</Button>
                        <Button color='red' onClick={this.close}>Close</Button>
                    </Modal.Actions>
                </Modal>
                <Modal size="small" open={openDelete} onClose={this.close} closeIcon>
                    <Modal.Header>{this.state.m_title}</Modal.Header>
                    <Modal.Content>
                        <p>Are you sure you want to delete the item?</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='red' onClick={this.close}>Cancel</Button>
                        <Button positive icon='checkmark' labelPosition='right' content='Yes' type='submit' onClick={() => {
                            this.submit()
                        }} />
                    </Modal.Actions>
                </Modal>
            </div>
      
        );
    }
}


export default Locker;
