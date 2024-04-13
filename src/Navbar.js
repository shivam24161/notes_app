import * as React from "react";
import "./Navbar.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { DefaultEditor } from "react-simple-wysiwyg";
import { notesContext } from "./Mycontext";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [html, setHtml] = React.useState();
  const obj = React.useContext(notesContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // Editor text
  function onChange(e) {
    setHtml(e.target.value);
  }
  //   Add Note
  const addNote = (event) => {
    event.preventDefault();
    var d = new Date().toString();
    var date = d.split(" ").splice(0, 5).join(" ");
    let heading = document.getElementById("noteHeading").value;
    const temp = { heading: heading, description: html, curr_date: date };
    obj.setnotes([...obj.notes, temp]);
    setOpen(false);
    setHtml("");
  };

  // Search notes
  const searchNotes = (event) => {
    let text = event.target.value;
    let txt = text.toLowerCase();
    obj.setsearchText(txt);
  };

  // Reset
  const reset = () => {
    document.getElementById("noteHeading").value = "";
    setHtml("");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <TextSnippetIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              fontSize: "1.5vw",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Notes
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Button
                  textAlign="center"
                  id="add_btn"
                  onClick={handleClickOpen}
                >
                  <ControlPointIcon />
                  Add Note
                </Button>
              </MenuItem>
            </Menu>
          </Box>
          <TextSnippetIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Notes
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={handleClickOpen}
              sx={{ my: 2, color: "white", display: "block" }}
              id="add_btn"
            >
              <span>
                <i class="fa fa-plus" aria-hidden="true"></i>{" "}
              </span>
              Add Note
            </Button>
            <Dialog
              fullScreen
              open={open}
              onClose={handleClose}
              TransitionComponent={Transition}
            >
              <AppBar sx={{ position: "relative" }}>
                <Toolbar>
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                  >
                    <CloseIcon />
                  </IconButton>
                  <Typography
                    sx={{ ml: 2, flex: 1 }}
                    variant="h6"
                    component="div"
                  >
                    Add Notes
                  </Typography>
                  <Button autoFocus color="inherit" onClick={handleClose}>
                    close
                  </Button>
                </Toolbar>
              </AppBar>
              <List>
                <form onSubmit={addNote}>
                  <div className="notes_main">
                    <span>
                      <img src="./arrow.png" alt="arrow" id="arrow" />
                    </span>
                    <div className="heading">
                      <input
                        type="text"
                        placeholder="Heading of your Note"
                        id="noteHeading"
                        required
                      />
                    </div>

                    <div className="add_desc">Add Description:</div>
                    <div className="text_editor_div">
                      <DefaultEditor value={html} onChange={onChange} />
                    </div>
                    <div className="button_div">
                      <Button variant="contained" id="add" type="submit">
                        Add
                      </Button>
                      <Button variant="contained" id="clear" onClick={reset}>
                        Clear
                      </Button>
                    </div>
                  </div>
                </form>
              </List>
            </Dialog>
          </Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search by title of notes..."
              inputProps={{ "aria-label": "search" }}
              onChange={searchNotes}
            />
          </Search>

          {/* <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
