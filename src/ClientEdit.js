import React, { Component, useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

function ClientEdit(props){

    const [item, setItem] = useState({
            name: '',
            email: ''
    });

    useEffect(() => {
       loadClient();
    }, []);


    async function loadClient() {
        if (props.match.params.id !== 'new') {
            console.log(props);
            const client = await (await fetch(`/clients/${props.match.params.id}`)).json();
            setItem(client);
        }
    }

    async function handleSubmit(event){
        event.preventDefault();

        await fetch('/clients' + (item.id ? '/' + item.id : ''), {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),  //   <--  IMPORTANT !!!
        });
        props.history.push('/clients');

    }

    function handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        item[name] = value;
        setItem(item);
    }

    

    return (

     <div>
        <AppNavbar/>
        <Container>
            <h2>{item.id ? 'Edit Client' : 'Add Client'}</h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="text" name="name" id="name" value={item.name || ''}
                           onChange={handleChange} autoComplete="name"/>
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="text" name="email" id="email" value={item.email || ''}
                           onChange={handleChange} autoComplete="email"/>
                </FormGroup>
                <FormGroup>
                    <Button color="primary" type="submit">Save</Button>{' '}
                    <Button color="secondary" tag={Link} to="/clients">Cancel</Button>
                </FormGroup>
            </Form>
        </Container>
    </div>
    )


}

export default withRouter(ClientEdit);