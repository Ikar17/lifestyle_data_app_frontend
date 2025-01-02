
import { Box, Container, Divider, Typography } from "@mui/material";

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                bgcolor: 'primary.dark',
                color: 'primary.contrastText',
                py: 3,
                mt: 4,
                textAlign: 'center'
            }}
        >
            <Container maxWidth="lg">
                <Divider sx={{ bgcolor: 'primary.contrastText', mb: 2 }} />
                <Typography variant="body2">
                    {'Copyright © LifestyleData '}
                    {new Date().getFullYear()}
                </Typography>
            </Container>
        </Box>
    );
}