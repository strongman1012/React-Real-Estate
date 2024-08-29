import React, { FC, useEffect, useState } from 'react';
import {
    TextField, Typography, Button, Grid, Autocomplete,
    Container, Box, Divider, Card, CardHeader, CardContent
} from '@mui/material';
import { RootState } from '../../../store/store';
import { useAppDispatch } from '../../../store/hooks';
import { useSelector } from 'react-redux';
import { fetchAreaById, updateAreaById } from '../../../reducers/area2/area2Slice';
import { Area2 } from '../../../reducers/area2/area2API';
import LoadingScreen from 'src/components/Basic/LoadingScreen';
import AlertModal from 'src/components/Basic/Alert';

interface EditAreaProps {
    areaId: number;
    onClose: () => void;
}

const EditArea2: FC<EditAreaProps> = ({ areaId, onClose }) => {
    const dispatch = useAppDispatch();
    const area = useSelector((state: RootState) => state.area2.currentArea);
    const editable = useSelector((state: RootState) => state.area2.editable);
    const levels = [1, 2, 3, 4, 5];

    const [formData, setFormData] = useState<Area2 | null>(null);
    const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);
    const [confirmTitle, setConfirmTitle] = useState<string>('');
    const [confirmDescription, setConfirmDescription] = useState<string>('');

    useEffect(() => {
        if (areaId) {
            dispatch(fetchAreaById(areaId));
        }
    }, [dispatch, areaId]);

    useEffect(() => {
        if (area) {
            setFormData(area);
            setSelectedLevel(area.level);
            setIsLoading(false);
        }
    }, [area]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData!,
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
        if (!formData?.subject) {
            setConfirmTitle('Area Subject is required');
            setConfirmDescription('');
            setConfirmModalOpen(true);
            return false;
        }
        if (!formData?.content) {
            setConfirmTitle('Area Content is required');
            setConfirmDescription('');
            setConfirmModalOpen(true);
            return false;
        }
        return true;
    };

    const handleSave = async () => {
        if (formData && validateForm()) {
            setIsLoading(true);
            try {
                const message = await dispatch(updateAreaById(areaId, formData));
                if (message) {
                    setConfirmTitle(message);
                    setConfirmDescription('');
                    setConfirmModalOpen(true);
                }
            } catch (error: any) {
                setConfirmTitle(error.message);
                setConfirmDescription('');
                setConfirmModalOpen(true);
            } finally {
                setIsLoading(false);
            }
        }
    };

    if (!formData) {
        return <div>Loading...</div>;
    }

    return (
        <Container maxWidth={false}>
            <LoadingScreen show={isLoading} />
            <Box sx={{ pt: 3 }}>
                <Card variant="outlined">
                    <CardHeader title="Edit Area 2"
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
                                    label="Subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Content"
                                    name="content"
                                    value={formData.content}
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

export default EditArea2;
