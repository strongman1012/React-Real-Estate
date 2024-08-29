import React, { FC, useState } from 'react';
import {
    TextField, Typography, Button, Grid, Autocomplete,
    Container, Box, Card, Divider, CardHeader, CardContent
} from '@mui/material';
import { useAppDispatch } from '../../../store/hooks';
import { useSelector } from 'react-redux';
import { createArea } from '../../../reducers/area1/area1Slice';
import { RootState } from '../../../store/store';
import LoadingScreen from 'src/components/Basic/LoadingScreen';
import AlertModal from 'src/components/Basic/Alert';

interface NewAreaProps {
    onClose: () => void;
}

const NewArea1: FC<NewAreaProps> = ({ onClose }) => {
    const dispatch = useAppDispatch();
    const editable = useSelector((state: RootState) => state.area1.editable);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        level: 5,
    });
    const levels = [1, 2, 3, 4, 5];

    const [selectedLevel, setSelectedLevel] = useState<number | null>(5);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);
    const [confirmTitle, setConfirmTitle] = useState<string>('');
    const [confirmDescription, setConfirmDescription] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleLevelChange = (event: any, value: number | null) => {
        setSelectedLevel(value);
        setFormData((prevData) => ({
            ...prevData!,
            level: value ?? 0 // Set to 0 or another default value if null
        }));
    };

    const validateForm = () => {
        if (!formData?.title) {
            setConfirmTitle('Area Title is required');
            setConfirmDescription('');
            setConfirmModalOpen(true);
            return false;
        }
        if (!formData?.description) {
            setConfirmTitle('Area Description is required');
            setConfirmDescription('');
            setConfirmModalOpen(true);
            return false;
        }
        return true;
    };


    const handleSave = async () => {
        if (validateForm()) {
            try {
                const message = await dispatch(createArea(formData));
                if (message) {
                    setConfirmTitle(message);
                    setConfirmDescription('');
                    setConfirmModalOpen(true);
                }

            } catch (error: any) {
                setConfirmTitle(error.message);
                setConfirmDescription('');
                setConfirmModalOpen(true);
            }
            finally {
                setIsLoading(false);
                setFormData({ title: '', description: '', level: 5 });
                setSelectedLevel(5);
            }
        }
    };

    return (
        <Container maxWidth={false}>
            <LoadingScreen show={isLoading} />
            <Box sx={{ pt: 3 }}>
                <Card variant="outlined">
                    <CardHeader title="New Area 1"
                        action={
                            <>
                                <Button variant="contained" color="primary" onClick={handleSave} disabled={editable ? false : true} sx={{ mr: 2 }}>
                                    Save
                                </Button>
                                <Button variant="outlined" color="secondary" onClick={onClose}>
                                    Cancel
                                </Button>
                            </>
                        }
                    />
                    <Divider />
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h6">Area Information</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    multiline
                                    rows={4}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    options={levels}
                                    getOptionLabel={(option: number) => option.toString()}
                                    value={selectedLevel}
                                    onChange={handleLevelChange}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Level" fullWidth required />
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Box>

            <AlertModal
                show={confirmModalOpen}
                onClose={() => setConfirmModalOpen(false)}
                title={confirmTitle}
                description={confirmDescription}
            />
        </Container>
    );
};

export default NewArea1;
