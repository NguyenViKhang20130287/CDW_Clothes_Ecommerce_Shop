import React, {useState} from 'react';
import {Modal, Box, Typography, Button, Rating, TextField} from '@mui/material';
import './RatingPopup.css';
import APIService from "../../services/APIService";
import toast from "react-hot-toast";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    // height: 500,
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius:'3px',
    boxShadow: 10,
    p: 4,
};

const styleBtn ={
    bgcolor: 'var(--color-black)',
    p: 1,
    mr:2,
    '&:hover':{
        bgcolor:'#fff',
        color:'#000'
    }
}

const RatingPopup = ({open, handleClose, detail, user}) => {
    const [stars, setStars] = useState(0);
    const [reviewContent, setReviewContent] = useState('');
    if (!detail) {
        return null;
    }

    const handleSubmit = () => {
        postReview();
        handleClose();
    };

    const postReview = async () => {
        const postData = {
            userId: user.id,
            orderDetailId: detail.id,
            productId: detail.product.id,
            stars: stars,
            content: reviewContent
        };
        const apiService = new APIService();
        try {
            const response = await apiService.sendData('/review', postData);
            toast.success("Đánh giá thành công, vui lòng chờ xác nhận")
            console.log(response);
        } catch (error) {
            toast.error("Đánh giá thất bại")
            console.error(error);
        }
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <Typography variant="h6" component="h2">
                    Đánh giá sản phẩm
                </Typography>
                <Typography variant="subtitle1" sx={{mt: 2}}>
                    {detail.product.name}
                </Typography>
                <Typography variant="body2" sx={{mt: 1}}>
                    Màu: {detail.color.name}, Kích cỡ: {detail.size.name}, Số lượng: x{detail.quantity}
                </Typography>
                <div className={'stars-container'}>
                    <p className={'stars-title'}>Chất lượng sản phẩm: </p>
                    <Rating
                        name="product-rating"
                        size={'large'}
                        value={stars}
                        onChange={(event, newValue) => setStars(newValue)}
                        sx={{mt: -0.5}}
                    />
                </div>

                <TextField
                    label="Nội dung đánh giá"
                    multiline
                    rows={4}
                    value={reviewContent}
                    onChange={(e) => setReviewContent(e.target.value)}
                    variant="outlined"
                    fullWidth
                    sx={{mt: 2}}
                />
                <div className={'review-button-send'}>
                    <Button variant="contained" onClick={handleClose} sx={styleBtn}>
                        Hủy
                    </Button>
                    <Button variant="contained" onClick={handleSubmit} sx={styleBtn}>
                        Gửi đánh giá
                    </Button>
                </div>
            </Box>
        </Modal>
    );
};

export default RatingPopup;
