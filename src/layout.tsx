import { useSession, signOut } from "next-auth/react";
import { Button, Grid, Typography, Box, Menu, MenuItem } from "@mui/material";
import Link from "next/link";
import React, { PropsWithChildren } from "react";
import { OwnerGuard } from "./guards";
import { useRouter } from "next/router";
import VillaIcon from "@mui/icons-material/Villa";
import GroupIcon from "@mui/icons-material/Group";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const leftLinks = [{ href: "/", text: "Home", icon: <VillaIcon /> }];

const ownerLinks = [{ href: "/users", text: "Users", icon: <GroupIcon /> }];

const ResponsiveLink = ({ href, text, icon }) => (
  <Link href={href}>
    <Box
      sx={{ flexDirection: "column", alignItems: "center" }}
      display={{ xs: "flex", lg: "none" }}
    >
      <Typography>{icon}</Typography>
      <Typography sx={{ fontSize: "0.5rem" }}>{text}</Typography>
    </Box>
    <Box
      sx={{ flexDirection: "column", alignItems: "center" }}
      display={{ xs: "none", lg: "block" }}
    >
      {text}
    </Box>
  </Link>
);

const ProfileLink = ({ username, router }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box display={{ xs: "block", lg: "none" }}>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{
            flexDirection: "column",
            alignItems: "center",
            display: "flex",
            color: "#7b94db",
            padding: 0,
            minWidth: "unset",
          }}
        >
          <Typography>
            <AccountCircleIcon />
          </Typography>
          <Typography sx={{ fontSize: "0.5rem", textTransform: "initial" }}>
            My Account
          </Typography>
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              router.push("/users/me");
            }}
          >
            Profile
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              signOut({
                redirect: true,
                callbackUrl: "/",
              });
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Box>

      <Typography
        sx={{ flexDirection: "column", alignItems: "center" }}
        display={{ xs: "none", lg: "block" }}
      >
        Logged in as <Link href="/users/me">{username}</Link>
      </Typography>
      <Button
        sx={{ display: { xs: "none", lg: "block" } }}
        variant="contained"
        onClick={() => {
          signOut({
            redirect: true,
            callbackUrl: "/",
          });
        }}
      >
        Log Out
      </Button>
    </>
  );
};

export function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  if (!session) {
    return null;
  }

  return (
    <Grid
      sx={{ gap: 2, py: 1, px: 2, bgcolor: "background.paper" }}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      container
    >
      <Grid
        sx={{ gap: 2, width: "fit-content" }}
        direction="row"
        alignItems="center"
        container
      >
        {leftLinks.map((link) => (
          <ResponsiveLink key={link.href} {...link} />
        ))}
      </Grid>
      <Grid
        sx={{ gap: 2, width: "fit-content" }}
        direction="row"
        alignItems="center"
        container
      >
        <OwnerGuard throw403={false}>
          {ownerLinks.map((link) => (
            <ResponsiveLink key={link.href} {...link} />
          ))}
        </OwnerGuard>
        <ProfileLink username={session.user.email} router={router} />
      </Grid>
    </Grid>
  );
}

export function Layout({ children, wide = false }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "100vh",
        mb: 8,
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: 500, md: 800, lg: wide ? 1100 : 800 },
          padding: "20px",
          border: "1px solid #0000001f",
          borderRadius: "4px",
          marginTop: "25px",
          bgcolor: "background.paper",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
