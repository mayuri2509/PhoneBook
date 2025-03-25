import React, { Component } from "react";
import { Stack, TextField, Typography, Button, MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Createcontact from "./Createcontact";
import ContactList from "./ContactList";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [], 
      isModelOpen: false,
      searchQuery: "", 
      filterLabel: "", 
    };
  }

  handleModel = () => {
    this.setState((prevState) => ({
      isModelOpen: !prevState.isModelOpen,
    }));
  };

  handleSearch = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleFilterLabel = (event) => {
    this.setState({ filterLabel: event.target.value });
  };

  handleToggleBookmark = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.map((contact) =>
        contact.id === id ? { ...contact, isBookmarked: !contact.isBookmarked } : contact
      ),
    }));
  };

  render() {
    const { contacts, isModelOpen, searchQuery, filterLabel } = this.state;

    return (
      <div className="container">
        <Stack spacing={33} direction="row" alignItems="center">
          <Typography variant="h4">
            <AccountCircleIcon color="primary" fontSize="large" /> PhoneBook
          </Typography>

          <TextField
            variant="outlined"
            placeholder="Search Name"
            value={searchQuery}
            onChange={this.handleSearch}
            
          
          />

         
          <TextField
            select
            variant="outlined"
            sx={{width:'150px'}}
            label="Filter by Label"
            value={filterLabel}
            onChange={this.handleFilterLabel}
            
          > 
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Work">Work</MenuItem>
            <MenuItem value="School">School</MenuItem>
            <MenuItem value="Friend">Friend</MenuItem>
            <MenuItem value="Family">Family</MenuItem>
          </TextField>

          <Button variant="outlined" onClick={this.handleModel}>
            <AddIcon /> Create Contact
          </Button>

          {isModelOpen && (
            <Createcontact
              onAdd={(newContact) =>
                this.setState({ contacts: [...contacts, newContact], isModelOpen: false })
              }
              onClose={() => this.setState({ isModelOpen: false })}
            />
          )}
        </Stack>

      
        <ContactList
          contacts={contacts}
          searchQuery={searchQuery}
          filterLabel={filterLabel}
          onEdit={(updatedContact) =>
            this.setState({
              contacts: contacts.map((contact) =>
                contact.id === updatedContact.id ? updatedContact : contact
              ),
            })
          }
          onDelete={(id) =>
            this.setState({ contacts: contacts.filter((contact) => contact.id !== id) })
          }
          onToggleBookmark={this.handleToggleBookmark}
        />
      </div>
    );
  }
}

export default Header;
