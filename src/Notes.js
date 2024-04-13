import * as React from "react";
import { useContext } from "react";
import { notesContext } from "./Mycontext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextareaAutosize } from "@mui/material";
import "./Notes.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #1976D2",
  boxShadow: 24,
  p: 4,
};

const Notes = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [headingText, setHeadingText] = React.useState();
  const [descText, setdescText] = React.useState();
  const [editId, seteditId] = React.useState();
  const [delId, setdelId] = React.useState();
  const obj = useContext(notesContext);
  // Delete Popver

  // Clicking on edit icon
  const handleOpen = (id) => {
    seteditId(id);
    obj.notes.map((i, index) => {
      if (index === id) {
        setHeadingText(i.heading);
        setdescText(i.description);
      }
      return null;
    });
    setOpen(true);
  };
  // Edit heading
  const editHeading = (event) => {
    setHeadingText(event.target.value);
  };

  // Edit Desc
  const editDesc = (event) => {
    setdescText(event.target.value);
  };
  //   Edit Notes
  const editNotes = () => {
    var d = new Date().toString();
    var date = d.split(" ").splice(0, 5).join(" ");
    const temp = {
      heading: headingText,
      description: descText,
      curr_date: date,
    };
    obj.notes.splice(editId, 1, temp);
    obj.setnotes([...obj.notes]);
    setOpen(false);
  };

  // Clear edit Text
  const clearEditText = () => {
    setHeadingText("");
    setdescText("");
  };
  // Delete Notes
  const deleteNotes = () => {
    // const note = obj.notes.filter((i, index) => index !== id);
    // obj.setnotes([...note]);
    obj.notes.splice(delId, 1);
    obj.setnotes([...obj.notes]);
    setAnchorEl(null);
  };

  // Delete Popover
  const handleClickDel = (event) => {
    setAnchorEl(event.currentTarget);
    const id1 = event.target.id;
    const id2 = event.target.parentElement.id;
    if (id1 !== "") {
      setdelId(id1);
    } else if (id2 !== "") {
      console.log(id2);
      setdelId(id2);
    }
  };

  const handleCloseDel = () => {
    setAnchorEl(null);
  };

  const openDel = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
      <div className="main_div">
        {obj.notes.length === 0 ? (
          <div className="notes_empty">
            <div>
              <img
                src="https://play-lh.googleusercontent.com/vSNQds6F5roxdN4-a16JnQ9dWQVSZZ8OH4-iMAcNLaFQd3ItZWU8rOPOql4Ew5Hh1esX"
                alt="img"
                id="notes_empty_img"
              />
            </div>
          </div>
        ) : (
          <div className="notes_card_main">
            {obj.searchText.length === 0
              ? obj.notes.map((i, index) => {
                  var id1 = index;
                  return (
                      <div className="notes_card">
                        {" "}
                        <div className="main_div_display">
                          <div className="date_div">{i.curr_date}</div>
                          <div className="edit_delete_btn">
                            <Button onClick={() => handleOpen(index)}>
                              <EditIcon />
                            </Button>
                            <Button
                              aria-describedby={id}
                              onClick={handleClickDel}
                              id={id1}
                            >
                              <DeleteIcon id={id1} />
                            </Button>

                            <Popover
                              id={id}
                              open={openDel}
                              anchorEl={anchorEl}
                              onClose={handleCloseDel}
                              anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                              }}
                            >
                              <span>
                                <Button onClick={deleteNotes} id="delete1">
                                  Delete
                                </Button>
                              </span>
                              <span>
                                <Button onClick={handleCloseDel} id="cancel1">
                                  Cancel
                                </Button>
                              </span>
                            </Popover>
                          </div>
                        </div>
                        <h3>{i.heading}</h3>
                        <p
                          className="note_desc"
                          dangerouslySetInnerHTML={{
                            __html: i.description ?? "",
                          }}
                        ></p>
                      </div>
                  );
                })
              : obj.notes.map((i, index) => {
                  var id1 = index;
                  let title = i.heading.toLowerCase();
                  const isIncludes=title.includes(obj.searchText);
                  if (isIncludes) {
                    return (
                        <div className="notes_card">
                          {" "}
                          <div className="main_div_display">
                            <div className="date_div">{i.curr_date}</div>
                            <div className="edit_delete_btn">
                              <Button onClick={() => handleOpen(index)}>
                                <EditIcon />
                              </Button>
                              <Button
                                aria-describedby={id}
                                onClick={handleClickDel}
                                id={id1}
                              >
                                <DeleteIcon id={id1} />
                              </Button>

                              <Popover
                                id={id}
                                open={openDel}
                                anchorEl={anchorEl}
                                onClose={handleCloseDel}
                                anchorOrigin={{
                                  vertical: "bottom",
                                  horizontal: "left",
                                }}
                              >
                                <span>
                                  <Button onClick={deleteNotes} id="delete1">
                                    Delete
                                  </Button>
                                </span>
                                <span>
                                  <Button onClick={handleCloseDel} id="cancel1">
                                    Cancel
                                  </Button>
                                </span>
                              </Popover>
                            </div>
                          </div>
                          <h3>{i.heading}</h3>
                          <p
                            className="note_desc"
                            dangerouslySetInnerHTML={{
                              __html: i.description ?? "",
                            }}
                          ></p>
                        </div>
                    );
                  } else if(!isIncludes){
                    return (
                      <h1>No result found...</h1>
                    );
                  }
                  return null
                })}
          </div>
        )}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <center>
              <h2 className="update_notes">Update Your Notes</h2>
            </center>
            <div className="edit_modal_div">
              <div>Title:</div>
              <div>
                <input
                  type="text"
                  value={headingText}
                  onChange={editHeading}
                  id="editheading"
                />
              </div>

              <div>Description:</div>
              <div>
                {" "}
                <TextareaAutosize
                  id="textarea"
                  value={descText}
                  onChange={editDesc}
                ></TextareaAutosize>
              </div>

              <div>
                <Button variant="contained" onClick={editNotes} id="save_edit">
                  Save
                </Button>
                <Button
                  variant="contained"
                  id="clear_edit"
                  onClick={clearEditText}
                >
                  Clear
                </Button>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
  );
};
export default Notes;
