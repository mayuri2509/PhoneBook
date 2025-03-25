import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField, MenuItem } from "@mui/material";

class Createcontact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.editInput?.name || "",
      phone_no: props.editInput?.phone_no || "",
      address: props.editInput?.address || "",
      label: props.editInput?.label || "Work",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    
    const newContact = { 
      id: this.props.editInput?.id || Date.now(), 
      ...this.state 
    };

    this.props.onAdd(newContact);
    this.props.onClose();
  };

  boxStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  render() {
    return (
      <Modal
        open 
        onClose={this.props.onClose}
        aria-labelledby="add-contact-title"
        aria-describedby="add-contact-description"
      >
        <Box sx={this.boxStyle}>
          <Typography id="add-contact-title" variant="h6">
            {this.props.editInput ? "Edit Contact" : "Add New Contact"}
          </Typography>
          <form onSubmit={this.handleSubmit}>
            <TextField
              name="name"
              label="Name"
              margin="dense"
              type="text"
              required
              fullWidth
              value={this.state.name}
              onChange={this.handleChange}
            />
            <TextField
              name="phone_no"
              label="Phone No"
              margin="dense"
              type="tel"
           
              inputProps={{
                pattern: "[1-9]+",
              }}
              required
              fullWidth
              value={this.state.phone_no}
              onChange={this.handleChange}
            />
            <TextField
              name="address"
              label="Address"
              margin="dense"
              type="textarea"
              required
              fullWidth
              value={this.state.address}
              onChange={this.handleChange}
            />
            <TextField
              select
              name="label"
              label="Label"
              margin="dense"
              fullWidth
              required
              value={this.state.label}
              onChange={this.handleChange}
            >
              {["Work", "School", "Friend", "Family"].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
              <Button type="submit" variant="contained" color="primary">
                {this.props.editInput ? "Save Changes" : "Add Contact"}
              </Button>
              <Button variant="contained" color="primary" onClick={this.props.onClose}>
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    );
  }
}

export default Createcontact;
