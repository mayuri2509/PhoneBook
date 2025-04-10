import React from "react";
import Header from "../components/Header";
import { screen,render,fireEvent, getByLabelText } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

 test('should display title',()=>{
    render(<Header/>);
    expect(screen.getByText(/PhoneBook/i)).toBeInTheDocument();
});
 test('renders search input field',()=>{
    render(<Header/>)
    expect(screen.getByPlaceholderText(/Search Name/i)).toBeInTheDocument();
});
test('renders filter dropdown with all filter options',()=>{
    render(<Header/>)
    const filterDropDown = screen.getByLabelText(/Filter by Label/i);
    fireEvent.mouseDown(filterDropDown);
    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Work")).toBeInTheDocument();
    expect(screen.getByText("School")).toBeInTheDocument();
    expect(screen.getByText("Friend")).toBeInTheDocument();
    expect(screen.getByText("Family")).toBeInTheDocument();
});
test("opens Createcontact modal when 'Create Contact' button is clicked",()=>{
    render(<Header/>)
    const createButton =screen.getByRole("button",{ name:/Create Contact/i})
    fireEvent.click(createButton);
    expect(screen.getByText(/Add New Contact/i)).toBeInTheDocument();
});
test('updates search query input',()=>{
    render(<Header/>);
    const searchInput= screen.getByPlaceholderText('Search Name');
    fireEvent.change(searchInput,{target:{value:"Alice"}});
    expect(searchInput.value).toBe("Alice");
});
test("updates filter label dropdown", async () => {
    render(<Header />);
    const user = userEvent.setup();
    const dropdown= screen.getByLabelText("Filter by Label");
    await user.click(dropdown);
    const WorkOption = await screen.findByText("Work");
    await user.click(WorkOption);
    expect(dropdown).toHaveTextContent("Work")
  });



   
  