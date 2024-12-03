import { List, ListItem, ListItemText, Typography, Divider, Box } from '@mui/material';

const OpenAnswersList = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="body1" color="textSecondary">
                    Brak dostępnych odpowiedzi.
                </Typography>
            </Box>
        );
    }

    return (
        <List
            sx={{
                width: '100%',
                bgcolor: 'background.paper',
                borderRadius: '8px',
                boxShadow: 3,
                my: 2,
            }}
        >
            {data.map((item, index) => (
                <div key={index}>
                    <ListItem>
                        <ListItemText 
                            primary={item.answer} 
                            primaryTypographyProps={{ 
                                variant: 'body1', 
                                color: 'textPrimary' 
                            }} 
                        />
                    </ListItem>
                    {index < data.length - 1 && <Divider />} {/* Dzieli tylko między elementami */}
                </div>
            ))}
        </List>
    );
};

export default OpenAnswersList;