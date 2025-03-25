import React from "react";
import { List, ListItem, ListItemText, TextField, Card, CardContent, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

class ContactList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editId: null,
      editData: {},
    };
  }

  handleEditClick = (contact) => {
    this.setState({ editId: contact.id, editData: { ...contact } });
  };

  handleChange = (e) => {
    this.setState({ editData: { ...this.state.editData, [e.target.name]: e.target.value } });
  };

  handleSaveEdit = () => {
    this.props.onEdit(this.state.editData);
    this.setState({ editId: null, editData: {} });
  };

  handleToggleBookmark = (id) => {
    this.props.onToggleBookmark(id);
  };

  render() {
    const { contacts, searchQuery, filterLabel, onDelete } = this.props;
    const { editId, editData } = this.state;

    
    const filteredContacts = contacts
      .filter((contact) =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((contact) => (filterLabel ? contact.label === filterLabel : true));

    const sortedContacts = [...filteredContacts].sort((a, b) =>
      b.isBookmarked ? 1 : a.isBookmarked ? -1 : 0
    );

    return (
      <List >
        {sortedContacts.length === 0 ? (
        <p></p>
        ) : (
          sortedContacts.map((contact) => (
            <Card key={contact.id} sx={{ marginBottom: 2 }}   >
              <CardContent>
                <ListItem>
                  {editId === contact.id ? (
                    <>
                      <TextField name="name" value={editData.name} onChange={this.handleChange} />
                      <TextField name="phone_no" value={editData.phone_no} onChange={this.handleChange} />
                      <IconButton onClick={this.handleSaveEdit}>
                        <SaveIcon />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <ListItemText
                        primary={contact.name}
                        secondary={`Phone: ${contact.phone_no} | Label: ${contact.label}`}
                      />

                      <IconButton onClick={() => this.handleToggleBookmark(contact.id)}>
                        {contact.isBookmarked ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon />}
                      </IconButton>

                      <IconButton onClick={() => this.handleEditClick(contact)}>
                        <EditIcon />
                      </IconButton>

                      <IconButton onClick={() => onDelete(contact.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </ListItem>
              </CardContent>
            </Card>
          ))
        )}
      </List>
    );
  }
}

export default ContactList;
