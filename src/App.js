import { Component } from "react";
import "./App.css";
import Header from "./components/Header";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      searchQuery: "",
      filterLabel: "",
    };
  }
  
  addContact = (newContact) => {
    this.setState((prevState) => ({
      contacts: [...prevState.contacts, newContact].sort((a, b) =>
        a.name.localeCompare(b.name)
      ),
    }));
  };

  editContact = (updatedContact) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      ),
    }));
  };

  handleDelete = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
  };

  
  render() {
    return (
      <div>
        <Header 
          contacts={this.state.contacts} 
          addContact={this.addContact} 
          editContact={this.editContact} 
          onDelete={this.handleDelete} 
          searchQuery={this.state.searchQuery}
          onSearch={this.handleSearch}
          filterLabel={this.state.filterLabel}
          onFilter={this.handleFilter}
          onToggleBookmark={this.toggleBookmark} 
        />
      </div>
    );
  }
}

export default App;
