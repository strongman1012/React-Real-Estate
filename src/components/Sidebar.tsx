import React, { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import { fetchAreaLists } from 'src/reducers/areaList/areaListSlice';
import { useAppDispatch } from 'src/store/hooks';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import { Box, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import LoadingScreen from './Basic/LoadingScreen';

const drawerWidth = 250;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

interface DashboardSidebarProps {
    open: boolean;
}

const DashboardSidebar: FC<DashboardSidebarProps> = ({ open }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const [applicationMenus, setApplicationMenus] = useState<string[]>([]);
    const areaList = useSelector((state: RootState) => state.areaList.areaLists);

    useEffect(() => {
        dispatch(fetchAreaLists());
    }, [dispatch]);

    useEffect(() => {
        if (areaList.length > 0) {
            setLoading(false);
            const items = areaList.filter(area => area.application_name === "Application B")[0].data.map(item => item.area_name);
            setApplicationMenus(items);
        }
    }, [areaList]);

    return (
        <Box sx={{ display: 'flex' }}>
            <LoadingScreen show={loading} />
            {!loading && applicationMenus.length > 0 && (
                <Drawer variant="permanent"
                    PaperProps={{
                        sx: {
                            height: 'calc(100% - 48px) !important',
                            top: '48px !Important',
                            borderRight: '1px solid #ddd',
                            position: 'absolute',
                            zIndex: 1
                        }
                    }}
                    open={open}>
                    <List>
                        {applicationMenus.includes('B_Area 1') && (
                            <ListItemButton
                                sx={{ minHeight: 48, px: 2.5 }}
                                onClick={() => navigate('/dashboard/b-area-1')}
                            >
                                <ListItemIcon>
                                    <StarOutlineIcon />
                                </ListItemIcon>
                                <ListItemText primary="B_Area 1" />
                            </ListItemButton>
                        )}
                        {applicationMenus.includes('B_Area 2') && (
                            <ListItemButton
                                sx={{ minHeight: 48, px: 2.5 }}
                                onClick={() => navigate('/dashboard/b-area-2')}
                            >
                                <ListItemIcon>
                                    <StarOutlineIcon />
                                </ListItemIcon>
                                <ListItemText primary="B_Area 2" />
                            </ListItemButton>
                        )}
                        {applicationMenus.includes('B_Area 3') && (
                            <ListItemButton
                                sx={{ minHeight: 48, px: 2.5 }}
                                onClick={() => navigate('/dashboard/b-area-3')}
                            >
                                <ListItemIcon>
                                    <StarOutlineIcon />
                                </ListItemIcon>
                                <ListItemText primary="B_Area 3" />
                            </ListItemButton>
                        )}
                        {applicationMenus.includes('B_Area 4') && (
                            <ListItemButton
                                sx={{ minHeight: 48, px: 2.5 }}
                                onClick={() => navigate('/dashboard/b-area-4')}
                            >
                                <ListItemIcon>
                                    <StarOutlineIcon />
                                </ListItemIcon>
                                <ListItemText primary="B_Area 4" />
                            </ListItemButton>
                        )}
                        {applicationMenus.includes('B_Area 5') && (
                            <ListItemButton
                                sx={{ minHeight: 48, px: 2.5 }}
                                onClick={() => navigate('/dashboard/b-area-5')}
                            >
                                <ListItemIcon>
                                    <StarOutlineIcon />
                                </ListItemIcon>
                                <ListItemText primary="B_Area 5" />
                            </ListItemButton>
                        )}
                        {applicationMenus.includes('B_Area 6') && (
                            <ListItemButton
                                sx={{ minHeight: 48, px: 2.5 }}
                                onClick={() => navigate('/dashboard/b-area-6')}
                            >
                                <ListItemIcon>
                                    <StarOutlineIcon />
                                </ListItemIcon>
                                <ListItemText primary="B_Area 6" />
                            </ListItemButton>
                        )}
                    </List>
                </Drawer>
            )}
        </Box>
    );
}

export default DashboardSidebar;
