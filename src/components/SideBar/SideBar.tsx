import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Divider, makeStyles } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import { useHistory } from "react-router";
import { ROUTES } from "../../routers";
import strings from "../../utils/strings";

const useStyles = makeStyles((theme) => ({
  colorWhite: {
    color: "#fff",
  },
  toolbar: theme.mixins.toolbar,
}));

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

export default function SideBar(props: Props) {
  const classes = useStyles();
  const history = useHistory();

  const ITEMS = [
    {
      icon: (props: any) => <HomeIcon {...props} />,
      label: strings.home,
      onClick: () => {
        history.push(ROUTES.SEARCH);
      },
    },
  ];

  return (
    <>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {ITEMS.map((item) => (
          <ListItem button key={item.label} onClick={item.onClick}>
            <ListItemIcon>
              {item.icon({ className: classes.colorWhite })}
            </ListItemIcon>
            <ListItemText
              style={{ textTransform: "uppercase", fontWeight: 700 }}
              primary={item.label}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
}
