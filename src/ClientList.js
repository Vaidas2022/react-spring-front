import { useEffect, useState } from "react";
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';


function ClientList() {
  const [clients, setClients] = useState([]);

  async function loadClients() {
    const response = await fetch("/clients");
    console.log(response);
    const data = await response.json();
    console.log(data);
    setClients(data);
  }

  async function remove(id){
    console.log(`Making DELETE request with id ` + {id});
    await fetch(`/clients/${id}`,{        
        method: 'DELETE',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then( () => {
                console.log("Got response");
                let updatedClients = [...clients].filter(i => i.id !== id);
                setClients(updatedClients);
            }
        )    
    ;
  }

  useEffect(() => {
    loadClients();
  }, []);

  const clientList = clients.map(client => {
        return <tr key={client.id}>
                    <td style={{whiteSpace: 'nowrap'}}>{client.name}</td>
                    <td>{client.email}</td>
                    <td>
                        <ButtonGroup>
                            <Button size="sm" color="primary" to={"/clients/" + client.id}>Edit</Button>
                            <Button size="sm" color="danger" onClick={() => remove(client.id)}>Delete</Button>
                        </ButtonGroup>
                    </td>
                </tr>
    });

  return (
    <div className="ClientList">
        <Container fluid>
            <h2>Clients</h2>
            <Table className="mt-4 text-light">
                            <thead>
                            <tr>
                                <th width="30%">Name</th>
                                <th width="30%">Email</th>
                                <th width="40%">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                                {clientList}
                            </tbody>
            </Table>
      </Container>
    </div>
  );
}

export default ClientList;
