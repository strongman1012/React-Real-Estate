import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { logout } from 'src/reducers/auth/authSlice';
import { Button, Stack, Typography } from '@mui/material';
import { RootState } from 'src/store/store';
import { useAppDispatch } from '../../store/hooks';
import Gallery from 'devextreme-react/gallery';
import CheckBox, { CheckBoxTypes } from 'devextreme-react/check-box';
import { gallery } from './data';

const Home: React.FC = () => {
    // State and hooks for authentication
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useAppDispatch();

    // State and hooks for gallery options
    const [loop, setLoop] = useState(true);
    const [slideShow, setSlideShow] = useState(true);
    const [showNavButtons, setShowNavButtons] = useState(true);
    const [showIndicator, setShowIndicator] = useState(true);

    const onLoopChanged = useCallback((data: CheckBoxTypes.ValueChangedEvent) => {
        setLoop(data.value);
    }, [setLoop]);

    const onSlideShowChanged = useCallback((data: CheckBoxTypes.ValueChangedEvent) => {
        setSlideShow(data.value);
    }, [setSlideShow]);

    const onShowNavButtonsChanged = useCallback((data: CheckBoxTypes.ValueChangedEvent) => {
        setShowNavButtons(data.value);
    }, [setShowNavButtons]);

    const onShowIndicatorChanged = useCallback((data: CheckBoxTypes.ValueChangedEvent) => {
        setShowIndicator(data.value);
    }, [setShowIndicator]);

    return (
        <Stack width="100%" boxSizing={'border-box'} padding={5}>
            <Typography variant="h4">Home</Typography>
            {user ? (
                <>
                    <Typography variant="body1">Welcome, {user.userName}</Typography>
                    <Button variant="contained" style={{ width: '150px' }} color="secondary" onClick={() => dispatch(logout())}>
                        Logout
                    </Button>
                </>
            ) : (
                <Typography variant="body1">You are not logged in.</Typography>
            )}

            {/* Gallery Section */}
            <div className="widget-container" style={{ marginTop: '20px' }}>
                <Gallery
                    id="gallery"
                    dataSource={gallery}
                    height={300}
                    slideshowDelay={slideShow ? 3000 : 0}
                    loop={loop}
                    showNavButtons={showNavButtons}
                    showIndicator={showIndicator}
                />
            </div>

            {/* Options Section */}
            <div className="options" style={{ marginTop: '20px' }}>
                <div className="caption">Options</div>
                <div className="option">
                    <CheckBox text="Loop mode" value={loop} onValueChanged={onLoopChanged} />
                </div>
                <div className="option">
                    <CheckBox text="Slide show" value={slideShow} onValueChanged={onSlideShowChanged} />
                </div>
                <div className="option">
                    <CheckBox text="Navigation buttons" value={showNavButtons} onValueChanged={onShowNavButtonsChanged} />
                </div>
                <div className="option">
                    <CheckBox text="Indicator" value={showIndicator} onValueChanged={onShowIndicatorChanged} />
                </div>
            </div>
        </Stack>
    );
};

export default Home;
