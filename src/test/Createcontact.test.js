import { render, screen, fireEvent } from "@testing-library/react";
import Createcontact from "../components/Createcontact";
import userEvent from "@testing-library/user-event"; 

test("submits form and calls onAdd with correct data", async () => {
  const mockOnAdd = jest.fn();
  const mockOnClose = jest.fn();
  render(<Createcontact onAdd={mockOnAdd} onClose={mockOnClose} editInput={null} />);

  const user = userEvent.setup();

  fireEvent.change(screen.getByLabelText(/name/i), {
    target: { value: "Alicia" },
  });
  fireEvent.change(screen.getByLabelText(/phone no/i), {
    target: { value: "1234567890" },
  });    

   fireEvent.change(screen.getByLabelText(/address/i), {
    target: { value: "NYC" },
  });


  const labelSelect = screen.getByLabelText(/label/i);
  fireEvent.mouseDown(labelSelect); 

  const option = await screen.findByText("Friend");
  fireEvent.click(option); 

  fireEvent.click(screen.getByRole("button", { name: /add contact/i }));

  expect(mockOnAdd).toHaveBeenCalledWith(
    expect.objectContaining({
      name: "Alicia",
      phone_no: "1234567890",
      address: "NYC",
      label: "Friend",
    })
  );
  expect(mockOnClose).toHaveBeenCalled();
});
