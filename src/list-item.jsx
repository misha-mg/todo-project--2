import { Button, Checkbox } from "@mui/material";
import "./App.css";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { brown, pink, red } from "@mui/material/colors";

export function ListItem(props) {
  //   const secondary = red[500];

  return (
    <div className="list-item">
      <div className="list-item--content">
        <Checkbox
          type="checkbox"
          sx={{
            color: "#875D5E",
            "&.Mui-checked": {
              color: "#875D5E",
            },
          }}
          onClick={() => props.toggleCheckbox(props.id)}
          checked={props.isChecked}
          readOnly
        ></Checkbox>
        <span className="item-name">{props.name}</span>
      </div>
      {/* <div className="list-item--event"> */}
      {/* <Button onClick={props.hendleDelete(props.id)}> */}
      <DeleteRoundedIcon
        onClick={props.hendleDelete(props.id)}
        className="item-backet"
      />
      {/* </Button> */}
    </div>
  );
}
