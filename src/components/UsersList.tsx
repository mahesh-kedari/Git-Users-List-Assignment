/**
 * Users List
 */
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

type UsersListProps = {
  onItemClick: (item: any) => void;
};

const items = [
  { id: 1, name: "Item 1", details: "Details of Item 1" },
  { id: 2, name: "Item 2", details: "Details of Item 2" },
  { id: 3, name: "Item 3", details: "Details of Item 3" },
];

export const UsersList: React.FC<UsersListProps> = ({ onItemClick }) => {
  const [users, setUsers] = useState<any>([]);
  async function getUsersList() {
    await fetch("https://api.github.com/users")
      .then((r) => r.json().then((data) => ({ status: r.status, body: data })))
      .then((obj) => {
        setUsers(obj.body);
        console.log(obj.body);
      });
  }

  useEffect(() => {
    getUsersList();
  }, []);

  const handleUserSelect = (event: React.MouseEvent, item: any) => {
    event.stopPropagation();
    onItemClick(item.login);
  };

  return (
    <List>
      {users.map((item: any) => (
        <ListItem
          button
          key={item.id}
          onClick={(event) => handleUserSelect(event, item)}
        >
          {/* <ListItemText primary={item.login} /> */}
          <ListItemAvatar>
            <Avatar alt={item.login} src={item.avatar_url} />
          </ListItemAvatar>
          <ListItemText
            primary={item.login}
            secondary={
              <>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {item.type}
                </Typography>
              </>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};
