import { Box, Button, Typography, Alert, AlertTitle } from "@mui/material";
import Link from "next/link";

// @ts-ignore
export default function Page(props) {
  return (
    <div>
      <main>
        <Box
          component="header"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
          }}
        >
          <h1>Home</h1>

          <Box sx={{ display: "flex", gap: 1.5 }}>
            <Link href="/api/auth/signin" passHref>
              <Button component="a" variant="contained">
                Log In
              </Button>
            </Link>
          </Box>
        </Box>
      </main>
    </div>
  );
}
