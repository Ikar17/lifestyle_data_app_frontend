import { List, ListItem, ListItemText, Typography, Divider, Box, Paper, ListItemIcon } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';

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
        <Paper 
            elevation={3} 
            sx={{ 
                p: 2, 
                borderRadius: 4, 
                my: 3,
                maxHeight: 400,  
                overflowY: 'auto'  
            }}
        >
            <List
                sx={{
                    width: '100%',
                    bgcolor: 'background.paper',
                }}
            >
                {data.map((item, index) => (
                    <div key={index}>
                        <ListItem sx={{ py: 2 }}>
                            <ListItemIcon>
                                <CommentIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText 
                                primary={item.answer} 
                                primaryTypographyProps={{ 
                                    variant: 'body1', 
                                    color: 'text.primary',
                                    fontWeight: 500
                                }} 
                            />
                        </ListItem>
                        {index < data.length - 1 && <Divider component="li" />}
                    </div>
                ))}
            </List>
        </Paper>
    );
};

export default OpenAnswersList;