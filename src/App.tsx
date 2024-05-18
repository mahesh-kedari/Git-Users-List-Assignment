import {
  Box,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { UserDetails } from "./components/UserDetails";
import { UsersList } from "./components/UsersList";
import "./styles.css";

const items = [
  { id: 1, name: "Item 1", details: "Details of Item 1" },
  { id: 2, name: "Item 2", details: "Details of Item 2" },
  { id: 3, name: "Item 3", details: "Details of Item 3" },
];

export default function App() {
  const styles = useStyles();
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  const handleItemClick = (item: any) => {
    setSelectedUser(item);
  };

  return (
    <Container className={styles.container}>
      <Grid container>
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            maxWidth: "300px",
            borderRight: "1px solid #ddd",
            overflowY: isLargeScreen ? "auto" : "visible",
            height: isLargeScreen ? "100vh" : "auto",
          }}
        >
          <UsersList onItemClick={handleItemClick} />
        </Grid>
        <Grid
          item
          xs={12}
          md={9}
          sx={{ padding: 2 }}
          className={styles.details}
        >
          {/* {selectedItem ? (
            <Box>
              <Typography variant="h4">{selectedItem.name}</Typography>
              <Typography variant="body1">{selectedItem.details}</Typography>
            </Box>
          ) : (
            <Typography variant="body1">
              Select an item to see details
            </Typography>
          )} */}
          <UserDetails loginName={selectedUser} />
        </Grid>
      </Grid>
    </Container>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    margin: 10,
    padding: 3,
    backgroundColor: theme.palette.grey[100],
    height: "calc(100vh - 20px)",
    border: "5px solid black",
  },
  details: {
    backgroundColor: theme.palette.grey[300],
  },
}));
