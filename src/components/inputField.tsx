import {
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Skeleton,
} from "@mui/material";
import { UserRole } from "@prisma/client";
import { ChangeEvent } from "react";
import { useEffect, useState } from "react";

function getInputType(key: string, val: any) {
  key = key.toLowerCase();
  console.log(key);
  if (key === "email" || key === "personalemail") {
    return "email";
  } else if (key === "phonenumber") {
    return "tel";
  } else if (typeof val === "number") {
    return "number";
  } else {
    return "text";
  }
}

const BOOL_FIELDS = ["isActive"];

const TEXTAREA_FIELDS = [];

const OWNER_FIELDS = [];

const USER_FIELDS = [];

const DISABLED_FIELDS = [];

type UserList = { isActive: boolean; id: number; name?: string; email: string };

export function InputField({
  objKey,
  val,
  onChange,
  required,
  userRole,
}: {
  objKey: any;
  val: any;
  onChange: {
    (e: ChangeEvent<any>): void;
  };
  required?: boolean;
  userRole?: UserRole;
}) {
  const [owners, setOwners] = useState<Array<UserList>>();

  const [users, setUsers] = useState<Array<UserList>>();
  useEffect(() => {
    fetch("/api/users?userRole=ADMIN").then((res) => {
      res.json().then((data) => setOwners(data));
    });
    fetch("/api/users").then((res) => {
      res.json().then((data) => setUsers(data));
    });
  }, [objKey]);

  const ENUMS = {
    userRole: Object.keys(UserRole).filter((x) => !(parseInt(x) >= 0)),
  };

  const selectProps = {
    key: objKey,
    name: objKey,
    label: objKey,
    select: true,
    value: val,
    fullWidth: true,
    sx: { my: 1 },
    onChange: onChange,
  };

  if (Object.keys(ENUMS).includes(objKey)) {
    return (
      <TextField {...selectProps} required={required}>
        {ENUMS[objKey].map((val) => (
          <MenuItem key={val} value={val}>
            {val}
          </MenuItem>
        ))}
      </TextField>
    );
  }

  if (BOOL_FIELDS.includes(objKey)) {
    return (
      <FormControlLabel
        sx={{ width: "100%" }}
        name={objKey}
        label={objKey}
        control={<Checkbox name={objKey} checked={val} onChange={onChange} />}
      />
    );
  }
  if (OWNER_FIELDS.includes(objKey)) {
    if (!owners) return <Skeleton sx={{ mb: 1 }} />;
    return (
      <TextField {...selectProps} required={required}>
        {owners.map((owner) => (
          <MenuItem key={owner.id} value={owner.id}>
            {owner.name || owner.email}
          </MenuItem>
        ))}
      </TextField>
    );
  }
  if (USER_FIELDS.includes(objKey)) {
    if (!users) return <Skeleton sx={{ mb: 1 }} />;
    else if (!userRole)
      throw Error("Component InputField needs 'userRole' prop.");
    return (
      <TextField
        {...selectProps}
        disabled={userRole !== UserRole.ADMIN}
        required={required}
      >
        {users.map((user) => (
          <MenuItem key={user.id} value={user.id}>
            {user.name || user.email}
          </MenuItem>
        ))}
      </TextField>
    );
  }
  return (
    <TextField
      key={objKey}
      name={objKey}
      label={objKey}
      type={getInputType(objKey, val)}
      value={val}
      fullWidth
      sx={{ my: 1 }}
      onChange={onChange}
      multiline={TEXTAREA_FIELDS.includes(objKey)}
      disabled={DISABLED_FIELDS.includes(objKey)}
      rows={3}
      required={required}
    />
  );
}
