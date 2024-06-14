import React, { useEffect, useState } from 'react';
import './BlogDetailScreen.css';
import APIService from "../../../services/APIService";
import { useParams } from "react-router-dom";
import { Avatar } from "@mui/material";

const BlogDetailScreen = () => {
    const { id } = useParams();
    const [blogDetail, setBlogDetail] = useState({})
    const date = new Date(blogDetail.createdBy);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JavaScript
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    const fetchBlogDetail = async () => {
        try {
            const response = await new APIService().fetchData(`/blog/${id}`);
            setBlogDetail(response);
            console.log(response.createdAt)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchBlogDetail();
    }, [id])

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    }
    console.log(blogDetail)
    return (
        <div>
            {blogDetail ? (
                <div className="blog-detail">
                    <h1 className="blog-title">{blogDetail.title}</h1>
                    <div className="blog-meta">
                        <Avatar src={blogDetail.createdBy ? blogDetail.createdBy.userInformation.avatar : null} />
                        <div className="blog-meta-info">
                            <span className="blog-author">{blogDetail.createdBy ? blogDetail.createdBy.username : 'Unknown'}</span>
                            <span className="blog-date">{formatDate(blogDetail.createdAt)}</span>
                        </div>
                    </div>
                    <p className="blog-description">{blogDetail.description}</p>
                    <img className="blog-thumbnail" src={blogDetail.thumbnail} alt={blogDetail.title} />
                    <div className="blog-content">{blogDetail.content}</div>
                </div>
            ) : <div>Loading...</div>}
        </div>
    );
}

export default BlogDetailScreen;
