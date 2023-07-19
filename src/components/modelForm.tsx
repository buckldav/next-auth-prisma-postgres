import { Box, Alert, Typography, Modal, AlertTitle } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { UserRole, PaymentMethod, Payment } from "@prisma/client";
import { FormikProps, useFormik } from "formik";
import { InputField } from "./inputField";
import { useState, PropsWithChildren } from "react";
import { useRouter } from "next/router";

export type FormMethod = "POST" | "PUT" | "PATCH";

export type ModelFormProps<O> = {
  obj?: O;
  keys: Array<keyof O>;
  requiredKeys?: Array<keyof O>;
  method: FormMethod;
  apiRoute: string;
  userRole?: UserRole;
  userId?: number;
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 500,
  maxHeight: "90vh",
  overflowY: "scroll",
  width: "100%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export function FormModalWrapper(
  props: PropsWithChildren<{
    objName: string;
    operation: "create" | "update" | "delete";
    customButtonText?: string;
  }>
) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const colors: Record<
    typeof props.operation,
    | "inherit"
    | "success"
    | "primary"
    | "error"
    | "secondary"
    | "info"
    | "warning"
  > = {
    create: "success",
    update: "primary",
    delete: "error",
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        color={colors[props.operation]}
      >
        {props.customButtonText
          ? props.customButtonText
          : `${props.operation.toUpperCase()} ${props.objName}`}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{props.children}</Box>
      </Modal>
    </div>
  );
}

export function DeleteModel({
  objName,
  apiRoute,
  disabledMessage,
}: {
  objName: string;
  apiRoute: string;
  disabledMessage?: string;
}) {
  const router = useRouter();
  const [disabled, setDisabled] = useState(true);
  const formik = useFormik({
    initialValues: { confirmText: "" },
    validate: (values) => {
      setDisabled(values.confirmText !== objName);
    },
    validateOnChange: true,
    onSubmit: async (values) => {
      if (disabled) {
        return;
      }
      const res = await fetch(apiRoute, { method: "DELETE" });
      // console.log(res);
      if (res.status === 204) {
        router.replace({ query: {} });
        window.location.reload();
      }
    },
  });

  return disabledMessage ? (
    <Alert severity="warning">{disabledMessage}</Alert>
  ) : (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      onReset={formik.handleReset}
    >
      <Alert severity="error">
        Are you sure you want to delete <strong>{objName}</strong> and all of
        its related objects?
      </Alert>
      <Typography sx={{ userSelect: "none", my: 2 }}>
        Please type in <strong>{objName}</strong> below to confirm.
      </Typography>
      <TextField
        name="confirmText"
        value={formik.values["confirmText"]}
        onChange={formik.handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button
        type="submit"
        color="error"
        variant="contained"
        disabled={disabled}
      >
        Delete
      </Button>
    </Box>
  );
}

export function useFormData<O>({
  obj,
  keys,
  method,
  apiRoute,
  userId,
}: ModelFormProps<O>): [[string, any][] | (keyof O)[][], FormikProps<O>] {
  const getBaseModelEntries = () =>
    Object.entries(obj).filter(([key, val]) =>
      keys.includes(key as keyof O) ? [key, val] : false
    );
  const baseModelEmptyEntries = keys.map((key) => [key, undefined]);
  const entries = obj ? getBaseModelEntries() : baseModelEmptyEntries;
  const initialValues = Object.fromEntries(entries);
  const router = useRouter();

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      if (userId) {
        values["userId"] = userId;
      }
      // console.log(process.env.NEXT_PUBLIC_BASE_URL + apiRoute);
      const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + apiRoute, {
        body: JSON.stringify(values),
        method,
      });
      // console.log(res);
      if (res.status === 201 || res.status === 200) {
        router.replace({ query: {} });
        window.location.reload();
      }
    },
  });

  return [entries, formik];
}

export function BaseModelForm<O>(
  props: PropsWithChildren<ModelFormProps<O> & { formik: FormikProps<O> }>
) {
  const { children, formik, ...rest } = props;
  const buttonText = rest.method === "POST" ? "Create" : "Update";
  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      onReset={formik.handleReset}
    >
      {children}
      <Button type="submit" variant="contained">
        {buttonText}
      </Button>
    </Box>
  );
}

export default function ModelForm<O>(props: ModelFormProps<O>) {
  const [entries, formik] = useFormData(props);
  return (
    <BaseModelForm {...props} formik={formik}>
      {entries.map(([key, val]) => (
        <InputField
          key={key}
          objKey={key}
          val={formik.values[key]}
          onChange={formik.handleChange}
          userRole={props.userRole}
          required={props.requiredKeys.includes(key)}
        />
      ))}
    </BaseModelForm>
  );
}
